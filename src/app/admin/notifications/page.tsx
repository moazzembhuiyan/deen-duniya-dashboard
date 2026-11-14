import React from "react";
import NotificationContainer from "./_Component/NotificationContainer";

export const metadata = {
  title: "Notifications - dinnindunya Dashboard",
  description:
    "Manage and view all notifications in the dinnindunya community.",
};

export default function page() {
  return (
    <div>
      <NotificationContainer />
    </div>
  );
}
