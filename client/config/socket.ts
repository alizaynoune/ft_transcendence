import { io, Manager } from "socket.io-client";
import { loadToken } from "@/tools/localStorage";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";

const socket = io("http://localhost:5000/", {
   transports: ["websocket"],
  autoConnect: false,
  auth: (cb) => {
    return cb({ token: loadToken() });
  },
});

export default socket;
