"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateAffirmationMutation } from "@/redux/api/affirmations";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";

const initialForm = {
  arabic_text: "",
  transliteration: "",
  english_meaning: "",
  reference: "",
};

export default function AddAffirmationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [createAffirmation, { isLoading }] = useCreateAffirmationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.arabic_text || !formData.english_meaning) {
      toast.error("Arabic text and English meaning are required");
      return;
    }

    try {
      await createAffirmation(formData).unwrap();
      toast.success("Affirmation created successfully");
      setFormData(initialForm);
      onClose();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Failed to create affirmation."),
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-white shadow-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Affirmation
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Add a powerful Islamic affirmation
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Arabic Text *
            </label>
            <textarea
              name="arabic_text"
              placeholder="اكتب النص العربي هنا..."
              value={formData.arabic_text}
              onChange={handleChange}
              rows={3}
              dir="rtl"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-right text-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              style={{ fontFamily: "Amiri, serif" }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Transliteration
            </label>
            <Input
              name="transliteration"
              placeholder="Romanized pronunciation"
              value={formData.transliteration}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              English Meaning *
            </label>
            <textarea
              name="english_meaning"
              placeholder="English meaning"
              value={formData.english_meaning}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Reference
            </label>
            <Input
              name="reference"
              placeholder="e.g. Qur'an 2:153"
              value={formData.reference}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-amber-900"
          >
            {isLoading ? "Creating..." : "Create Affirmation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
