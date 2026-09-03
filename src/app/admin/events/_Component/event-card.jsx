"use client";

import { Calendar, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventCard({ event, onEdit }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Date Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(event.date)}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(event)}
          className="h-8 w-8 rounded-full text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-amber-50 hover:text-amber-800"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
        {event.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
        {event.description}
      </p>

      {/* Type */}
      <div className="mt-4">
        <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-gray-600 uppercase">
          {event.type || "Islamic"}
        </span>
      </div>
    </div>
  );
}
