"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import AddEventModal from "./add-event-modal";
import EditEventModal from "./edit-event-modal";
import EventCard from "./event-card";
import { useGetAllEventsQuery } from "@/redux/api/eventApi";

export default function EventsPage() {
  const currentYear = new Date().getFullYear();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [year, setYear] = useState(currentYear);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const limit = 12;

  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery({
    limit,
    page,
    searchText,
    year,
  });

  const events = data?.data?.events || [];
  const totalEvents = data?.data?.totalEvents || 0;
  const totalPages = Math.ceil(totalEvents / limit) || 1;

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const years = [2024, 2025, 2026, 2027];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-amber-950">
              Important Islamic Events
            </h1>
            <p className="mt-1 text-sm text-amber-700">
              {totalEvents} events in {year}
            </p>
          </div>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex w-fit items-center gap-2 rounded-xl bg-amber-800 px-5 py-2.5 text-white hover:bg-amber-900"
          >
            <Plus className="h-5 w-5" />
            Add new event
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border-gray-200 bg-white pl-10 focus-visible:ring-amber-500"
            />
          </div>

          <select
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl border border-gray-100 bg-white"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500">
            Failed to load events
          </div>
        ) : events.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <p className="text-lg font-medium text-gray-500">No events found</p>
            <p className="mt-1 text-sm text-gray-400">
              Try changing the year or search term
            </p>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEdit={handleEditEvent}
                />
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
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {editingEvent && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEvent(null);
          }}
          event={editingEvent}
        />
      )}
    </div>
  );
}
