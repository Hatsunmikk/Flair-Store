import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { renderWithProviders } from "../../test-utils";

describe("Header", () => {
  test("renders logo and toggles search", () => {
    renderWithProviders(<Header />);

    expect(screen.getByText(/flair store/i)).toBeInTheDocument();

    const openSearchBtn = screen.getAllByRole("button", { name: /open search/i })[0];
    fireEvent.click(openSearchBtn);

    const input = screen.getAllByPlaceholderText(/search products/i)[0];
    expect(input).toBeInTheDocument();

    const closeBtn = screen.getAllByLabelText(/close search/i)[0];
    fireEvent.click(closeBtn);

    expect(input).not.toBeInTheDocument(); // still in DOM on mobile container, but hidden on desktop
    //expect(input.closest("div")).toHaveStyle({ opacity: "0" });
  });

  test("shows cart/wishlist badges when counts > 0", () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        cart: { items: [{ id: 1 }] },
        wishlist: [{ id: 2 }],
      },
    });
    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });
});
