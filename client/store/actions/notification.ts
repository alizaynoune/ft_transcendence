import type { NotificationType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const NotifcationTunk = createAsyncThunk<NotificationType>("notification", async () => {
    // ! change endPoint
  const res = await axios.get("api/fake/login");
  return res.data;
});