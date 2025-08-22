import React from "react";
import { renderWithProviders } from "../../test-utils";
import Login from "../Login";
import { screen } from "@testing-library/react";

test("Login renders without crashing", () => {
  renderWithProviders(<Login />);

  // Specifically check the h2 heading
  expect(
    screen.getByRole("heading", { level: 2, name: /login/i })
  ).toBeInTheDocument();

  // Specifically check the button
  expect(
    screen.getByRole("button", { name: /^login$/i })
  ).toBeInTheDocument();
});
