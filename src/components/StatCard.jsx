"use client";

export default function StatCard({ label, value, color = "#705446" }) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600",
    copy: "#705446",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <p className="mb-2 text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
        {label}
      </p>
      <p className={`text-3xl font-bold text-[#705446] ${colorClasses[color]}`}>
        {value}
      </p>
    </div>
  );
}
