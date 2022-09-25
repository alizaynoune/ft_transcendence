import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { AuthType } from "@/types/types";
import { AuthTunk } from "@/store/actions/auth";
import {deletToken} from '@/tools/localStorage'

interface AuthSliceType extends AuthType {
  isLoading: boolean;
  error: unknown;
  isAuth: boolean;
}

// username(pin):"alzaynou"
// sub(pin):51111
// first_name(pin):"Ali"
// last_name(pin):"Zaynoune"
// img_url(pin):"https://cdn.intra.42.fr/users/alzaynou.jpg"

const initialState: AuthSliceType = {
  isLoading: false,
  error: null,
  isAuth: false,
  username: '',
  first_name: '',
  last_name: '',
  img_url: ''
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log(payload, '<<<<<<<<<<<');
      
      state.isLoading = false;
      state.isAuth = true
//console.log(payload, "done");
    },

    logout: (state) => {
      Object.assign(state, { ...initialState });
      deletToken()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthTunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AuthTunk.fulfilled, (state, { payload }) => {
        // console.log(payload);
        
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
