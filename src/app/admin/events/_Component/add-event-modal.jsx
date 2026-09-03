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

import { toast } from "sonner"; // or your toast library
import { useCreateEventMutation } from "@/redux/api/eventApi";

export default function AddEventModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "islamic",
  });

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await createEvent({
        type: formData.type,
        title: formData.title,
        description: formData.description,
        date: formData.date, // "YYYY-MM-DD"
      }).unwrap();

      toast.success("Event created successfully");
      setFormData({ title: "", description: "", date: "", type: "Islamic" });
      onClose();
    } catch (error) {
      toast.error("Failed to create event");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl border-0 bg-white shadow-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Event
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Add any Islamic event according to your calendar
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <Input
              name="title"
              placeholder="e.g. Eid al-Fitr"
              value={formData.title}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Date
            </label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write a short description..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-amber-900"
          >
            {isLoading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
