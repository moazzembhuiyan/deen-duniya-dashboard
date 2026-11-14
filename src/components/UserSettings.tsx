"use client";

import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserSettings({ users, isFetching }) {
  const [search, setSearch] = useState("");
  const userList = Array.isArray(users) ? users : [];

  const filteredUsers = userList.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
        {isFetching && (
          <span className="animate-pulse text-xs text-gray-400">
            Updating...
          </span>
        )}
      </div>

      <div className="relative mb-5">
        <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pr-3 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
        />
      </div>

      <div className="mb-4 max-h-[380px] space-y-1 overflow-y-auto pr-1">
        {filteredUsers.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">
            No users found
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-all hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#705446] to-[#3C3431]">
                  {user.photoUrl ? (
                    <Image
                      src={user.photoUrl}
                      alt={user.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                      {user.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {user.name || "Unnamed user"}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {user.email || "No email"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                    user.status === "active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.status || "unknown"}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400 transition group-hover:text-gray-600" />
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href="/admin/users"
        className="text-sm font-medium text-cyan-600 transition hover:text-cyan-700"
      >
        View all users →
      </Link>
    </div>
  );
}
