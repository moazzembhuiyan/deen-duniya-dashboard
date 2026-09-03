"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/redux/api/authApi";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { setUser } from "@/redux/features/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [signin, { isLoading }] = useSignInMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const res = await signin(payload).unwrap();

      if (res?.data?.accessToken) {
        const decodedToken = jwtDecode(res.data.accessToken);
        const userRole = res.data.user?.role || decodedToken?.role || "user"; // Fallback to "user" if role is not present
        if (userRole !== "admin") {
          toast.error("You are not authorized to access this site");
          return;
        }
        toast.success("Login successful");
        dispatch(
          setUser({
            token: res.data.accessToken,
          }),
        );
        router.push("/admin/dashboard");
      } else {
        toast.error(res?.message || "Login failed: No access token received");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="w-full rounded-2xl p-6 shadow-lg">
      <div className="space-y-6 rounded-2xl bg-white p-8 py-10 shadow-2xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Login To Your Account
          </h1>
          <p className="text-sm text-slate-600">
            Please log in to manage your dashboard and access all your
            administrative tools
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full rounded-lg border-slate-300 focus:ring-teal-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border-slate-300 pr-10 focus:ring-teal-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            style={{ backgroundColor: "#000000" }}
            className="h-11 w-full cursor-pointer rounded-lg border py-2.5 font-semibold text-white hover:bg-slate-800"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
