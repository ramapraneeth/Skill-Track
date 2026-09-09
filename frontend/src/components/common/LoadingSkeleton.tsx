import React from 'react'

interface LoadingSkeletonProps {
  variant?: 'card' | 'table' | 'kpi' | 'profile'
  count?: number
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ variant = 'card', count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => i)

  if (variant === 'kpi') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {items.map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs h-28 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 rounded-md w-24"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="h-7 bg-slate-200 rounded-md w-28"></div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
        <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-6 gap-4">
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
        </div>
        <div className="divide-y divide-slate-100">
          {items.map((i) => (
            <div key={i} className="h-16 flex items-center px-6 gap-4">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'profile') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-200"></div>
          <div className="space-y-2">
            <div className="h-5 bg-slate-200 rounded w-48"></div>
            <div className="h-4 bg-slate-200 rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg p-3 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-16"></div>
              <div className="h-4 bg-slate-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {items.map((i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="h-5 bg-slate-200 rounded w-1/2"></div>
            <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="pt-2 border-t border-slate-100 flex justify-between">
            <div className="h-4 bg-slate-200 rounded w-20"></div>
            <div className="h-4 bg-slate-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
