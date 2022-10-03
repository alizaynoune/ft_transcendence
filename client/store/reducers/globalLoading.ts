import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { AuthTunk } from "@/store/actions/auth";
import { setTimeout } from "timers/promises";

interface SliceType {Loading: boolean}

const initialState: SliceType = {Loading: false}

export const LoadingSlice = createSlice({
    name: 'GlobaleLoading',
    initialState,
    reducers: {
        changeLoading: (state, {payload}) => {
            state.Loading = payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(AuthTunk.pending, (state) => {
            state.Loading = true
          })
          .addCase(AuthTunk.rejected, (state) => {
            state.Loading = false
          })
          .addCase(AuthTunk.fulfilled, (state) => {
            state.Loading = false
          });
      },
})

export const {changeLoading} = LoadingSlice.actions
export const selectLoading = (state: RootState) => state.Loading
export default LoadingSlice.reducer