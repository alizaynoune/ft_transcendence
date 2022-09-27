import type { AuthType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const AuthTunk = createAsyncThunk<AuthType>("auth", async () => {
  try {
    const res = await axios.get("profile"); // change it
    return res.data;
  } catch (error) {
    console.log("<<<<<<<<<<<", error);

    return Promise.reject(error);
  }
});
