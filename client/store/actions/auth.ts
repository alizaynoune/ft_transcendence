import type { AuthType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const AuthTunk = createAsyncThunk<AuthType>("auth", async () => {
  const res = await axios.get("auth/login");
  return res.data;
});
