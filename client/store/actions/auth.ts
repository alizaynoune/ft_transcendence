import type { AuthType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import { setTimeout } from "timers";

export const AuthTunk = createAsyncThunk("auth", async () => {
  try {
    const res = await axios.post("auth/login");
    return res.data
  } catch (error) {
    console.log("<<<<<<<<<<<", error);

    return Promise.reject(error);
  }
});
