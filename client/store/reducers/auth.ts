import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { AuthType } from "@/types/types";
import { AuhtTunk } from "@/actions/auth";
import {saveSession} from 'tools/localStorage'

interface AuthSliceType extends AuthType {
  isLoading: boolean;
  error: unknown;
  isAuth: boolean;
}

const initialState: AuthSliceType = {
  isLoading: false,
  error: null,
  isAuth: false,
  id: "",
  email: "",
  avatar: "",
  name: {
    first: "",
    last: "",
  },
  username: "",
  token: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true
      console.log(payload, "done");
    },

    logout: (state) => {
      Object.assign(state, { ...initialState });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuhtTunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AuhtTunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        Object.assign(state, { ...payload });
        // saveSession(state)
        // AuthSlice.actions.login(payload);
      });
  },
});

export const { logout } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default AuthSlice.reducer;
