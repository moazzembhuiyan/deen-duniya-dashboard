import React from "react";
import MoodContainer from "./_Component/MoodContainer";

export const metadata = {
  title: "Moods - dinnindunya Dashboard",
  description: "Manage and view all moods in the dinnindunya community.",
};

export default function page() {
  return (
    <div>
      <MoodContainer />
    </div>
  );
}
