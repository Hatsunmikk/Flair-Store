import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will store logged-in user info
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// Default export so store.js can import it
export default authSlice.reducer;
