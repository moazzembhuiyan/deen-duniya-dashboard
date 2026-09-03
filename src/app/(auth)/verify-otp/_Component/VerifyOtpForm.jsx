"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      alert("Please enter a complete OTP");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage("OTP verified successfully!");
      setIsLoading(false);

      // Redirect to reset password page
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const maskedEmail = email
    ? `${email.substring(0, 3)}***${email.substring(email.lastIndexOf("@") - 3)}`
    : "";

  return (
    <div className="w-full rounded-2xl p-6 shadow-lg">
      <div className="space-y-6 rounded-2xl bg-white p-8 py-10 shadow-2xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Verify Your Code
          </h1>
          <p className="text-sm text-slate-600">
            We sent a 6-digit code to {maskedEmail}. Enter it below to continue.
          </p>
        </div>

        {successMessage && (
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              {successMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div>
            <label className="mb-4 block text-sm font-medium text-slate-700">
              Enter 6-digit code
            </label>
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="h-14 w-12 rounded-lg border-2 border-slate-300 text-center text-xl font-bold transition-colors outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Code expires in{" "}
              <span className="font-semibold text-teal-600">
                {formatTime(timeLeft)}
              </span>
            </p>
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-black py-2.5 font-semibold text-white hover:bg-[#705446] disabled:opacity-50"
            disabled={isLoading || otp.join("").length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Didn't receive the code?{" "}
            <button className="font-semibold text-teal-600 hover:text-teal-700">
              Resend
            </button>
          </p>
        </div>

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
