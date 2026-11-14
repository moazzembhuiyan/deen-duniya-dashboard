"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check } from "lucide-react";
import { useChangepasswordMutation } from "@/redux/api/authApi";
import { getApiErrorMessage } from "@/lib/apiError";
import { toast } from "sonner";

type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";
type PasswordErrors = Partial<Record<PasswordField, string>>;
type VisibilityField = "current" | "new" | "confirm";

export default function ChangePasswordSection() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<PasswordErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [changePassword, { isLoading }] = useChangepasswordMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: PasswordErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();
      setSuccessMessage("Password changed successfully.");
      toast.success("Password changed successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not change the password."));
    }
  };

  const togglePasswordVisibility = (field: VisibilityField) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const passwordStrength = formData.newPassword.length >= 8;

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <Check className="h-5 w-5 text-green-600" />
          <p className="text-sm font-medium text-green-800">{successMessage}</p>
        </div>
      )}

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Password Requirements:</span> At least
          8 characters with a mix of uppercase, lowercase, numbers, and symbols.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-6 pb-20"
      >
        {/* Current Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              className={`border-slate-300 pr-10 focus:ring-blue-500 ${errors.currentPassword ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPasswords.current ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
              <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              className={`border-slate-300 pr-10 focus:ring-blue-500 ${errors.newPassword ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPasswords.new ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
              <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
              {errors.newPassword}
            </p>
          )}
          {formData.newPassword && !errors.newPassword && (
            <div className="mt-3 space-y-2">
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all ${passwordStrength ? "w-full bg-green-500" : "w-1/2 bg-yellow-500"}`}
                ></div>
              </div>
              <p
                className={`text-xs font-medium ${passwordStrength ? "text-green-600" : "text-yellow-600"}`}
              >
                {passwordStrength
                    ? "Strong password"
                    : "Password strength: Weak"}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your new password"
              className={`border-slate-300 pr-10 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPasswords.confirm ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
              <span className="inline-block h-1 w-1 rounded-full bg-red-600"></span>
              {errors.confirmPassword}
            </p>
          )}
          {formData.confirmPassword &&
            formData.newPassword === formData.confirmPassword &&
            !errors.confirmPassword && (
              <p className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600">
                <Check className="h-4 w-4" />
                Passwords match
              </p>
            )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00C897] py-2.5 font-semibold text-white hover:bg-[#00C897]/90"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
