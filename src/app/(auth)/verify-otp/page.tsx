import VerifyOtpPage from "./_Component/VerifyOtpForm";
import { Suspense } from "react";
import { ContentSkeleton } from "@/components/LoadingSkeleton";

export default function VerifyOtpRoute() {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <VerifyOtpPage />
    </Suspense>
  );
}
