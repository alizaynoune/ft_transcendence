import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { AuthType } from "@/types/types";
import { AuthTunk } from "@/store/actions/auth";
import {
  deletToken,
  saveToken as saveTokenLocal,
  loadToken,
} from "@/tools/localStorage";
import { useAppDispatch } from "@/hooks/reduxHooks";

interface AuthSliceType extends AuthType {
  isLoading: boolean;
  error: { message?: string } | null;
  isAuth: boolean;
  access_token: string;
}

const initialState: AuthSliceType = {
  isLoading: false,
  error: null,
  isAuth: false,
  access_token: "",
  username: "",
  first_name: "",
  last_name: "",
  img_url: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
    },

    logout: (state) => {
      Object.assign(state, { ...initialState });
      state.access_token = "";
    },

    saveToken: (state, { payload }) =>  {
      state.access_token = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AuthTunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AuthTunk.rejected, (state, { error }) => {
        console.log(error, "payload error");
        state.error = error;
        state.isLoading = false;
      })
      .addCase(AuthTunk.fulfilled, (state, { payload }) => {
        // console.log(payload);
        
        state.isLoading = false;
        state.isAuth = true;
        Object.assign(state, { ...payload });
      });
  },
});

export const { logout, login, saveToken } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default AuthSlice.reducer;
