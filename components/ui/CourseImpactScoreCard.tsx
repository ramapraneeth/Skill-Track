'use client';

import React from 'react';
import { ProgressBar } from './ProgressBar';

interface DimensionBreakdown {
  label: string;
  score: number; // 0 to 100
  benchmark: string;
}

interface CourseImpactScoreCardProps {
  score?: number; // default 87
  dimensions?: DimensionBreakdown[];
  compact?: boolean;
}

const DEFAULT_DIMENSIONS: DimensionBreakdown[] = [
  { label: 'Industry Relevance', score: 93, benchmark: 'Top 3% in Sector' },
  { label: 'Skill Improvement', score: 91, benchmark: '+34% Competency Delta' },
  { label: 'Assessment Performance', score: 89, benchmark: '84% Pass Average' },
  { label: 'Completion Rate', score: 86, benchmark: 'Exceeds National Norm (72%)' },
  { label: 'Certification', score: 84, benchmark: 'DigiLocker Verified' },
  { label: 'Placement Conversion', score: 78, benchmark: 'EPFO Verified Placement' },
];

export const CourseImpactScoreCard: React.FC<CourseImpactScoreCardProps> = ({
  score = 87,
  dimensions = DEFAULT_DIMENSIONS,
  compact = false,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      {/* Top Header with Composite Score */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">📊</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              AI Course Impact Score
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Objective econometric outcome index evaluating curriculum efficacy and employment absorption
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-3xl font-extrabold text-[#1D4ED8] dark:text-blue-400 tracking-tight">
              {score}
            </span>
            <span className="text-xs text-slate-400 font-bold">/100</span>
          </div>
          <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 text-[11px] font-bold uppercase">
            Grade A+ Efficacy
          </span>
        </div>
      </div>

      {/* 6-Dimension Metric Grid */}
      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-3`}>
        {dimensions.map((dim, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 space-y-1.5"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{dim.label}</span>
              <span className="font-bold text-[#1D4ED8] dark:text-blue-400">{dim.score}%</span>
            </div>
            <ProgressBar value={dim.score} max={100} color={dim.score >= 85 ? '#10b981' : '#1D4ED8'} />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{dim.benchmark}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
