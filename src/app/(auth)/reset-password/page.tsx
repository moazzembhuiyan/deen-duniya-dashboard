import ResetPasswordPage from "./Component/ResetpassForm";
import { Suspense } from "react";
import { ContentSkeleton } from "@/components/LoadingSkeleton";

export default function ResetPasswordRoute() {
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
