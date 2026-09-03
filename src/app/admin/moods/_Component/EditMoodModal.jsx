"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  useUpdateMoodMutation,
  useDeleteMoodMutation,
} from "@/redux/api/moodsApi";
import { toast } from "sonner";

export default function EditMoodModal({ isOpen, onClose, mood }) {
  const [formData, setFormData] = useState({
    title: "",
    emoji: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [updateMood, { isLoading: isUpdating }] = useUpdateMoodMutation();
  const [deleteMood, { isLoading: isDeleting }] = useDeleteMoodMutation();

  useEffect(() => {
    if (mood) {
      setFormData({
        title: mood.title || "",
        emoji: mood.emoji || "",
      });
    }
  }, [mood]);

  // Reset delete confirm when main modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateMood({
        id: mood._id,
        payload: formData,
      }).unwrap();

      toast.success("Mood updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update mood");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMood(mood._id).unwrap();
      toast.success("Mood deleted successfully");
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      toast.error("Failed to delete mood");
    }
  };

  return (
    <>
      {/* ========== Main Edit Modal ========== */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="rounded-2xl border-0 bg-white shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Edit Mood
            </DialogTitle>
            <p className="text-sm text-gray-500">Update mood details</p>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="mt-4 space-y-5">
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
                placeholder="Paste emoji here"
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
                value={formData.title}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isUpdating}
                className="flex-1 rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-amber-900"
              >
                {isUpdating ? "Updating..." : "Update Mood"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-xl border-red-200 bg-red-50 px-4 text-red-600 hover:bg-red-100 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========== Delete Confirmation Modal (Separate Dialog) ========== */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="rounded-2xl border-0 bg-white shadow-2xl sm:max-w-sm">
          <div className="p-2 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>

            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Delete this Mood?
            </h3>
            <p className="mb-1 text-sm text-gray-600">
              Are you sure you want to delete
            </p>
            <p className="mb-6 text-lg font-semibold text-gray-900">
              {mood?.emoji} {mood?.title}
            </p>
            <p className="mb-6 text-xs text-gray-500">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-xl border-gray-300 py-5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-red-600 py-5 text-white hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
