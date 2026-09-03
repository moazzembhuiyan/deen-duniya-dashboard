"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function UserList({ users, onUserClick, isFetching }) {
  if (users.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400">
        No users found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {isFetching && (
        <div className="border-b border-gray-100 bg-cyan-50 px-4 py-2 text-center text-xs text-cyan-600">
          Updating...
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => onUserClick(user)}
            className="group flex cursor-pointer items-center justify-between px-5 py-4 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#705446] to-[#3C3431]">
                {user.photoUrl ? (
                  <Image
                    src={user.photoUrl}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                  user.status === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {user.status}
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400 transition group-hover:text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
