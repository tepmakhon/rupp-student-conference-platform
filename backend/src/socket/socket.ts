import jwt, { type JwtPayload } from "jsonwebtoken";
import { Server } from "socket.io";
import { type Server as HttpServer } from "node:http";
import { authenticateToken } from "../utils/authUser.js";
import { prisma } from "../config/prisma.js";
import { allowedOrigins } from "../config/cors.js";

let io: Server;

export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,

      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (typeof token !== "string") throw new Error("Token required");
      socket.data.user = await authenticateToken(token);
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user;
    const payload = jwt.decode(socket.handshake.auth.token) as JwtPayload;
    const timeout = setTimeout(() => socket.disconnect(true), Math.min(2147483647, Math.max(0, (payload.exp! * 1000) - Date.now())));
    socket.once("disconnect", () => clearTimeout(timeout));
    socket.join(user.id);
    if (user.roleName === "ADMIN") socket.join("admin");

    socket.on("join_attendance", async (eventId) => {
      if (typeof eventId !== "string" || !/^[1-9]\d*$/.test(eventId)) return;
      try {
        // Recheck current account and event ownership before subscribing.
        const current = await authenticateToken(socket.handshake.auth.token);
        if (current.roleName !== "ORGANIZATION") return;
        const event = await prisma.event.findFirst({
          where: { id: BigInt(eventId), organization: { userId: BigInt(current.id) } },
          select: { id: true },
        });
        if (event && socket.connected) socket.join(`attendance-${event.id}`);
      } catch {
        socket.emit("subscription_error", { message: "Unable to subscribe to attendance" });
      }
    });
    socket.on("leave_attendance", (eventId) => {
      if (typeof eventId === "string" && /^[1-9]\d*$/.test(eventId)) {
        socket.leave(`attendance-${eventId}`);
      }
    });
  });
};

export const getIO = () => io;

/*
|--------------------------------------------------------------------------
| Notification
|--------------------------------------------------------------------------
*/

export const emitNotification = (
  userId: bigint | number | string,

  notification: unknown,
) => {
  io?.to(String(userId)).emit(
    "new_notification",

    notification,
  );
};

/*
|--------------------------------------------------------------------------
| Dashboard Update
|--------------------------------------------------------------------------
*/

export const emitDashboardUpdate = (userId: bigint | number | string) => {
  io?.to(String(userId)).emit("dashboard_update");
};

/*
|--------------------------------------------------------------------------
| Attendance Socket Event
|--------------------------------------------------------------------------
*/
export const emitAttendanceUpdate = (eventId: bigint | number | string) => {
  io?.to(`attendance-${eventId}`).emit("attendance_update");
};
