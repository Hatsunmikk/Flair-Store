import React from "react";
import { renderWithProviders } from "../../test-utils";
import Cart from "../Cart";
import { screen } from "@testing-library/react";

test("Cart renders without crashing", () => {
  renderWithProviders(<Cart cartItems={[]} setCartItems={() => {}} />);
  // You can assert something generic if the page has a heading, otherwise this is a smoke test.
  expect(screen.getByText(/cart/i)).toBeInTheDocument();
});
