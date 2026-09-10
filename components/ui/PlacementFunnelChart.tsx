'use client';

import React from 'react';

interface FunnelStage {
  label: string;
  count: number;
  rateLabel: string;
  color: string;
}

interface PlacementFunnelProps {
  courseTitle?: string;
  enrolled?: number;
  completed?: number;
  certified?: number;
  placementReady?: number;
  placed?: number;
  avgSalary?: string;
  placementRate?: string;
}

export const PlacementFunnelChart: React.FC<PlacementFunnelProps> = ({
  courseTitle = 'Advanced Python & Data Analytics',
  enrolled = 1250,
  completed = 1080,
  certified = 940,
  placementReady = 810,
  placed = 620,
  avgSalary = '₹5.8 LPA',
  placementRate = '76.5%',
}) => {
  const stages: FunnelStage[] = [
    { label: 'Students Enrolled', count: enrolled, rateLabel: '100% Baseline', color: 'bg-slate-700' },
    { label: 'Students Completed', count: completed, rateLabel: `${Math.round((completed / enrolled) * 100)}% Completion Rate`, color: 'bg-blue-700' },
    { label: 'Students Certified (NSQF)', count: certified, rateLabel: `${Math.round((certified / completed) * 100)}% Examination Pass`, color: 'bg-indigo-600' },
    { label: 'Placement Ready (Interview Cleared)', count: placementReady, rateLabel: `${Math.round((placementReady / certified) * 100)}% Job Ready`, color: 'bg-violet-600' },
    { label: 'Verified Placed (EPFO Active)', count: placed, rateLabel: `${placementRate} Placement Outcome`, color: 'bg-emerald-600' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
            Verified Employment Outcomes
          </span>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
            Course-to-Placement Conversion Funnel
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {courseTitle} • Longitudinal tracking of student transition from matriculation to formal workforce entry
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Placement Rate</span>
            <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">{placementRate}</span>
          </div>
          <div className="h-7 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Average Salary</span>
            <span className="text-base font-extrabold text-[#1D4ED8] dark:text-blue-400">{avgSalary}</span>
          </div>
        </div>
      </div>

      {/* Visual Funnel */}
      <div className="space-y-2.5 pt-1">
        {stages.map((stage, idx) => {
          const widthPercent = Math.max(30, Math.round((stage.count / enrolled) * 100));
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">
                    {idx + 1}
                  </span>
                  {stage.label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {stage.count.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 min-w-[130px] text-right">
                    {stage.rateLabel}
                  </span>
                </div>
              </div>

              {/* Funnel Bar */}
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${widthPercent}%` }}
                  className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <span>Verified via EPFO Universal Account Number (UAN) linkage & DigiLocker registry</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">100% Outcome Audited</span>
      </div>
    </div>
  );
};
