"use client";

import { useGetMyNotificationQuery } from "@/redux/api/notificationApi";
import { Bell, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { data } = useGetMyNotificationQuery({
    page: 1,
    limit: 100,
  });
  const notifications = Array.isArray(data?.data) ? data.data : [];
  const unreadCount = notifications.filter((n) => !n.read).length;
  const pageTitle =
    pathname
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Admin Panel";

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            {pageTitle}
          </span>
        </div>
        <div className="mx-auto max-w-md flex-1" />
        <div className="flex items-center gap-4">
          <Link
            href="/admin/notifications"
            aria-label={
              unreadCount
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
            className="relative rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 rounded-full bg-red-500 px-1 text-center text-[10px] leading-4 text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>
          <Link
            href="/admin/settings"
            aria-label="Settings"
            className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
          </Link>
          <Link
            href="/admin/admin-profile"
            aria-label="Admin profile"
            className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
