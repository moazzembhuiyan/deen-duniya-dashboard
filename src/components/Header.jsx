"use client";

import { useGetMyNotificationQuery } from "@/redux/api/notificationApi";
import { Bell, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const limit = 1000000000000000;

  const { data, isLoading, isFetching, isError } = useGetMyNotificationQuery({
    page,
    limit,
  });
  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            {pathname === "/admin/dashboard"
              ? "Dashboard"
              : pathname === "/admin/users"
                ? "Users"
                : pathname === "/admin/groups"
                  ? "Groups"
                  : pathname === "/admin/reports"
                    ? "Reports"
                    : pathname === "/admin/assign"
                      ? "Assign"
                      : "Admin Panel"}
          </span>
        </div>
        <div className="mx-auto max-w-md flex-1"></div>
        <div className="flex items-center gap-4">
          <Link href="/admin/notifications">
            <button className="relative rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              )}
            </button>
          </Link>
          <button className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </button>
          <Link href="/admin/admin-profile">
            <button className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100">
              <User className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
