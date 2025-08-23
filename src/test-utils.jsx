import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

// Import slices:
import productsReducer from "./redux/productSlice";
import cartReducer from "./redux/cartSlice";
import wishlistReducer from "./redux/wishlistSlice";
import searchReducer from "./redux/searchSlice";
import notificationsReducer from "./redux/notificationSlice";


export function renderWithProviders(
  ui,
  {
    route = "/",
    preloadedState = {},
    store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        search: searchReducer,
        notifications: notificationsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
