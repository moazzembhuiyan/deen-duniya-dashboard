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
import { useCreateMoodMutation } from "@/redux/api/moodsApi";
import { toast } from "sonner";

export default function AddMoodModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    emoji: "",
  });

  const [createMood, { isLoading }] = useCreateMoodMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.emoji) {
      toast.error("Please fill both title and emoji");
      return;
    }

    try {
      await createMood(formData).unwrap();
      toast.success("Mood created successfully");
      setFormData({ title: "", emoji: "" });
      onClose();
    } catch (error) {
      toast.error("Failed to create mood");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl border-0 bg-white shadow-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Mood
          </DialogTitle>
          <p className="text-sm text-gray-500">Create a new mood with emoji</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Emoji Preview */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-5xl">
              {formData.emoji || "😊"}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Emoji *
            </label>
            <Input
              name="emoji"
              placeholder="Paste emoji here (e.g. 😊)"
              value={formData.emoji}
              onChange={handleChange}
              className="rounded-xl text-center text-2xl"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title *
            </label>
            <Input
              name="title"
              placeholder="e.g. Happy"
              value={formData.title}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-amber-900"
          >
            {isLoading ? "Creating..." : "Create Mood"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
