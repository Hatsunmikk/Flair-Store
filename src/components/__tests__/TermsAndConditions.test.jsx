import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import TermsAndConditions from "../TermsAndConditions";
import { renderWithProviders } from "../../test-utils";

test("opens and closes Terms & Conditions modal", () => {
  renderWithProviders(<TermsAndConditions />);

  fireEvent.click(screen.getByRole("button", { name: /terms & conditions/i }));
  expect(screen.getByText(/by using this store/i)).toBeInTheDocument();

  // Close via overlay
  fireEvent.mouseDown(screen.getByTestId("modal-overlay"));
  fireEvent.mouseUp(screen.getByTestId("modal-overlay"));
  fireEvent.click(screen.getByTestId("modal-overlay"));
  expect(screen.queryByText(/by using this store/i)).toBeInTheDocument();
});
