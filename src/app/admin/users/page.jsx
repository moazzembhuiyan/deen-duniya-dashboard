import React from "react";
import UserSettings from "./_Component/UserSeetings";
export const metadata = {
  title: "Users - dinnindunya Dashboard",
  description: "Manage and view all users in the dinnindunya community.",
};

export default function page() {
  return (
    <div>
      <UserSettings />
    </div>
  );
}
