"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, X } from "lucide-react";
import { useUpdateDuaMutation, useDeleteDuaMutation } from "@/redux/api/duaApi";

import { toast } from "sonner";
import Image from "next/image";
import { useUploadSingleFileMutation } from "@/redux/api/fileuploadApi";

export default function EditDuaModal({ isOpen, onClose, dua }) {
  const [formData, setFormData] = useState({
    category: "",
    banner: "",
    arabic_text: "",
    transliteration: "",
    english_meaning: "",
    reference: "",
    benefit: "",
  });

  const [preview, setPreview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const [updateDua, { isLoading: isUpdating }] = useUpdateDuaMutation();
  const [deleteDua, { isLoading: isDeleting }] = useDeleteDuaMutation();
  const [upload, { isLoading: isUploading }] = useUploadSingleFileMutation();

  useEffect(() => {
    if (dua) {
      setFormData({
        category: dua.category || "",
        banner: dua.banner || "",
        arabic_text: dua.arabic_text || "",
        transliteration: dua.transliteration || "",
        english_meaning: dua.english_meaning || "",
        reference: dua.reference || "",
        benefit: dua.benefit || "",
      });
      setPreview(null);
    }
  }, [dua]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await upload(formDataUpload).unwrap();
      const imageUrl = res?.data?.url;

      if (imageUrl) {
        setFormData((prev) => ({ ...prev, banner: imageUrl }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      setPreview(null);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFormData((prev) => ({ ...prev, banner: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateDua({
        id: dua._id,
        payload: formData,
      }).unwrap();

      toast.success("Dua updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update dua");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDua(dua._id).unwrap();
      toast.success("Dua deleted successfully");
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      toast.error("Failed to delete dua");
    }
  };

  return (
    <>
      {/* Main Edit Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-white shadow-2xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Edit Dua
            </DialogTitle>
            <p className="text-sm text-gray-500">Update the dua details</p>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="mt-4 space-y-5">
            {/* Category */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Category *
              </label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Banner Image
              </label>

              {preview || formData.banner ? (
                <div className="relative h-40 w-full overflow-hidden rounded-xl border border-gray-200">
                  <Image
                    src={preview || formData.banner}
                    alt="Banner"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-amber-500 hover:bg-amber-50/30"
                >
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm font-medium text-gray-600">
                    Click to upload banner
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {isUploading && (
                <p className="mt-2 text-sm text-amber-600">
                  Uploading image...
                </p>
              )}
            </div>

            {/* Arabic Text */}
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

            {/* Transliteration */}
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

            {/* English Meaning */}
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

            {/* Reference */}
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

            {/* Benefit */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Benefit
              </label>
              <textarea
                name="benefit"
                value={formData.benefit}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isUpdating || isUploading}
                className="flex-1 rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-amber-900"
              >
                {isUpdating ? "Updating..." : "Update Dua"}
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

      {/* ========== Custom Delete Confirmation (Fixed Z-Index) ========== */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />

          {/* Dialog Box */}
          <div className="relative z-[101] w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Delete this Dua?
              </h3>
              <p className="mb-1 text-sm text-gray-600">
                Are you sure you want to delete
              </p>
              <p className="mb-6 text-sm font-semibold text-gray-900">
                “{dua?.category}”
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
          </div>
        </div>
      )}
    </>
  );
}
