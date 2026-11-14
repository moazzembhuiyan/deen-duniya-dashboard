"use client";

import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DuaCard({ dua, onEdit }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Banner */}
      <div className="relative h-36 w-full overflow-hidden">
        {dua.banner ? (
          <Image
            src={dua.banner}
            alt={dua.category}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-amber-100 to-amber-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-900">
          {dua.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <p
            className="text-right text-lg leading-relaxed text-gray-900"
            dir="rtl"
            style={{ fontFamily: "Amiri, serif" }}
          >
            {dua.arabic_text}
          </p>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(dua)}
            className="h-8 w-8 shrink-0 rounded-full text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-amber-50 hover:text-amber-800"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-1 text-sm text-gray-600 italic">
          {dua.transliteration}
        </p>
        <p className="line-clamp-2 text-sm text-gray-800">
          {dua.english_meaning}
        </p>

        {dua.benefit && (
          <p className="mt-3 line-clamp-2 text-xs text-amber-700">
            <span className="font-medium">Benefit:</span> {dua.benefit}
          </p>
        )}
      </div>
    </div>
  );
}
