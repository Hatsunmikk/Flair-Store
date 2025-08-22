import React from "react";
import { screen } from "@testing-library/react";
import NotificationContainer from "../NotificationContainer";
import { renderWithProviders } from "../../test-utils";
import { addNotification } from "../../redux/notificationSlice";
import { act } from "react";

jest.useFakeTimers();

test("auto-hides notifications", () => {
  const { store } = renderWithProviders(<NotificationContainer />);

  // Dispatch a notification
  act ( () => {store.dispatch(addNotification({ message: "Hello", type: "success" })); });
  expect(screen.getByText(/hello/i)).toBeInTheDocument();

  // Advance timers inside React act() so the DOM updates
  act(() => {
    jest.advanceTimersByTime(3100);
  });

  // Now it should disappear
  expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
});
