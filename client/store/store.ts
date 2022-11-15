import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import AuthSlice from "@/reducers/auth";
import Loading from "@/reducers/globalLoading";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
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
