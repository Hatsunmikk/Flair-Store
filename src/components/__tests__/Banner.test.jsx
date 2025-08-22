import React from "react";
import { screen } from "@testing-library/react";
import Banner from "../Banner";
import { renderWithProviders } from "../../test-utils";

test("Banner renders headline and CTA", () => {
  renderWithProviders(<Banner />);
  expect(screen.getByText(/discover your style/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /shop now/i })).toBeInTheDocument();
});
