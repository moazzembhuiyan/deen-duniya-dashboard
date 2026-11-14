"use client";

import AnalyticsChart from "@/components/AnalyticsChart";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import RecentNotifications from "@/components/RecentNotifications";
import UserSettings from "@/components/UserSettings";
import WelcomeSection from "@/components/WelcomeSection";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";

export default function DashboardContainer() {
  const currentYear = new Date().getFullYear();

  const [userYear, setUserYear] = useState(currentYear);
  const [earningYear, setEarningYear] = useState(currentYear);
  const user = useSelector(selectUser);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetDashboardDataQuery({
      user_year: userYear,
      earning_year: earningYear,
    });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6">
        <p className="text-gray-500" role="alert">
          Failed to load dashboard data.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md bg-[#705446] px-4 py-2 text-sm font-medium text-white hover:bg-[#5d463b]"
        >
          Try again
        </button>
      </div>
    );
  }

  const {
    totalUser = 0,
    activeUser = 0,
    totalRevenue = 0,
    userList = [],
    recentNotifications = [],
    earningOverview = [],
    userOverview = [],
  } = data.data;

  return (
    <div className="p-6 md:p-8">
      <WelcomeSection
        name={
          user?.fullName ||
          user?.name ||
          [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
          user?.email?.split("@")[0]
        }
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
  );
}
