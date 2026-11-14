"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useCreateDuaMutation } from "@/redux/api/duaApi";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";
import Image from "next/image";
import { useUploadSingleFileMutation } from "@/redux/api/fileuploadApi";

const initialForm = {
  category: "",
  banner: "",
  arabic_text: "",
  transliteration: "",
  english_meaning: "",
  reference: "",
  benefit: "",
};

export default function AddDuaModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [createDua, { isLoading }] = useCreateDuaMutation();
  const [upload, { isLoading: isUploading }] = useUploadSingleFileMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Upload
    const formDataUpload = new FormData();
    formDataUpload.append("file", file); // field name = "file"

    try {
      const res = await upload(formDataUpload).unwrap();
      const imageUrl = res?.data?.url;

      if (imageUrl) {
        setFormData((prev) => ({ ...prev, banner: imageUrl }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to upload image."));
      setPreview(null);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFormData((prev) => ({ ...prev, banner: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.arabic_text ||
      !formData.english_meaning
    ) {
      toast.error("Please fill the required fields");
      return;
    }

    try {
      await createDua(formData).unwrap();
      toast.success("Dua created successfully");
      setFormData(initialForm);
      setPreview(null);
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to create dua."));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-white shadow-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Dua
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Fill in the details of the dua
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Category *
            </label>
            <Input
              name="category"
              placeholder="e.g. Rizq (Sustenance)"
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
                  alt="Banner preview"
                  fill
                  unoptimized
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
                <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</p>
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
              <p className="mt-2 text-sm text-amber-600">Uploading image...</p>
            )}
          </div>

          {/* Arabic Text */}
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

          {/* Transliteration */}
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

          {/* English Meaning */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              English Meaning *
            </label>
            <textarea
              name="english_meaning"
              placeholder="English translation / meaning"
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
              placeholder="e.g. Hisn al-Muslim"
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
              placeholder="What is the benefit of this dua?"
              value={formData.benefit}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="mt-2 w-full rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-amber-900"
          >
            {isLoading ? "Creating..." : "Create Dua"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
