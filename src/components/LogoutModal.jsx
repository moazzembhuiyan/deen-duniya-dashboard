"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LogoutConfirmModal({
  isOpen = true,
  onLogout,
  onDiscard,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    if (onLogout) {
      await onLogout();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-3xl bg-gradient-to-b from-teal-500 to-teal-600 p-12 shadow-2xl">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-4">
            <div className="relative flex items-center justify-center">
              <svg
                viewBox="0 0 64 64"
                className="h-12 w-12 text-teal-600"
                fill="currentColor"
              >
                {/* Head */}
                <path d="M32 8C20.95 8 12 16.95 12 28c0 3.35.73 6.53 2.05 9.4L10 50l12.6-3.05C27.47 49.27 29.65 50 32 50c11.05 0 20-8.95 20-20S43.05 8 32 8zm0 36c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z" />
                {/* Chat bubble */}
                <circle cx="32" cy="28" r="2" fill="white" />
                <circle cx="38" cy="28" r="2" fill="white" />
                <circle cx="26" cy="28" r="2" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Branding */}
        <h3 className="mb-8 text-center text-lg font-semibold text-white">
          Open Minds
        </h3>

        {/* Content */}
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white">Are You Sure?</h2>
          <p className="text-base leading-relaxed text-white/90">
            You won't have access to your account until you login again.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            className="h-auto w-full bg-white py-3 text-base font-semibold text-teal-600 hover:bg-white/90"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
          <button
            onClick={onDiscard}
            className="w-full py-3 text-base font-medium text-white/80 transition-colors hover:text-white"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
