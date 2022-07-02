import type { AuthType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const AuhtTunk = createAsyncThunk<AuthType>("auth", async () => {
  try {
    const res = await axios.get("api/fake/login");
    return res.data;
  } catch (error) {
    return error;
  }
});
