"use client";

import StatCard from "./StatCard";

export default function WelcomeSection({
  totalUser,
  activeUser,
  totalRevenue,
}) {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Hey Moazzem! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your dashboard today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Users" value={totalUser} color="blue" />
        <StatCard label="Active Users" value={activeUser} color="green" />
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue}`}
          color="amber"
        />
      </div>
    </div>
  );
}
