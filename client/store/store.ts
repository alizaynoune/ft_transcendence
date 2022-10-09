import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProfileSlice from "@/reducers/profile";
import AuthSlice, { selectAuth } from "@/reducers/auth";
import Loading from "@/reducers/globalLoading";
import { loadToken } from "tools/localStorage";
import { combineReducers } from "@reduxjs/toolkit";
import auth from "@/reducers/auth";
import { StateContext } from "react-scroll-to-bottom";
// import auth from "@/reducers/auth";

const reducer = combineReducers({
  profile: ProfileSlice,
  auth: AuthSlice,
  Loading,
});

export const store = configureStore({
  devTools: true,
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
