import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import FAQSection from "../FAQSection";
import { renderWithProviders } from "../../test-utils";

test("FAQ expands an item", () => {
  renderWithProviders(<FAQSection />);
  const firstQ = screen.getByText(/what is your return policy/i);
  expect(firstQ).toBeInTheDocument();

  // Using <details>, clicking summary toggles open attribute.
  fireEvent.click(firstQ);
  // After click, the answer should be visible
  expect(screen.getByText(/free returns within 30 days/i)).toBeInTheDocument();
});
