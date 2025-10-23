import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

const initialState = {
  loading: false,
  userInfo: null,
  token: null,
  error: null  as null |any,
  success: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        if (payload) {
          state.userInfo = payload;
          state.token = payload
        }
      });
      

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        if (payload) {
          state.userInfo = payload;
          state.token = payload
        }
      });
      
 
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const authReducer = authSlice.reducer;
