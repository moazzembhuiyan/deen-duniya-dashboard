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

export default function Sidebar() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    // Simulate logout process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("User logged out");
    setShowModal(false);
    // Redirect to login or home page
    router.push("/login");
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
    <aside className="sticky top-0 h-screen w-64 overflow-y-auto border-r border-gray-200 bg-[#fefeff]">
      <nav className="flex h-full flex-col">
        <div className="p-6">
          <h1 className="text-lg font-bold text-gray-900">
            <Image
              src={logo}
              alt="Logo"
              width={2000}
              height={2000}
              className="h-auto w-full object-contain"
            />
          </h1>
        </div>
        <div className="flex-1 space-y-5 px-4">
          {menuItems?.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.label} href={item.href}>
                <div
                  className={`mb-4 flex w-full items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-[#705446] text-white"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => router.push("/login")}
            className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
