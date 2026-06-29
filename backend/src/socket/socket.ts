import { Server } from "socket.io";

let io: Server;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:3000"],

      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    socket.on("join", (data) => {
      socket.join(String(data.userId));

      if (data.role === "ADMIN") {
        socket.join("admin");
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
    socket.on("join_attendance", (eventId) => {
      socket.join(`attendance-${eventId}`);
    });

    socket.on("leave_attendance", (eventId) => {
      socket.leave(`attendance-${eventId}`);
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
  io.to(String(userId)).emit(
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
  io.to(String(userId)).emit("dashboard_update");
};

/*
|--------------------------------------------------------------------------
| Attendance Socket Event
|--------------------------------------------------------------------------
*/
export const emitAttendanceUpdate = (eventId: bigint | number | string) => {
  io.to(`attendance-${eventId}`).emit("attendance_update");
};
