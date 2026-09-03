"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, X } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const passwordRequirements = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
  };

  const isPasswordStrong = Object.values(passwordRequirements).every(
    (req) => req,
  );
  const passwordsMatch =
    formData.password === formData.confirmPassword && formData.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isPasswordStrong) {
      newErrors.password = "Password does not meet requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage("Password reset successfully!");
      setIsLoading(false);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-full rounded-2xl p-6 shadow-lg">
      <div className="w-full space-y-6 rounded-2xl bg-white p-8 shadow-2xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-sm text-slate-600">
            Create a strong password to secure your account associated with{" "}
            <span className="text-xs text-slate-900">{email}</span>.
          </p>
        </div>

        {successMessage && (
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              {successMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPasswords.password ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className={`w-full rounded-lg border-slate-300 pr-10 focus:ring-teal-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPasswords.password ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="space-y-2 rounded-lg bg-slate-50 p-4">
              <p className="mb-3 text-xs font-semibold tracking-wide text-slate-700 uppercase">
                Password Requirements
              </p>
              <div className="space-y-2">
                {[
                  {
                    label: "At least 8 characters",
                    met: passwordRequirements.length,
                  },
                  {
                    label: "One uppercase letter",
                    met: passwordRequirements.uppercase,
                  },
                  {
                    label: "One lowercase letter",
                    met: passwordRequirements.lowercase,
                  },
                  { label: "One number", met: passwordRequirements.number },
                  {
                    label: "One special character (!@#$%^&*)",
                    met: passwordRequirements.special,
                  },
                ].map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {req.met ? (
                      <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 flex-shrink-0 text-slate-300" />
                    )}
                    <span
                      className={`text-xs ${req.met ? "text-green-700" : "text-slate-500"}`}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full rounded-lg border-slate-300 pr-10 focus:ring-teal-500 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
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
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
            {formData.confirmPassword && passwordsMatch && (
              <p className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600">
                <Check className="h-4 w-4" />
                Passwords match
              </p>
            )}
          </div>

          {/* Reset Button */}
          <Button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5 font-semibold text-white hover:bg-[#705446] disabled:opacity-50"
            disabled={isLoading || !isPasswordStrong || !passwordsMatch}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="border-t border-slate-200 pt-4">
          <Link
            href="/auth/login"
            className="flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
