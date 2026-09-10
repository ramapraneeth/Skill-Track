import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 4 }) => {
  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-xs space-y-4 animate-pulse">
      <div className="h-6 bg-[#E2E8F0] rounded w-1/3" />
      <div className="h-4 bg-[#F1F5F9] rounded w-2/3" />
      <div className="space-y-3 pt-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 bg-[#F8FAFC] border border-[#E2E8F0] rounded w-full" />
        ))}
      </div>
    </div>
  );
};
