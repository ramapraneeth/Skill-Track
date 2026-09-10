'use client';

import React, { useState, useEffect } from 'react';
import { EvidenceTable } from '@/components/outcome-intelligence/EvidenceTable';
import { MetricCard } from '@/components/outcome-intelligence/MetricCard';
import { FollowupRecord, EvidenceStats } from '@/types/evidence';
import { FileCheck, ShieldCheck, TrendingUp, Award, RefreshCw } from 'lucide-react';

export default function MilestoneEvidencePage() {
  const [followups, setFollowups] = useState<FollowupRecord[]>([]);
  const [stats, setStats] = useState<EvidenceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvidence = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/outcome-intelligence/evidence?stats=true');
      const json = await res.json();
      if (json.success) {
        setFollowups(json.data.followups);
        setStats(json.data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch evidence milestones', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D9E2] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#102A43]">Longitudinal Milestone Evidence & Proof</h1>
            <span className="bg-[#006876] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Verification Telemetry
            </span>
          </div>
          <p className="text-xs text-[#627D98] mt-1">
            Auditable post-placement milestones at 30, 60, 90, and 180 days with EPFO payslip & satisfaction surveys
          </p>
        </div>

        <button
          onClick={fetchEvidence}
          className="h-9 px-3 text-xs font-semibold text-[#0B3B60] bg-white border border-[#D1D9E2] rounded hover:bg-[#F0F4F8] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Records</span>
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Milestone Checks"
            value={stats.totalMilestoneChecks}
            subtitle="Verified survey records in Neon"
            icon={FileCheck}
          />
          <MetricCard
            title="30-Day Retention"
            value={`${stats.retention30DayPct}%`}
            subtitle="Initial transition retention rate"
            icon={ShieldCheck}
            trendPositive={true}
          />
          <MetricCard
            title="90-Day Retention"
            value={`${stats.retention90DayPct}%`}
            subtitle="Benchmark scheme retention rate"
            icon={TrendingUp}
            trendPositive={true}
          />
          <MetricCard
            title="Avg Skill Relevance"
            value={`${stats.averageSkillRelevanceScore} / 5`}
            subtitle="Curriculum alignment score"
            icon={Award}
          />
        </div>
      )}

      <EvidenceTable followups={followups} isLoading={isLoading} />
    </div>
  );
}
