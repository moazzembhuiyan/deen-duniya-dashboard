"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Layers,
  BarChart3,
  LogOut,
} from "lucide-react";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import LogoutConfirmModal from "@/components/LogoutModal";
import { logout } from "@/redux/features/authSlice";
import { baseApi } from "@/redux/api/baseApi";

export default function Sidebar() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    sessionStorage.removeItem("forgetPasswordToken");
    sessionStorage.removeItem("guestToken");
    localStorage.removeItem("signupToken");
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    router.replace("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Users, label: "Events", href: "/admin/events" },
    { icon: Layers, label: "Sunnah", href: "/admin/sunnah" },
    { icon: BarChart3, label: "Dua", href: "/admin/dua" },
    { icon: UserPlus, label: "Moods", href: "/admin/moods" },
    { icon: UserPlus, label: "Affirmations", href: "/admin/affirmations" },
  ];

  return (
    <>
      <aside className="sticky top-0 h-dvh w-16 shrink-0 overflow-y-auto border-r border-gray-200 bg-[#fefeff] md:w-64">
        <nav className="flex h-full flex-col">
          <div className="p-2 md:p-6">
            <h1 className="text-lg font-bold text-gray-900">
              <Image
                src={logo}
                alt="Deen Duniya"
                width={200}
                height={50}
                className="h-auto w-full object-contain"
              />
            </h1>
          </div>
          <div className="flex-1 space-y-3 px-2 md:space-y-5 md:px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div
                    className={`mb-2 flex w-full items-center justify-center gap-3 rounded-md px-2 py-3 transition-colors md:justify-start md:px-4 ${
                      isActive
                        ? "bg-[#705446] text-white"
                        : "text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="hidden md:inline">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-200 p-4">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex w-full items-center justify-center gap-3 rounded-md px-2 py-2 text-red-600 transition-colors hover:bg-red-50 md:justify-start md:px-4"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      <LogoutConfirmModal
        isOpen={showModal}
        onLogout={handleLogout}
        onDiscard={() => setShowModal(false)}
      />
    </>
  );
}
