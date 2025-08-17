import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import notificationReducer from "./notificationSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    search: searchReducer,
    notifications: notificationReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store updates and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});
