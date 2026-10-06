import { rejectionSchema } from "../src/modules/audit/moderation.validation.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";

vi.hoisted(() => { process.env.JWT_SECRET = "test-only-secret-with-at-least-32-characters"; });
const db = vi.hoisted(() => ({ user: { findUnique: vi.fn() }, event: { findUnique: vi.fn() } }));
vi.mock("../src/config/prisma.js", () => ({ prisma: db }));
import { signToken, verifyToken } from "../src/utils/jwt.js";
import { authMiddleware } from "../src/middlewares/auth.middleware.js";
import { rbac } from "../src/middlewares/rbac.middleware.js";
import { responseReplacer } from "../src/utils/responseSerializer.js";
import { requireEventOwner } from "../src/utils/eventOwnership.js";
import { getPagination } from "../src/utils/pagination.js";
import { createEventSchema, updateEventSchema } from "../src/modules/event/event.validation.js";
import { updateOpportunitySchema } from "../src/modules/opportunity/opportunity.validation.js";
import { validateRegister } from "../src/modules/auth/auth.validation.js";

const claims = { id: "1", email: "student@example.com", roleId: "1", roleName: "STUDENT" };
const app = express();
app.set("json replacer", responseReplacer);
app.get("/private", authMiddleware, rbac(["ADMIN"]), (_req, res) => res.json({ ok: true }));
app.get("/safe", (_req, res) => res.json({ id: 1n, user: { passwordHash: "private", email: "public", sessions: [{ refreshToken: "private" }] } }));
beforeEach(() => { vi.clearAllMocks(); db.user.findUnique.mockResolvedValue({ ...claims, id: 1n, roleId: 1n, accountStatus: "ACTIVE", role: { roleName: "STUDENT" } }); });

describe("authentication and authorization", () => {
  it("roundtrips valid claims", () => { expect(verifyToken(signToken(claims))).toEqual(claims); });
  it("rejects forged, expired and malformed claims", () => {
    expect(() => verifyToken(jwt.sign(claims, "wrong-secret"))).toThrow();
    expect(() => verifyToken(jwt.sign(claims, process.env.JWT_SECRET!, { expiresIn: -1 }))).toThrow();
    expect(() => verifyToken(signToken({ ...claims, id: "invalid" }))).toThrow();
    expect(() => verifyToken(signToken({ ...claims, roleName: "UNKNOWN" }))).toThrow();
  });
  it("requires a Bearer token", async () => { expect((await request(app).get("/private")).status).toBe(401); });
  it("blocks students on admin routes", async () => { expect((await request(app).get("/private").auth(signToken(claims), { type: "bearer" })).status).toBe(403); });
  it("uses current database role rather than stale token role", async () => {
    db.user.findUnique.mockResolvedValue({ id: 1n, email: claims.email, roleId: 3n, accountStatus: "ACTIVE", role: { roleName: "ADMIN" } });
    expect((await request(app).get("/private").auth(signToken(claims), { type: "bearer" })).status).toBe(200);
  });
  it("rejects suspended or removed accounts", async () => {
    db.user.findUnique.mockResolvedValue({ accountStatus: "SUSPENDED" });
    expect((await request(app).get("/private").auth(signToken(claims), { type: "bearer" })).status).toBe(401);
    db.user.findUnique.mockResolvedValue(null);
    expect((await request(app).get("/private").auth(signToken(claims), { type: "bearer" })).status).toBe(401);
  });
  it("strips nested secrets while retaining BigInt IDs", async () => {
    const response = await request(app).get("/safe");
    expect(response.body).toEqual({ id: "1", user: { email: "public", sessions: [{}] } });
  });
  it("limits event data to its owner", async () => {
    db.event.findUnique.mockResolvedValue({ organization: { userId: 2n } });
    await expect(requireEventOwner(1n, 1n)).rejects.toMatchObject({ statusCode: 403 });
    await expect(requireEventOwner(1n, 2n)).resolves.toBeTruthy();
    db.event.findUnique.mockResolvedValue(null);
    await expect(requireEventOwner(1n, 2n)).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("input boundaries", () => {
  const event = { title: "Workshop", description: "Learn", location: "RUPP", categoryId: "1", eventDate: "2027-01-01T10:00:00+07:00" };
  it("supports unlimited capacity and omitted image on both create and edit", () => {
    expect(createEventSchema.parse({ ...event, capacity: "" }).capacity).toBeUndefined();
    expect(updateEventSchema.parse({ bannerImageUrl: "", description: "Learn" })).toMatchObject({ bannerImageUrl: "" });
  });
  it("rejects fractional capacity, invalid dates, IDs and URLs", () => {
    for (const invalid of [{ capacity: 1.5 }, { categoryId: "abc" }, { eventDate: "garbage" }, { bannerImageUrl: "garbage" }]) {
      expect(createEventSchema.safeParse({ ...event, ...invalid }).success).toBe(false);
    }
    expect(updateOpportunitySchema.safeParse({ deadline: "garbage" }).success).toBe(false);
  });
  it("rejects unsafe pagination", () => {
    for (const [page, limit] of [[-1, 10], [1.5, 10], [1, 101], [NaN, 10], [1, Infinity]]) expect(() => getPagination(page, limit)).toThrow();
    expect(getPagination(2, 10)).toEqual({ skip: 10, take: 10 });
  });
  it("rejects malformed registration and bcrypt truncation", () => {
    expect(() => validateRegister({ email: "bad", password: "12345678", roleName: "STUDENT" })).toThrow();
    expect(() => validateRegister({ email: claims.email, password: "ក".repeat(30), roleName: "STUDENT" })).toThrow();
  });
});


it("requires a meaningful rejection reason", () => {
  expect(rejectionSchema.safeParse({ reason: " " }).success).toBe(false);
  expect(rejectionSchema.parse({ reason: "  Missing event location  " }).reason).toBe("Missing event location");
});
