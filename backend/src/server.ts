import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5050;

import http from "http";
import { initializeSocket } from "./socket/socket.js";

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
