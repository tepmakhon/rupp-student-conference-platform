import { io } from "socket.io-client";
import { SOCKET_URL } from "../utils/apiConfig";

const socket = io(SOCKET_URL, { autoConnect: false, withCredentials: true });
export default socket;
