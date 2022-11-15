import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const AuthTunk = createAsyncThunk("auth", async () => {
  try {
    const res = await axios.get("auth/me");
    return res.data
  } catch (error) {
    return Promise.reject(error);
  }
});
