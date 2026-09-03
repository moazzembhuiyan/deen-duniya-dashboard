"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllSunnahQuery } from "@/redux/api/sunnahApi";
import SunnahCard from "./SunnahCard";
import AddSunnahModal from "./AddSunnahModal";
import EditSunnahModal from "./EditSunnahModal";

export default function SunnahContainer() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSunnah, setSelectedSunnah] = useState(null);

  const limit = 12;

  const { data, isLoading, isFetching, isError } = useGetAllSunnahQuery({
    limit,
    page,
    searchText,
  });

  const sunnahs = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handleEdit = (item) => {
    setSelectedSunnah(item);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-950">
              Daily Sunnahs
            </h1>
            <p className="mt-1 text-sm text-emerald-700">
              {meta?.total || 0} sunnahs available
            </p>
          </div>

          <Button
            onClick={() => setIsAddOpen(true)}
            className="flex w-fit items-center gap-2 rounded-xl bg-amber-800 px-5 py-2.5 text-white hover:bg-amber-900"
          >
            <Plus className="h-5 w-5" />
            Add New Sunnah
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by title or subtitle..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border-gray-200 bg-white pl-10 focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-2xl border border-gray-100 bg-white"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500">
            Failed to load sunnahs
          </div>
        ) : sunnahs.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <p className="text-lg font-medium text-gray-500">
              No sunnahs found
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Try a different search or add a new one
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sunnahs.map((item) => (
                <SunnahCard key={item._id} sunnah={item} onEdit={handleEdit} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
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

      {/* Modals */}
      <AddSunnahModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

      {selectedSunnah && (
        <EditSunnahModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedSunnah(null);
          }}
          sunnah={selectedSunnah}
        />
      )}
    </div>
  );
}
