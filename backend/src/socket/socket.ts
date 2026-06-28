import { Server } from "socket.io";

let io: Server;

export const initializeSocket = (server: any) => {

  io = new Server(server, {

    cors: {

      origin: [

        "http://localhost:5173",

        "http://localhost:3000",

      ],

      credentials: true,

    },

  });

  io.on("connection", socket => {

    console.log("Socket Connected:", socket.id);

    socket.on("join", userId => {

      socket.join(String(userId));

    });

    socket.on("disconnect", () => {

      console.log("Socket Disconnected");

    });

  });

};

export const getIO = () => io;

export const emitNotification = (

  userId: bigint | number | string,

  notification: unknown

) => {

  if (!io) return;

  io.to(String(userId)).emit(

    "new_notification",

    notification

  );

};