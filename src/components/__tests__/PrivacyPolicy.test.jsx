import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import PrivacyPolicy from "../PrivacyPolicy";
import { renderWithProviders } from "../../test-utils";

test("opens and closes Privacy Policy modal", () => {
  renderWithProviders(<PrivacyPolicy />);

  fireEvent.click(screen.getByRole("button", { name: /privacy policy/i }));
  expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();

  // Close via X
  fireEvent.click(screen.getByLabelText(/close privacy policy/i));
  expect(screen.getByText(/we respect your privacy/i).parentElement.parentElement)
  .toHaveStyle({ opacity: "0" });
});
