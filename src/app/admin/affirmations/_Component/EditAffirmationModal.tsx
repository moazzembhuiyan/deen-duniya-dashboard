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
import { Trash2 } from "lucide-react";
import {
  useUpdateAffirmationMutation,
  useDeleteAffirmationMutation,
} from "@/redux/api/affirmations";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";

export default function EditAffirmationModal({ isOpen, onClose, affirmation }) {
  const [formData, setFormData] = useState(() => ({
    arabic_text: affirmation?.arabic_text || "",
    transliteration: affirmation?.transliteration || "",
    english_meaning: affirmation?.english_meaning || "",
    reference: affirmation?.reference || "",
  }));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [updateAffirmation, { isLoading: isUpdating }] =
    useUpdateAffirmationMutation();
  const [deleteAffirmation, { isLoading: isDeleting }] =
    useDeleteAffirmationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateAffirmation({
        id: affirmation._id,
        ...formData,
      }).unwrap();

      toast.success("Affirmation updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Failed to update affirmation."),
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAffirmation(affirmation._id).unwrap();
      toast.success("Affirmation deleted successfully");
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Failed to delete affirmation."),
      );
    }
  };

  return (
    <>
      {/* Main Edit Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-white shadow-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Edit Affirmation
            </DialogTitle>
            <p className="text-sm text-gray-500">Update affirmation details</p>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="mt-4 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Arabic Text *
              </label>
              <textarea
                name="arabic_text"
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
                value={formData.reference}
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
                {isUpdating ? "Updating..." : "Update Affirmation"}
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

      {/* Delete Confirmation Modal (Separate Dialog = fully clickable) */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="rounded-2xl border-0 bg-white shadow-2xl sm:max-w-sm">
          <div className="p-2 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>

            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Delete this Affirmation?
            </h3>
            <p className="mb-6 text-sm text-gray-600">
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
