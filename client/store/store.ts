import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProfileSlice from '@/reducers/profile'
import AuthSlice from '@/reducers/auth'

export const store = configureStore({
  reducer: {
    profile: ProfileSlice,
    auth: AuthSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
