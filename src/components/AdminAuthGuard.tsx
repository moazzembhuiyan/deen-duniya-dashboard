"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AdminPageSkeleton } from "@/components/LoadingSkeleton";
import { logout, selectToken, selectUser } from "@/redux/features/authSlice";

export default function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const unauthorizedRole =
    Boolean(user?.role) && user?.role?.toLowerCase() !== "admin";
  const isAuthorized = Boolean(token) && !unauthorizedRole;

  useEffect(() => {
    if (!isAuthorized) {
      if (unauthorizedRole) dispatch(logout());
      router.replace("/login");
    }
  }, [dispatch, isAuthorized, router, unauthorizedRole]);

  if (!isAuthorized) return <AdminPageSkeleton />;

  return children;
}
