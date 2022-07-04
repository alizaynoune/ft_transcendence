import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProfileSlice from '@/reducers/profile'
import AuthSlice from '@/reducers/auth'
import {loadSession} from 'tools/localStorage'
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  profile: ProfileSlice,
  auth: AuthSlice
})

export const store = configureStore({
  devTools: true,
  reducer,
  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
