"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllMoodsQuery } from "@/redux/api/moodsApi";
import MoodCard from "./MoodCard";
import AddMoodModal from "./AddMoodModal";
import EditMoodModal from "./EditMoodModal";

export default function MoodContainer() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<{ _id: string } | null>(
    null,
  );

  const limit = 20;

  const { data, isLoading, isError } = useGetAllMoodsQuery({
    limit,
    page,
    searchText,
  });

  const moods = data?.data || [];

  const handleEdit = (mood) => {
    setSelectedMood(mood);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-amber-950">
              Moods
            </h1>
            <p className="mt-1 text-sm text-amber-700">
              {moods.length} moods available
            </p>
          </div>

          <Button
            onClick={() => setIsAddOpen(true)}
            className="flex w-fit items-center gap-2 rounded-xl bg-amber-800 px-5 py-2.5 text-white hover:bg-amber-900"
          >
            <Plus className="h-5 w-5" />
            Add New Mood
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search moods..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border-gray-200 bg-white pl-10 focus-visible:ring-amber-500"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl border border-gray-100 bg-white"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500">
            Failed to load moods
          </div>
        ) : moods.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <p className="text-lg font-medium text-gray-500">No moods found</p>
            <p className="mt-1 text-sm text-gray-400">
              Try a different search or add a new one
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {moods.map((mood) => (
              <MoodCard key={mood._id} mood={mood} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddMoodModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

      {selectedMood && (
        <EditMoodModal
          key={selectedMood._id}
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedMood(null);
          }}
          mood={selectedMood}
        />
      )}
    </div>
  );
}
