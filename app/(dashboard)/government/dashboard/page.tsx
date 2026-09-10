'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AINextBestAction } from '@/components/ui/AINextBestAction';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentDashboardPage() {
  const schemes = sidhStore.getSchemes();
  const centers = sidhStore.getCenters();

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Skill Intelligence Dashboard"
        subtitle="Ministry of Skill Development & Entrepreneurship • Central Strategic Governance & Outcome Radar"
        badge="Official MSDE Command"
        breadcrumbs={[{ label: 'Government Portal' }, { label: 'National Intelligence' }]}
        actions={
          <div className="flex gap-2">
            <Link
              href="/government/course-intelligence"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-xs flex items-center gap-1.5"
            >
              <span>📊</span> Course Intelligence Matrix
            </Link>
            <Link
              href="/government/early-warning"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 hover:bg-red-100 flex items-center gap-1.5 shadow-xs"
            >
              <span>🚨</span> Early Warning Radar (3)
            </Link>
          </div>
        }
      />

      {/* 9 Macro National KPI Cards requested in Section 12 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard
          title="Registered Students"
          value="1.42M"
          subtitle="Aadhaar De-duplicated"
          icon="👥"
          trend={{ value: "+14.8% YoY", isPositive: true }}
          highlightColor="default"
        />
        <KPICard
          title="Active Learners"
          value="412K"
          subtitle="AEBAS Live Verified"
          icon="🎓"
          trend={{ value: "98.4% online", isPositive: true }}
          highlightColor="blue"
        />
        <KPICard
          title="Training Providers"
          value="14,820"
          subtitle="SMART Grade A/A+"
          icon="🏫"
          trend={{ value: "Pan-India Centers", isPositive: true }}
          highlightColor="default"
        />
        <KPICard
          title="NSQF Courses"
          value="850+"
          subtitle="QPs & NOS Modules"
          icon="📚"
          trend={{ value: "37 Sector Councils", isPositive: true }}
          highlightColor="default"
        />
        <KPICard
          title="Certifications"
          value="1.18M"
          subtitle="83.1% Pass Average"
          icon="📜"
          trend={{ value: "100% DigiLocker", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Placement Ready"
          value="810K"
          subtitle="Assessed Candidates"
          icon="🎯"
          trend={{ value: "Interview Cleared", isPositive: true }}
          highlightColor="blue"
        />
        <KPICard
          title="Total Placements"
          value="842K"
          subtitle="EPFO UAN Verified"
          icon="💼"
          trend={{ value: "+8.4% YoY", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Employment Rate"
          value="71.3%"
          subtitle="Post-training conversion"
          icon="📈"
          trend={{ value: "Target: 70%", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Skill Gap Index"
          value="28.4%"
          subtitle="Net National Deficit"
          icon="⚡"
          trend={{ value: "-4.2% Deficit Delta", isPositive: true }}
          highlightColor="amber"
        />
        <KPICard
          title="PFMS DBT Disbursed"
          value="₹3,480 Cr"
          subtitle="82% Budget Utilized"
          icon="🏛️"
          trend={{ value: "Sovereign Audit", isPositive: true }}
          highlightColor="default"
        />
      </div>

      {/* AI Next Best Action Panel for Government */}
      <AINextBestAction role="government" />

      {/* Scheme Performance & Central Live AEBAS Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Flagship Schemes (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">National Skilling Schemes Expenditure</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Physical vs Financial outlay audit across central schemes</p>
            </div>
            <Link href="/government/schemes" className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline">
              View All Schemes →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Scheme Name</th>
                  <th className="py-2.5 px-3">Target vs Enrolled</th>
                  <th className="py-2.5 px-3">PFMS Budget</th>
                  <th className="py-2.5 px-3">Placed</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {schemes.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{s.name}</div>
                      <div className="text-[11px] text-slate-500">{s.code}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{s.enrolledCount.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500 block">of {s.targetBeneficiaries.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {s.budgetSpent}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-700 dark:text-emerald-400">
                      {s.placedCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Real-time AEBAS Surveillance Radar (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">AEBAS Live Surveillance Radar</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Feeds
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 text-[11px] block">Live Terminals</span>
              <span className="text-base font-black text-slate-900 dark:text-slate-100">24,410 / 24,800</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block mt-0.5">98.4% Online</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 text-[11px] block">Today's Punches</span>
              <span className="text-base font-black text-[#1D4ED8] dark:text-blue-400">412,890</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">NIC Cloud Synced</span>
            </div>
          </div>

          <div className="pt-2 text-xs space-y-2">
            <Link
              href="/government/course-intelligence"
              className="block p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100/50 transition-colors"
            >
              <span className="font-bold text-[#1D4ED8] dark:text-blue-400 block">Course Intelligence Matrix →</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 block">
                Analyze all courses by placement conversion rate, institution, and AI Course Impact Score.
              </span>
            </Link>

            <Link
              href="/government/skill-gap"
              className="block p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 hover:bg-indigo-100/50 transition-colors"
            >
              <span className="font-bold text-indigo-700 dark:text-indigo-400 block">National Skill Gap Map →</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 block">
                Regional demand vs training capacity drilldown (Country → State → District → Institution).
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
