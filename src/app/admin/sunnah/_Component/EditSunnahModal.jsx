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
  useUpdateSunnahMutation,
  useDeleteSunnahMutation,
} from "@/redux/api/sunnahApi";
import { toast } from "sonner";

export default function EditSunnahModal({ isOpen, onClose, sunnah }) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    arabicText: "",
  });

  const [updateSunnah, { isLoading: isUpdating }] = useUpdateSunnahMutation();
  const [deleteSunnah, { isLoading: isDeleting }] = useDeleteSunnahMutation();

  useEffect(() => {
    if (sunnah) {
      setFormData({
        title: sunnah.title || "",
        subtitle: sunnah.subtitle || "",
        arabicText: sunnah.arabicText || "",
      });
    }
  }, [sunnah]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateSunnah({
        id: sunnah._id,
        payload: formData,
      }).unwrap();

      toast.success("Sunnah updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update sunnah");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this sunnah?")) return;

    try {
      await deleteSunnah(sunnah._id).unwrap();
      toast.success("Sunnah deleted");
      onClose();
    } catch (error) {
      toast.error("Failed to delete sunnah");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl border-0 bg-white shadow-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Edit Sunnah
          </DialogTitle>
          <p className="text-sm text-gray-500">Update the sunnah details</p>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="mt-4 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              name="title"
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
              value={formData.arabicText}
              onChange={handleChange}
              rows={4}
              dir="rtl"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-right text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              style={{ fontFamily: "Amiri, serif" }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isUpdating}
              className="flex-1 rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-emerald-800"
            >
              {isUpdating ? "Updating..." : "Update Sunnah"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-xl border-red-200 bg-red-50 px-4 text-red-600 hover:bg-red-100 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
