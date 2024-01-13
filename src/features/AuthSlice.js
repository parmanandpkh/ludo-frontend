import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || "",
   
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      
    },
    logout(state) {
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
