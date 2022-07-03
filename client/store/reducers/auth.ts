import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { AuthType } from "@/types/types";
import { AuhtTunk } from "@/actions/auth";

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
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(AuhtTunk.pending, (state) => {
        state.isLoading = true
        state.error = null
    })
    .addCase(AuhtTunk.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false
      state.isAuth = true
      Object.assign(state, {...payload})
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export default AuthSlice.reducer;
