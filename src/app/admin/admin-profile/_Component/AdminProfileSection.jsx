"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";

export default function AdminProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    phone: "+1 (555) 123-4567",
    position: "Group Administrator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  });

  const [tempData, setTempData] = useState(formData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(formData);
  };

  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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

      <div className="flex gap-8">
        {/* Image Section */}
        <div className="flex flex-shrink-0 flex-col items-center gap-4">
          <div className="relative">
            <img
              src={isEditing ? tempData.image : formData.image}
              alt="Profile"
              className="h-40 w-40 rounded-2xl border-4 border-blue-100 object-cover shadow-lg"
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
              />
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
                  {formData.name}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Email Address
                </label>
                <p className="text-base text-slate-700">{formData.email}</p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Phone Number
                </label>
                <p className="text-base text-slate-700">{formData.phone}</p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Position
                </label>
                <p className="text-base text-slate-700">{formData.position}</p>
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
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Position
                </label>
                <Input
                  type="text"
                  name="position"
                  value={tempData.position}
                  onChange={handleChange}
                  className="border-slate-300 focus:ring-[#00C897]"
                  placeholder="Enter position"
                />
              </div>
              <div className="flex gap-3 pt-6">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#00C897] text-white hover:bg-[#00C897]/90"
                >
                  Save Changes
                </Button>
                <Button
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
