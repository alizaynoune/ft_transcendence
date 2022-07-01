import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProfileSlic from '@/reducers/profile'

export const store = configureStore({
  reducer: {
    profile: ProfileSlic
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
