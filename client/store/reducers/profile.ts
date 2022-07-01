import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

export type ProfileState = {
  username: string | null;
};

const initialState: ProfileState = {
  username: null,
};

export const ProfileSlice =createSlice({
  name: "profile",
  initialState,
  reducers: {
    login: (state) => {
      state.username = "ali";
    },
    logout: (state) => {
      state.username = null;
    },
  },
});

export const {
    login,
    logout
} = ProfileSlice.actions

export const selectProfile = (state: RootState) => state.profile
export default ProfileSlice.reducer