import type { AuthType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const AuthTunk = createAsyncThunk<AuthType>("auth", async (_, {getState}) => {
  // @ts-ignore
  const {access_token} = getState().auth
  console.log(access_token , '>>>>>>>>>>><<<<<<<<<<<<<');
  
  const res = await axios.get("profile", {headers: { Authorization: `Bearer ${access_token}` }}); // change it
  return res.data;
});
