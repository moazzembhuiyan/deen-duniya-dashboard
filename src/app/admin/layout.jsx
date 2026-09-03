import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="flex h-screen dark:bg-gray-200">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
