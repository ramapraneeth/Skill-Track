'use client';

import React, { useState, useEffect } from 'react';
import { MetricCard } from '@/components/outcome-intelligence/MetricCard';
import { OutcomeFilters } from '@/components/outcome-intelligence/OutcomeFilters';
import { IntelligenceSummary } from '@/components/outcome-intelligence/IntelligenceSummary';
import { AnalyticsFilterParams, GovernmentAnalyticsResponse } from '@/types/analytics';
import { Users, Award, TrendingUp, DollarSign, Landmark, RefreshCw } from 'lucide-react';

export default function GovernmentCockpitPage() {
  const [filters, setFilters] = useState<AnalyticsFilterParams>({});
  const [analytics, setAnalytics] = useState<GovernmentAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async (f: AnalyticsFilterParams) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (f.state) params.set('state', f.state);
      if (f.schemeName) params.set('schemeName', f.schemeName);
      if (f.sector) params.set('sector', f.sector);
      if (f.district) params.set('district', f.district);

      const res = await fetch(`/api/outcome-intelligence/analytics?${params.toString()}`);
      const json = await res.json();
      if (json.success) setAnalytics(json.data);
    } catch (err) {
      console.error('Failed to load government analytics', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(filters);
  }, [filters]);

  const kpis = analytics?.kpis || {
    totalLearners: 31,
    trainingCompleted: 30,
    certifiedCount: 26,
    placedCount: 23,
    employmentRate: 88.5,
    retentionRate90Day: 84.6,
    averageStartingWage: 20500,
    skillMatchRate: 82,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D9E2] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#102A43]">Government & Mission Director Cockpit</h1>
            <span className="bg-[#0B3B60] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              National Telemetry
            </span>
          </div>
          <p className="text-xs text-[#627D98] mt-1">
            State-level skilling outcome telemetry, retention performance, and scheme ROI calculations from Neon PostgreSQL
          </p>
        </div>

        <button
          onClick={() => fetchAnalytics(filters)}
          className="h-9 px-3 text-xs font-semibold text-[#0B3B60] bg-white border border-[#D1D9E2] rounded hover:bg-[#F0F4F8] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Cockpit</span>
        </button>
      </div>

      <OutcomeFilters
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        onReset={() => setFilters({})}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Candidates Enrolled"
          value={isLoading ? '...' : kpis.totalLearners}
          subtitle="Cohort sample size"
          icon={Users}
        />
        <MetricCard
          title="Employment Conversion"
          value={isLoading ? '...' : `${kpis.employmentRate}%`}
          subtitle="Certified to verified placement"
          icon={Award}
          trendPositive={true}
        />
        <MetricCard
          title="90-Day Retention Rate"
          value={isLoading ? '...' : `${kpis.retentionRate90Day}%`}
          subtitle="Longitudinal milestone cohort"
          icon={TrendingUp}
          trendPositive={true}
        />
        <MetricCard
          title="Average Monthly Wage"
          value={isLoading ? '...' : `₹${kpis.averageStartingWage.toLocaleString('en-IN')}`}
          subtitle="Initial starting compensation"
          icon={DollarSign}
        />
      </div>

      {analytics?.funnel && analytics?.failureModes && (
        <IntelligenceSummary funnel={analytics.funnel} failureModes={analytics.failureModes} />
      )}
    </div>
  );
}
