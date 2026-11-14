import React from "react";
import ForgotPasswordPage from "./_Component/ForgetpassForm";
import { ContentSkeleton } from "@/components/LoadingSkeleton";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
