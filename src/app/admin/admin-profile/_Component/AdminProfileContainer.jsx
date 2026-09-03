"use client";

import { useState } from "react";
import AdminProfileSection from "./AdminProfileSection";
import ChangePasswordSection from "./ChangePasswordSection";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content */}
      <div className="mx-auto w-[60%] p-8">
        <div className="max-w-8xl h-[520px] rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab("profile")}
              className={`relative flex-1 px-6 py-4 text-center font-medium transition-all ${
                activeTab === "profile"
                  ? "text-[#00C897]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Edit Profile
              {activeTab === "profile" && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#00C897]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`relative flex-1 px-6 py-4 text-center font-medium transition-all ${
                activeTab === "password"
                  ? "text-[#00C897]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Change Password
              {activeTab === "password" && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#00C897]"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "profile" && <AdminProfileSection />}
            {activeTab === "password" && <ChangePasswordSection />}
          </div>
        </div>
      </div>
    </div>
  );
}
