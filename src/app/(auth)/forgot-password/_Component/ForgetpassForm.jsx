"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage("OTP sent to your email");
      setIsLoading(false);

      // Redirect to OTP page after 1.5 seconds
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-full rounded-2xl p-6 shadow-lg">
      <div className="space-y-6 rounded-2xl bg-white p-8 py-10 shadow-2xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Forgot Password?
          </h1>
          <p className="text-sm text-slate-600">
            Enter your email address and we'll send you a code to reset your
            password
          </p>
        </div>

        {successMessage && (
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <Mail className="h-5 w-5 flex-shrink-0 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              {successMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full rounded-lg border-slate-300 focus:ring-teal-500"
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-black py-2.5 font-semibold text-white hover:bg-[#705446] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Recovery Code"}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="border-t border-slate-200 pt-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
