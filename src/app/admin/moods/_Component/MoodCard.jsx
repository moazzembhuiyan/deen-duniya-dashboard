"use client";

import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MoodCard({ mood, onEdit }) {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Edit Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(mood)}
        className="absolute top-2 right-2 h-8 w-8 rounded-full text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-amber-50 hover:text-amber-800"
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      {/* Emoji */}
      <div className="mb-3 text-5xl">{mood.emoji}</div>

      {/* Title */}
      <h3 className="text-center text-base font-semibold text-gray-900">
        {mood.title}
      </h3>
    </div>
  );
}
