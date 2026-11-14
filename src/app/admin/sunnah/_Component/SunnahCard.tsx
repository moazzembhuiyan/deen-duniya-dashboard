"use client";

import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SunnahCard({ sunnah, onEdit }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {sunnah.title}
          </h3>
          <p className="mt-1 text-sm text-emerald-700">{sunnah.subtitle}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(sunnah)}
          className="h-8 w-8 shrink-0 rounded-full text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-emerald-50 hover:text-emerald-700"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Arabic Text */}
      <div className="rounded-xl bg-emerald-50/70 p-4 text-right">
        <p
          className="text-lg leading-relaxed text-emerald-950"
          style={{ fontFamily: "Amiri, serif" }}
          dir="rtl"
        >
          {sunnah.arabicText}
        </p>
      </div>
    </div>
  );
}
