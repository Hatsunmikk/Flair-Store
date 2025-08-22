import React from "react";
import { renderWithProviders } from "../../test-utils";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "../ProductDetails";
import { screen } from "@testing-library/react";

// Mock fetch so we don’t actually call fakestoreapi
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Test Product",
          price: 99.99,
          description: "A great product",
          category: "electronics",
          image: "test.jpg",
          rating: { rate: 4.5, count: 10 },
        }),
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore();
});

test("ProductDetails renders for a given route", async () => {
  renderWithProviders(
    <Routes>
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>,
    { route: "/product/1" }
  );

  // wait for mocked product title to appear
  expect(await screen.findByText(/test product/i)).toBeInTheDocument();
});
