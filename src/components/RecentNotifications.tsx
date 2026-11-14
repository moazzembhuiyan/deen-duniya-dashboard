"use client";

import { Bell } from "lucide-react";

export default function RecentNotifications({ notifications }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Bell className="h-5 w-5 text-cyan-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Notifications
        </h2>
      </div>

      <div className="max-h-[340px] space-y-3 overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            No notifications yet
          </p>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`rounded-lg border p-3 transition ${
                item.read
                  ? "border-gray-100 bg-gray-50"
                  : "border-cyan-100 bg-cyan-50/50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.message}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
                {!item.read && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                )}
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                {formatDate(item.date)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
