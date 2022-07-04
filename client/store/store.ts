import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProfileSlice from '@/reducers/profile'
import AuthSlice from '@/reducers/auth'
import {loadSession} from 'tools/localStorage'

const reducer = {
  profile: ProfileSlice,
    auth: AuthSlice
}
const preloadedState = typeof window !== 'undefined' ? loadSession() : reducer

export const store = configureStore({
  devTools: true,
  reducer,
  preloadedState
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
