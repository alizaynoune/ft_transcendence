import { io } from "socket.io-client";
import { loadToken } from "@/tools/localStorage";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";

const socket = io("http://localhost:5000", {
  autoConnect: false,
  auth: {
    toke: (cb: (arg0: string) => void) => {
      //@ts-ignore
      cb(localStorage.getItem("access_token"));
    },
  },
  // extraHeaders: {
  //   //@ts-ignore
  //   authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY2NjM2MDY3NX0.tWrU7kAqG7C3axJ13arb4fEYqtQppHcXr736XyS709U'
  //   // (cb: (arg0: string | null) => any) => {
  //   //   return cb(localStorage.getItem("access_token"));
  //   // },
  // },
});

export default socket;
