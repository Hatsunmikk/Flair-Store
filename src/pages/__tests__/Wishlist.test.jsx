import React from "react";
import { renderWithProviders } from "../../test-utils";
import Wishlist from "../Wishlist";
import { screen } from "@testing-library/react";

test("Wishlist renders without crashing", () => {
  renderWithProviders(<Wishlist wishlistItems={[]} setWishlistItems={() => {}} />);
  expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
});
