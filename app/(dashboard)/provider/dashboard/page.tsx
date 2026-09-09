'use client';

import React, { useState, useEffect } from 'react';
import { MetricCard } from '@/components/outcome-intelligence/MetricCard';
import { ProviderIndicator } from '@/types/indicator';
import { Building2, Users, Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProviderCockpitPage() {
  const [providers, setProviders] = useState<ProviderIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProviderData() {
      try {
        const res = await fetch('/api/outcome-intelligence/indicators?type=providers');
        const json = await res.json();
        if (json.success) setProviders(json.data);
      } catch (err) {
        console.error('Failed to load provider indicators', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProviderData();
  }, []);

  const activeProvider = providers[0] || {
    name: 'Apex Institute of Technology & Skilling',
    code: 'TP-DEL-001',
    tier: 'SMART Grade A',
    activeLearners: 120,
    placementRate: 88,
    retentionRate: 85,
    complianceScore: 95,
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#D1D9E2] pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#102A43]">Training Provider Cockpit</h1>
          <span className="bg-[#006876] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {activeProvider.tier}
          </span>
        </div>
        <p className="text-xs text-[#627D98] mt-1">
          {activeProvider.name} ({activeProvider.code}) — Batch Placements & Longitudinal Retention Management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Candidates"
          value={isLoading ? '...' : activeProvider.activeLearners}
          subtitle="Enrolled in ongoing batches"
          icon={Users}
        />
        <MetricCard
          title="Verified Placement Rate"
          value={isLoading ? '...' : `${activeProvider.placementRate}%`}
          subtitle="Meets NSDA standard"
          icon={Award}
          trendPositive={true}
        />
        <MetricCard
          title="90-Day Retention"
          value={isLoading ? '...' : `${activeProvider.retentionRate}%`}
          subtitle="Longitudinal payslip verified"
          icon={TrendingUp}
          trendPositive={true}
        />
        <MetricCard
          title="Compliance Score"
          value={isLoading ? '...' : `${activeProvider.complianceScore}%`}
          subtitle="Aadhaar & biometric verified"
          icon={Building2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/outcome-intelligence/evidence"
          className="bg-white border border-[#D1D9E2] rounded-md p-5 hover:border-[#0B3B60] transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="font-bold text-sm text-[#102A43]">Conduct Milestone Surveys</div>
            <div className="text-xs text-[#627D98] mt-0.5">Submit 30-day and 90-day payslip retention verifications</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#0B3B60] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/outcome-intelligence/outcomes"
          className="bg-white border border-[#D1D9E2] rounded-md p-5 hover:border-[#0B3B60] transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="font-bold text-sm text-[#102A43]">Register New Outcomes</div>
            <div className="text-xs text-[#627D98] mt-0.5">Record newly secured wage employment or apprenticeships</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#0B3B60] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
