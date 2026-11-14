"use client";

import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AffirmationCard({ affirmation, onEdit }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Edit Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(affirmation)}
        className="absolute top-4 right-4 h-8 w-8 rounded-full text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-amber-50 hover:text-amber-800"
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      {/* Arabic Text */}
      <div className="mb-4 rounded-xl bg-amber-50/70 p-4 text-right">
        <p
          className="text-xl leading-relaxed text-amber-950"
          dir="rtl"
          style={{ fontFamily: "Amiri, serif" }}
        >
          {affirmation.arabic_text}
        </p>
      </div>

      {/* Transliteration */}
      <p className="mb-2 text-sm text-gray-600 italic">
        {affirmation.transliteration}
      </p>

      {/* English Meaning */}
      <p className="mb-4 text-sm font-medium text-gray-800">
        {affirmation.english_meaning}
      </p>

      {/* Reference */}
      {affirmation.reference && (
        <p className="text-xs text-amber-700">
          <span className="font-medium">Reference:</span>{" "}
          {affirmation.reference}
        </p>
      )}
    </div>
  );
}
