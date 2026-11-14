"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/redux/api/authApi";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { toast } from "sonner";
import { setUser } from "@/redux/features/authSlice";
import { getApiErrorMessage } from "@/lib/apiError";

type TokenClaims = JwtPayload & { role?: string };

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [signin, { isLoading }] = useSignInMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const res = await signin(payload).unwrap();

      if (res?.data?.accessToken) {
        const decodedToken = jwtDecode<TokenClaims>(res.data.accessToken);
        const user = res.data.user;
        const userRole = (user?.role || decodedToken.role || "").toLowerCase();
        if (userRole !== "admin") {
          toast.error("You are not authorized to access this site");
          return;
        }
        toast.success("Login successful");
        dispatch(
          setUser({
            user: user ?? { role: userRole },
            token: res.data.accessToken,
          }),
        );
        router.replace("/admin/dashboard");
      } else {
        toast.error(res?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to log in. Please try again."));
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

          <div className="flex justify-end">
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
            disabled={isLoading}
            style={{ backgroundColor: "#000000" }}
            className="h-11 w-full cursor-pointer rounded-lg border py-2.5 font-semibold text-white hover:bg-slate-800"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
