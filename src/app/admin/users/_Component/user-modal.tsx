"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import BlockConfirmDialog from "./block-confirm-dialog";
import {
  useGetSingleUserQuery,
  useChangeUserStatusMutation,
} from "@/redux/api/userApi";

export default function UserModal({ userId, isOpen, onClose }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data, isLoading, isError } = useGetSingleUserQuery(userId, {
    skip: !isOpen || !userId,
  });

  const [changeStatus, { isLoading: isUpdating }] =
    useChangeUserStatusMutation();

  if (!isOpen) return null;

  const user = data?.data;

  const handleBlockClick = () => {
    if (user?.status === "active") {
      setShowConfirmDialog(true);
    } else {
      // Unblock directly
      changeStatus({
        userId: user._id,
        status: "active",
      });
    }
  };

  const handleConfirmBlock = async () => {
    try {
      await changeStatus({
        userId: user._id,
        status: "blocked",
      }).unwrap();
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Failed to change status", error);
    }
  };

  const isActive = user?.status === "active";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-md transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100/80 px-6 py-5">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
              User Profile
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8 p-6 sm:p-8">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
              </div>
            ) : isError || !user ? (
              <div className="flex h-64 items-center justify-center text-gray-500">
                Failed to load user details
              </div>
            ) : (
              <>
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-3xl font-bold text-white shadow-xl ring-4 ring-white ring-offset-2">
                      {user.photoUrl ? (
                        <Image
                          src={user.photoUrl}
                          alt={user.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        user.name?.charAt(0)?.toUpperCase() || "?"
                      )}
                    </div>
                    <span
                      className={`absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-white ${
                        isActive ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-6">
                  {[
                    { label: "Full Name", value: user.name },
                    { label: "Email Address", value: user.email },
                    {
                      label: "Contact Number",
                      value: user.contractNumber || "—",
                    },
                    {
                      label: "Address",
                      value: user.address || "—",
                    },
                    {
                      label: "User ID",
                      value: user.id || "—",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        {item.label}
                      </label>
                      <p className="truncate text-base font-medium text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  ))}

                  {/* Status */}
                  <div className="flex items-center gap-5">
                    <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                      Account Status
                    </label>
                    <span
                      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                        isActive
                          ? "border border-emerald-200 bg-emerald-100 text-emerald-800"
                          : "border border-rose-200 bg-rose-100 text-rose-800"
                      }`}
                    >
                      <span
                        className={`mr-1.5 h-2 w-2 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      {isActive ? "Active" : "Blocked"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {!isLoading && user && (
            <div className="flex items-center gap-4 border-t border-gray-100/80 bg-gray-50/80 px-6 py-5">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98]"
              >
                Cancel
              </button>

              <button
                onClick={handleBlockClick}
                disabled={isUpdating}
                className={`flex-1 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-60 ${
                  isActive
                    ? "bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                }`}
              >
                {isUpdating
                  ? "Updating..."
                  : isActive
                    ? "Block User"
                    : "Unblock User"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && user && (
        <BlockConfirmDialog
          userName={user.name}
          onConfirm={handleConfirmBlock}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  );
}
