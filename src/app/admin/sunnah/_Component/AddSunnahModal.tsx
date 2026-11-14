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
import { useCreateSunnahMutation } from "@/redux/api/sunnahApi";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";

export default function AddSunnahModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    arabicText: "",
  });

  const [createSunnah, { isLoading }] = useCreateSunnahMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.arabicText) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createSunnah(formData).unwrap();
      toast.success("Sunnah created successfully");
      setFormData({ title: "", subtitle: "", arabicText: "" });
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to create sunnah."));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl border-0 bg-white shadow-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Sunnah
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Add a beautiful sunnah with Arabic text
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              name="title"
              placeholder="e.g. Dua After Eating"
              value={formData.title}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Subtitle
            </label>
            <Input
              name="subtitle"
              placeholder="e.g. Thanking Allah for provision"
              value={formData.subtitle}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Arabic Text
            </label>
            <textarea
              name="arabicText"
              placeholder="اكتب النص العربي هنا..."
              value={formData.arabicText}
              onChange={handleChange}
              rows={4}
              dir="rtl"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-right text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              style={{ fontFamily: "Amiri, serif" }}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-emerald-800"
          >
            {isLoading ? "Creating..." : "Create Sunnah"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
