import { io } from "socket.io-client";
import { loadToken } from "@/tools/localStorage";

const socket = io("http://localhost:5000/", {
   transports: ["websocket"],
  autoConnect: false,
  auth: (cb) => {
    return cb({ token: loadToken() });
  },
});

export default socket;
