import React from "react";
import { screen } from "@testing-library/react";
import Home from "../Home";
import { renderWithProviders } from "../../test-utils";

const items = [
  { id: 1, title: "A", image: "x", price: 10, category: "cat1" },
  { id: 2, title: "B", image: "y", price: 20, category: "cat2" },
];

test("renders products grid when succeeded", () => {
  renderWithProviders(<Home />, {
    preloadedState: {
      products: { items, status: "succeeded", error: null },
      search: { term: "" },
      cart: { items: [] },
      wishlist: [],
    },
  });

  // Headline sections present
  expect(screen.getByText(/browse products/i)).toBeInTheDocument();

  // 2 products visible
  expect(screen.getAllByText(/\$\d+/).length).toBeGreaterThanOrEqual(2);
});
