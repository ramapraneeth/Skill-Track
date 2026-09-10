'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentPolicyInsightsPage() {
  const policyInsights = sidhStore.getPolicyInsights();
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);

  const handleAdopt = (id: string, title: string) => {
    setAcceptedIds([...acceptedIds, id]);
    alert(`Policy Recommendation "${title}" marked for Cabinet / MSDE Secretary consideration!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Strategic Policy Insights & Demand Forecasting"
        subtitle="Predictive labor market analytics, automated curriculum realignment recommendations, and budget simulations"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Policy Intelligence' },
        ]}
        actions={
          <button
            onClick={() => alert('Predictive econometric forecasting model recalculation completed.')}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>🤖</span> Re-run AI Policy Simulator
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Predictive Models"
          value="12"
          subtitle="Trained on 10M+ employment records"
          icon="🧠"
          trend={{ value: "High confidence (94%)", isPositive: true }}
          highlightColor="#0B3B60"
        />
        <KPICard
          title="Projected Job Openings (2027)"
          value="4.8M"
          subtitle="Across high-priority tech & green sectors"
          icon="📈"
          trend={{ value: "+18% vs current year", isPositive: true }}
          highlightColor="#10b981"
        />
        <KPICard
          title="Budget Optimization Potential"
          value="₹420 Cr"
          subtitle="Identified reallocation surplus"
          icon="💰"
          trend={{ value: "From saturated traditional trades", isPositive: true }}
          highlightColor="#f59e0b"
        />
        <KPICard
          title="Curricula Needing Revision"
          value="18 QPs"
          subtitle="National Occupational Standards updates"
          icon="🔄"
          trend={{ value: "NCVET notified", isPositive: false }}
          highlightColor="#6366f1"
        />
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-slate-900">High-Impact Strategic Policy Interventions</h3>
        {policyInsights.map((insight) => {
          const isAdopted = acceptedIds.includes(insight.id);
          return (
            <div
              key={insight.id}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {insight.sector}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Confidence: {insight.confidence}%</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  Estimated Impact: {insight.impactEstimate}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900">{insight.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 font-medium">
                  Recommendation ID: <strong className="font-mono text-slate-700">{insight.id}</strong>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Simulating financial and beneficiary impact for: ${insight.title}`)}
                    className="px-3 py-1.5 font-medium border border-slate-300 rounded text-slate-700 hover:bg-slate-50"
                  >
                    Simulate Budgetary Impact
                  </button>
                  {isAdopted ? (
                    <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 font-semibold rounded border border-emerald-200">
                      ✓ Adopted in Draft Policy
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAdopt(insight.id, insight.title)}
                      className="px-4 py-1.5 font-semibold bg-[#0B3B60] text-white hover:bg-[#082a47] rounded shadow-sm"
                    >
                      Adopt into Annual Work Plan
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
