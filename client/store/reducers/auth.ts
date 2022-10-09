import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type { AuthType } from "@/types/types";
import { AuthTunk } from "@/store/actions/auth";
import { loadToken } from "@/tools/localStorage";

interface AuthSliceType extends AuthType {
  isLoading: boolean;
  error: { message?: string } | null;
  isAuth: boolean | undefined;
  access_token: string;
}

const initialState: AuthSliceType = {
  isLoading: false,
  error: null,
  isAuth: undefined,
  access_token: loadToken(),
  username: "",
  first_name: "",
  last_name: "",
  img_url: "",
  email: "",
  notifications: [],
  intra_id: 0,
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

    saveToken: (state, { payload }) => {
      state.access_token = payload;
    },

    pushNotification: (state, { payload }) => {
      state.notifications.unshift(payload);
    },
    readNotification: (state, { payload }) => {
      const index = state.notifications.findIndex((i) => i.id === Number(payload));
      if (index > -1) state.notifications[index].read = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AuthTunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AuthTunk.rejected, (state, { error }) => {
        state.error = error;
        state.isLoading = false;
      })
      .addCase(AuthTunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        Object.assign(
          state,
          (({ username, img_url, email, intra_id, first_name, last_name, notification_notification_useridTousers }) => ({
            username,
            img_url,
            email,
            intra_id,
            first_name,
            last_name,
            notifications: notification_notification_useridTousers,
          }))(payload)
        );
      });
  },
});

export const { logout, login, saveToken, pushNotification, readNotification } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default AuthSlice.reducer;
