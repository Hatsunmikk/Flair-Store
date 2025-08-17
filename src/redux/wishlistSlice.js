// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [], // ✅ directly an array
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearWishlist: () => {
      return [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
