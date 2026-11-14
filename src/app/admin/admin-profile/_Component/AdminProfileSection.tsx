"use client";

import { useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMyProfileQuery,
  useUpdateProfileinfoMutation,
} from "@/redux/api/authApi";
import { useUploadSingleFileMutation } from "@/redux/api/fileuploadApi";
import { selectToken, selectUser, setUser } from "@/redux/features/authSlice";
import { getApiErrorMessage } from "@/lib/apiError";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  image: string;
}

const emptyProfile: ProfileFormData = {
  name: "",
  email: "",
  phone: "",
  position: "Admin",
  image: "",
};

export default function AdminProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savedProfile, setSavedProfile] = useState<ProfileFormData | null>(
    null,
  );
  const [tempData, setTempData] = useState(emptyProfile);
  const { data: profileResponse, isLoading, isError, refetch } =
    useGetMyProfileQuery(undefined);
  const [updateProfile, { isLoading: isSaving }] =
    useUpdateProfileinfoMutation();
  const [uploadPhoto, { isLoading: isUploading }] =
    useUploadSingleFileMutation();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const profile =
    profileResponse?.data?.user ?? profileResponse?.data ?? user;

  const profileData: ProfileFormData = profile
    ? {
      name:
        profile.fullName ||
        profile.name ||
        [profile.firstName, profile.lastName].filter(Boolean).join(" "),
      email: profile.email || "",
      phone: profile.phone || "",
      position: profile.role || "Admin",
      image: profile.photoUrl || profile.image || "",
    }
    : emptyProfile;
  const displayProfile = savedProfile ?? profileData;

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(displayProfile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(displayProfile);
  };

  const handleSave = async () => {
    try {
      const response = await updateProfile({
        name: tempData.name.trim(),
        email: tempData.email.trim(),
        phone: tempData.phone.trim(),
        photoUrl: tempData.image,
      }).unwrap();
      const updatedUser = response?.data?.user ?? {
        ...user,
        name: tempData.name.trim(),
        email: tempData.email.trim(),
        phone: tempData.phone.trim(),
        photoUrl: tempData.image,
      };
      if (token) dispatch(setUser({ user: updatedUser, token }));
      setSavedProfile(tempData);
      setIsEditing(false);
      setSaveSuccess(true);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not update your profile."));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5 MB or smaller.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    try {
      const response = await uploadPhoto(uploadData).unwrap();
      const imageUrl = response?.data?.url;
      if (typeof imageUrl !== "string") {
        toast.error("The image upload did not return a usable URL.");
        return;
      }
      setTempData((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not upload the profile image."));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-5" role="status" aria-label="Loading profile">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (isError && !user) {
    return (
      <div className="space-y-3" role="alert">
        <p className="text-sm text-red-600">Failed to load your profile.</p>
        <Button type="button" onClick={() => refetch()} variant="outline">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {saveSuccess && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <Check className="h-5 w-5 text-green-600" />
          <p className="text-sm font-medium text-green-800">
            Profile updated successfully
          </p>
        </div>
      )}

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Image Section */}
        <div className="flex flex-shrink-0 flex-col items-center gap-4">
          <div className="relative">
            <Image
              alt={`${displayProfile.name || "Admin"} profile photo`}
              width={160}
              height={160}
              unoptimized={Boolean(tempData.image || displayProfile.image)}
              className="h-40 w-40 rounded-2xl border-4 border-blue-100 bg-slate-100 object-cover shadow-lg"
              src={(isEditing ? tempData.image : displayProfile.image) || "/placeholder.svg"}
            />
          </div>
          {isEditing && (
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#00C897] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00C897]/90">
              <Upload className="h-4 w-4" />
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isUploading}
              />
              {isUploading && <span className="sr-only">Uploading image…</span>}
            </label>
          )}
        </div>

        {/* Form Section */}
        <div className="flex-1">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-slate-900">
                  {displayProfile.name || "Not provided"}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Email Address
                </label>
                <p className="text-base text-slate-700">
                  {displayProfile.email || "Not provided"}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Phone Number
                </label>
                <p className="text-base text-slate-700">
                  {displayProfile.phone || "Not provided"}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Position
                </label>
                <p className="text-base text-slate-700">
                  {displayProfile.position}
                </p>
              </div>
              <Button
                onClick={handleEdit}
                className="mt-8 w-full bg-[#00C897] text-white hover:bg-[#00C897]/90"
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  className="border-slate-300 focus:ring-[#00C897]"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  className="border-slate-300 focus:ring-[#00C897]"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={tempData.phone}
                  onChange={handleChange}
                  className="border-slate-300 focus:ring-[#00C897]"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex gap-3 pt-6">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving || isUploading}
                  className="flex-1 bg-[#00C897] text-white hover:bg-[#00C897]/90"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
