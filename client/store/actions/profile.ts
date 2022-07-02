import type { ProfileType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import {useAppDispatch, useAppSelector} from '@/hooks/reduxHooks'
import {login} from '@/reducers/profile'

export const profileThunk = createAsyncThunk<ProfileType>("login", async () => {
    console.log('login');
    
  try {
    const res = await axios.get("api/fake/user");
    console.log(res);
    // return useAppDispatch(login(res.data))
    return res.data;
  } catch (error) {
      return (error)
    console.log(error);
    
  }
});
