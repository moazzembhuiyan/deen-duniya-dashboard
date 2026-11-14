import Link from "next/link";
import { Bell, LockKeyhole, UserRound } from "lucide-react";

const settingsSections = [
  {
    title: "Admin profile",
    description: "Manage your account details and profile information.",
    href: "/admin/admin-profile",
    icon: UserRound,
  },
  {
    title: "Password & security",
    description: "Update your password and review account security.",
    href: "/admin/admin-profile",
    icon: LockKeyhole,
  },
  {
    title: "Notifications",
    description: "Review recent alerts and administrative activity.",
    href: "/admin/notifications",
    icon: Bell,
  },
];

export default function SettingsPage() {
  return (
    <section className="space-y-6 p-6 md:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account and dashboard preferences.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settingsSections.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#705446] hover:shadow-sm"
          >
            <Icon className="mb-4 h-6 w-6 text-[#705446]" aria-hidden="true" />
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
