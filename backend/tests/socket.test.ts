import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createServer, type Server as HttpServer } from "node:http";
import { io as connect, type Socket } from "../../frontend/node_modules/socket.io-client/build/esm/index.js";
vi.hoisted(() => { process.env.JWT_SECRET = "test-only-secret-with-at-least-32-characters"; });
const db = vi.hoisted(() => ({ user: { findUnique: vi.fn() }, event: { findFirst: vi.fn() } }));
vi.mock("../src/config/prisma.js", () => ({ prisma: db }));
import { initializeSocket, getIO } from "../src/socket/socket.js";
import { signToken } from "../src/utils/jwt.js";
let server: HttpServer;
let url: string;
let clients: Socket[] = [];
const claims = { id: "1", email: "user@example.com", roleId: "1", roleName: "STUDENT" };
const pause = () => new Promise((resolve) => setTimeout(resolve, 30));
beforeEach(async () => {
  vi.resetAllMocks();
  db.user.findUnique.mockResolvedValue({ id: 1n, roleId: 1n, email: claims.email, accountStatus: "ACTIVE", role: { roleName: "STUDENT" } });
  server = createServer(); initializeSocket(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Missing test server address");
  url = `http://127.0.0.1:${address.port}`;
});
afterEach(async () => { clients.forEach((client) => client.disconnect()); clients = []; await new Promise<void>((resolve) => getIO().close(() => resolve())); });
const client = (token?: string) => { const socket = connect(url, { auth: token ? { token } : {}, transports: ["websocket"], reconnection: false }); clients.push(socket); return socket; };
const connected = (socket: Socket) => new Promise<void>((resolve, reject) => { socket.once("connect", resolve); socket.once("connect_error", reject); });
describe("socket authorization", () => {
  it("rejects unauthenticated connections", async () => { const socket = client(); await expect(connected(socket)).rejects.toThrow("Unauthorized"); });
  it("joins only verified personal rooms and ignores client-supplied admin claims", async () => {
    const socket = client(signToken(claims)); await connected(socket);
    socket.emit("join", { userId: "victim", role: "ADMIN" }); await pause();
    const rooms = getIO().sockets.sockets.get(socket.id!)!.rooms;
    expect(rooms.has("1")).toBe(true); expect(rooms.has("victim")).toBe(false); expect(rooms.has("admin")).toBe(false);
  });
  it("joins the admin room using the current database role", async () => {
    db.user.findUnique.mockResolvedValue({ id: 1n, roleId: 3n, email: claims.email, accountStatus: "ACTIVE", role: { roleName: "ADMIN" } });
    const socket = client(signToken(claims)); await connected(socket);
    expect(getIO().sockets.sockets.get(socket.id!)!.rooms.has("admin")).toBe(true);
  });
  it("blocks students from attendance subscriptions", async () => {
    const socket = client(signToken(claims)); await connected(socket);
    socket.emit("join_attendance", "10"); await pause();
    expect(getIO().sockets.sockets.get(socket.id!)!.rooms.has("attendance-10")).toBe(false);
    expect(db.event.findFirst).not.toHaveBeenCalled();
  });
  it("requires event ownership before joining attendance rooms", async () => {
    db.user.findUnique.mockResolvedValue({ id: 1n, roleId: 2n, email: claims.email, accountStatus: "ACTIVE", role: { roleName: "ORGANIZATION" } });
    const socket = client(signToken(claims)); await connected(socket);
    db.event.findFirst.mockResolvedValue(null);
    socket.emit("join_attendance", "10"); await pause();
    expect(getIO().sockets.sockets.get(socket.id!)!.rooms.has("attendance-10")).toBe(false);
    db.event.findFirst.mockResolvedValue({ id: 10n });
    socket.emit("join_attendance", "10"); await pause();
    expect(db.event.findFirst).toHaveBeenLastCalledWith(expect.objectContaining({ where: { id: 10n, organization: { userId: 1n } } }));
    expect(getIO().sockets.sockets.get(socket.id!)!.rooms.has("attendance-10")).toBe(true);
  });
});
