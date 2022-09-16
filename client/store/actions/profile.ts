import type { ProfileType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const profileThunk = createAsyncThunk<ProfileType>("login", async () => {
//console.log("login");

  try {
    const res = await axios.get("api/fake/user");
    return res.data;
  } catch (error) {
    return error;
  }
});
