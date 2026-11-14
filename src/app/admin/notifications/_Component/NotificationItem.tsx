"use client";

import { Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationItem({ notification, onDelete }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUnread = !notification.read;

  return (
    <div
      className={`group relative rounded-2xl border p-5 transition-all ${
        isUnread
          ? "border-amber-200 bg-amber-50/40"
          : "border-gray-100 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isUnread
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <CreditCard className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">
                  {notification.message}
                </h3>
                {isUnread && (
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                {notification.description}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {formatDate(notification.date || notification.createdAt)}
              </p>
            </div>

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(notification._id)}
              className="h-8 w-8 shrink-0 rounded-full text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
