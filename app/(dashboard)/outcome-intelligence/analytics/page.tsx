'use client';

import React, { useState, useEffect } from 'react';
import { OutcomeFilters } from '@/components/outcome-intelligence/OutcomeFilters';
import { IndicatorTable } from '@/components/outcome-intelligence/IndicatorTable';
import { AnalyticsFilterParams, GovernmentAnalyticsResponse } from '@/types/analytics';
import { SchemeIndicator } from '@/types/indicator';
import { TrendingUp, BarChart3, Globe, Layers } from 'lucide-react';

export default function NationalAnalyticsPage() {
  const [filters, setFilters] = useState<AnalyticsFilterParams>({});
  const [analytics, setAnalytics] = useState<GovernmentAnalyticsResponse | null>(null);
  const [schemes, setSchemes] = useState<SchemeIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async (currentFilters: AnalyticsFilterParams) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentFilters.state) params.set('state', currentFilters.state);
      if (currentFilters.schemeName) params.set('schemeName', currentFilters.schemeName);
      if (currentFilters.sector) params.set('sector', currentFilters.sector);
      if (currentFilters.district) params.set('district', currentFilters.district);

      const [res1, res2] = await Promise.all([
        fetch(`/api/outcome-intelligence/analytics?${params.toString()}`),
        fetch('/api/outcome-intelligence/indicators?type=schemes'),
      ]);

      const json1 = await res1.json();
      const json2 = await res2.json();

      if (json1.success) setAnalytics(json1.data);
      if (json2.success) setSchemes(json2.data);
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(filters);
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D9E2] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#102A43]">National & State Outcome Analytics</h1>
            <span className="bg-[#0B3B60] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              SQL Aggregation
            </span>
          </div>
          <p className="text-xs text-[#627D98] mt-1">
            Dynamic calculations across states, schemes, and sectors without fabricated metrics
          </p>
        </div>
      </div>

      <OutcomeFilters
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        onReset={() => setFilters({})}
      />

      {/* State Breakdown Table */}
      <div className="bg-white border border-[#D1D9E2] rounded-md overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0B3B60]" />
            <h3 className="text-sm font-bold text-[#102A43]">State-Wise Performance Comparison</h3>
          </div>
          <span className="text-xs text-[#627D98]">Filtered from Neon PostgreSQL records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F0F4F8] border-b border-[#D1D9E2] text-[#334E68] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4 text-right">Trained Candidates</th>
                <th className="py-3 px-4 text-right">Placed Candidates</th>
                <th className="py-3 px-4 text-right">Placement Rate</th>
                <th className="py-3 px-4 text-right">90-Day Retention</th>
                <th className="py-3 px-4 text-right">Average Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {analytics?.stateBreakdown?.map((row, i) => (
                <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#102A43]">{row.state}</td>
                  <td className="py-3 px-4 text-right tabular-nums text-[#334E68]">{row.learners}</td>
                  <td className="py-3 px-4 text-right tabular-nums font-semibold text-[#0B3B60]">{row.placed}</td>
                  <td className="py-3 px-4 text-right tabular-nums font-semibold text-emerald-700">{row.placementRate}%</td>
                  <td className="py-3 px-4 text-right tabular-nums font-semibold text-[#006876]">{row.retentionRate}%</td>
                  <td className="py-3 px-4 text-right tabular-nums font-bold text-[#102A43]">₹{row.avgWage.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheme Comparison */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0B3B60]" />
          <h3 className="text-sm font-bold text-[#102A43]">Scheme Outcome Indicators</h3>
        </div>
        <IndicatorTable schemes={schemes} isLoading={isLoading} />
      </div>
    </div>
  );
}
