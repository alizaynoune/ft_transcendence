import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

import type { ProfileType } from "@/types/types";
import {profileThunk} from '@/store/actions/profile'

interface ProfileState {
  isLoading: boolean;
  error: unknown;
  isAuth: boolean;
  Profile: ProfileType;
};

const initialState: ProfileState = {
  isLoading: false,
  error: null,
  isAuth: false,
  Profile: {
    id: "",
    username: "",
    name: {
      first: "",
      last: "",
    },
    email: "",
    phone: "",
    gender: "",
    birthday: "",
    location: "",
    avatar: "",
    level: 0,
    achievements: [],
    matches: {
      total: 0,
      winne: 0,
    },
  },
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
//console.log(action, 'done');
      
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: builder => {
    // login Status
    builder
    .addCase(profileThunk.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(profileThunk.fulfilled, (state, {payload}) => {
      // ProfileSlice
//console.log(payload, 'done');
      state.isLoading = false
      state.Profile = payload
    })
    .addCase(profileThunk.rejected, (state, {payload}) => {
      state.isLoading = false
      state.error = payload
    } )
  }
});

export const { login, logout } = ProfileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;
export default ProfileSlice.reducer;
