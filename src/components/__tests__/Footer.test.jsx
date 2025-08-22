import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Footer from "../Footer";
import { renderWithProviders } from "../../test-utils";

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

test("subscribes with valid email", () => {
  renderWithProviders(<Footer />);

  const input = screen.getByLabelText(/email address/i);
  fireEvent.change(input, { target: { value: "test@example.com" } });

  fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));
  expect(input.value).toBe("");
});
