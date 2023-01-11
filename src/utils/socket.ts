import { io } from "socket.io-client";

export const socket = io("http://knsan189.iptime.org:8080", { transports: ["websocket"] });
