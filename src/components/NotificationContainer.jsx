// src/components/NotificationContainer.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../redux/notificationSlice";

export default function NotificationContainer() {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => dispatch(removeNotification(n.id)), 3000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-2 rounded-lg shadow-md text-white ${
            n.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
