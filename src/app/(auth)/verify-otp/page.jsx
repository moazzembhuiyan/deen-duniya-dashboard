import React from "react";
import VerifyOtpPage from "./_Component/VerifyOtpForm";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <VerifyOtpPage />
      </Suspense>
    </div>
  );
}
