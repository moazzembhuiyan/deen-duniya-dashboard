"use client";

import { useState } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteSingleNotificationMutation,
} from "@/redux/api/notificationApi";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";
import NotificationItem from "./NotificationItem";

export default function NotificationContainer() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching, isError } = useGetMyNotificationQuery({
    page,
    limit,
  });

  const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();
  const [deleteAll, { isLoading: isDeletingAll }] =
    useDeleteNotificationMutation();
  const [deleteSingle] = useDeleteSingleNotificationMutation();

  const notifications = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = async () => {
    try {
      await markAsRead().unwrap();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to mark notifications as read."));
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all notifications?")) return;

    try {
      await deleteAll().unwrap();
      toast.success("All notifications deleted");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete notifications."));
    }
  };

  const handleDeleteSingle = async (id) => {
    try {
      await deleteSingle(id).unwrap();
      toast.success("Notification deleted");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete notification."));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Bell className="h-6 w-6 text-amber-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Notifications
              </h1>
              <p className="text-sm text-gray-500">
                {meta?.total || 0} total • {unreadCount} unread
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={isMarking || unreadCount === 0}
              className="rounded-xl border-amber-200 text-amber-800 hover:bg-amber-50"
            >
              <CheckCheck className="mr-1.5 h-4 w-4" />
              {isMarking ? "Marking..." : "Mark all read"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteAll}
              disabled={isDeletingAll || notifications.length === 0}
              className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              {isDeletingAll ? "Deleting..." : "Clear all"}
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-gray-100 bg-white"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500">
            Failed to load notifications
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <Bell className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-lg font-medium text-gray-500">
              No notifications yet
            </p>
            <p className="mt-1 text-sm text-gray-400">You’re all caught up!</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {notifications.map((item) => (
                <NotificationItem
                  key={item._id}
                  notification={item}
                  onDelete={handleDeleteSingle}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-xl"
                >
                  Previous
                </Button>
                <span className="text-sm font-medium text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page === totalPages || isFetching}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-xl"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
