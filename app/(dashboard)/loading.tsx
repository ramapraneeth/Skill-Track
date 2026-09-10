import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-[#D1D9E2] pb-4 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-64 bg-[#E2E8F0] rounded" />
          <div className="h-3 w-96 bg-[#F1F5F9] rounded" />
        </div>
        <div className="h-8 w-24 bg-[#E2E8F0] rounded" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#D1D9E2] rounded-md p-4 space-y-3 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-[#E2E8F0] rounded" />
              <div className="w-5 h-5 bg-[#F1F5F9] rounded-full" />
            </div>
            <div className="h-7 w-20 bg-[#CBD5E1] rounded" />
            <div className="h-2.5 w-32 bg-[#F1F5F9] rounded" />
          </div>
        ))}
      </div>

      {/* Main Content Table/Chart Skeleton */}
      <div className="bg-white border border-[#D1D9E2] rounded-md p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="h-4 w-48 bg-[#E2E8F0] rounded" />
          <div className="h-7 w-28 bg-[#F1F5F9] rounded" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="h-10 w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded flex items-center px-4 justify-between"
            >
              <div className="h-3 w-36 bg-[#E2E8F0] rounded" />
              <div className="h-3 w-20 bg-[#F1F5F9] rounded" />
              <div className="h-3 w-24 bg-[#E2E8F0] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
