"use client";

import { useState } from "react";
import UserModal from "./user-modal";
import UserList from "./Userlist";
import { useGetAllusersQuery } from "@/redux/api/userApi";

export default function AccTable() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 10;

  const { data, isLoading, isFetching, isError } = useGetAllusersQuery({
    limit,
    page,
    searchText,
  });

  const users = data?.data?.userList || [];
  const meta = data?.meta;

  const handleUserClick = (user) => {
    setSelectedUserId(user._id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 md:p-8">
      {/* Header + Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">
            Total: {meta?.total || 0} users
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1); // reset to first page on search
            }}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-4 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
        </div>
      ) : isError ? (
        <div className="flex h-64 items-center justify-center text-gray-500">
          Failed to load users
        </div>
      ) : (
        <>
          <UserList
            users={users}
            onUserClick={handleUserClick}
            isFetching={isFetching}
          />

          {/* Simple Pagination */}
          {meta && meta.totalPage > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {meta.totalPage}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPage, p + 1))}
                disabled={page === meta.totalPage}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {isModalOpen && selectedUserId && (
        <UserModal
          userId={selectedUserId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
