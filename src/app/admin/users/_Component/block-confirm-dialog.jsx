"use client";

import { AlertCircle } from "lucide-react";

export default function BlockConfirmDialog({ userName, onConfirm, onCancel }) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onCancel} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-lg bg-[#705446] text-white shadow-lg">
          {/* Content */}
          <div className="p-6">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>

            <h3 className="text-center text-lg font-semibold text-white">
              Block User?
            </h3>

            <p className="mt-2 text-center text-sm text-white">
              Are you sure you want to block{" "}
              <span className="font-medium">{userName}</span>? This user will no
              longer be able to access their account.
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-gray-200 p-6">
            <button
              onClick={onCancel}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Block User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
