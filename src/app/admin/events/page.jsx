import React from "react";
import EventsPage from "./_Component/events-page";

export const metadata = {
  title: "Events - dinnindunya Dashboard",
  description: "Manage and view all events in the dinnindunya community.",
};

export default function page() {
  return (
    <div>
      <EventsPage />
    </div>
  );
}
