"use client";

import AnalyticsChart from "@/components/AnalyticsChart";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import RecentNotifications from "@/components/RecentNotifications";
import UserSettings from "@/components/UserSettings";
import WelcomeSection from "@/components/WelcomeSection";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import { useState } from "react";

export default function DashboardContainer() {
  const currentYear = new Date().getFullYear();

  const [userYear, setUserYear] = useState(currentYear);
  const [earningYear, setEarningYear] = useState(currentYear);

  const { data, isLoading, isFetching, isError } = useGetDashboardDataQuery({
    user_year: userYear,
    earning_year: earningYear,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-gray-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  const {
    totalUser,
    activeUser,
    totalRevenue,
    userList,
    recentNotifications,
    earningOverview,
    userOverview,
  } = data.data;

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 md:p-8">
        <WelcomeSection
          totalUser={totalUser}
          activeUser={activeUser}
          totalRevenue={totalRevenue}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="space-y-8 xl:col-span-2">
            <AnalyticsChart
              earningOverview={earningOverview}
              userOverview={userOverview}
              earningYear={earningYear}
              userYear={userYear}
              onEarningYearChange={setEarningYear}
              onUserYearChange={setUserYear}
              isFetching={isFetching}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <UserSettings users={userList} isFetching={isFetching} />
            <RecentNotifications notifications={recentNotifications} />
          </div>
        </div>
      </div>
    </main>
  );
}
