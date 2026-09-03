import React from "react";
import ResetPasswordPage from "./Component/ResetpassForm";
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
        <ResetPasswordPage />
      </Suspense>
    </div>
  );
}
