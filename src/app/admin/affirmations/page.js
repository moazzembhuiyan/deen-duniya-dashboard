import React from "react";
import AffirmationsContainer from "./_Component/AffirmationsContainer";

export const metadata = {
  title: "Affirmations - dinnindunya Dashboard",
  description: "Manage and view all affirmations in the dinnindunya community.",
};

export default function page() {
  return (
    <div>
      <AffirmationsContainer />
    </div>
  );
}
