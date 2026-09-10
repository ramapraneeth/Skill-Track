'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function GovernmentEmploymentOutcomesPage() {
  const lifecycleStages = [
    { stage: 'Training', metric: '1,420,000 Enrolled', sub: '92% Classroom Attendance' },
    { stage: 'Skill Development', metric: '1,280,000 Trained', sub: 'NOS Units Demonstrated' },
    { stage: 'Certification', metric: '1,180,450 Certified', sub: '83.1% Pass Average' },
    { stage: 'Placement', metric: '842,190 Hired', sub: '71.3% Conversion' },
    { stage: 'Formal Employment', metric: '780,200 Active', sub: '100% EPFO Linked' },
    { stage: 'Career Growth', metric: '+28% Salary Delta', sub: '1-Year Longitudinal' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Employment Outcomes & Longitudinal Tracer Study"
        subtitle="Tracking the full trajectory: Training → Skill Development → Certification → Placement → Employment → Career Growth"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Employment Outcomes' },
        ]}
        actions={
          <button
            onClick={() => alert('Official CAG & Parliamentary Employment Outcome Bulletin exported.')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-xs flex items-center gap-1.5"
          >
            <span>📑</span> Export Longitudinal Study PDF
          </button>
        }
      />

      {/* 6-Stage Employment Outcome Pipeline as requested in Section 15 */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          National Skilling-to-Employment Conversion Pipeline
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {lifecycleStages.map((st, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1 relative"
            >
              <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400 font-bold block uppercase">
                Stage 0{i + 1}
              </span>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{st.stage}</h4>
              <p className="font-black text-sm text-[#1D4ED8] dark:text-blue-400 mt-1">{st.metric}</p>
              <span className="text-[10px] text-slate-500 block">{st.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Longitudinal Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Time to Employment"
          value="42 Days"
          subtitle="Average days post-certification"
          icon="⏱️"
          trend={{ value: "-14 days vs FY25", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Job Retention (6 Months)"
          value="81.4%"
          subtitle="EPFO monthly contribution continuous"
          icon="🛡️"
          trend={{ value: "Exceeds 70% norm", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Skill Utilization in Job"
          value="88.2%"
          subtitle="Direct alignment with trained NOS"
          icon="🎯"
          trend={{ value: "High industry fit", isPositive: true }}
          highlightColor="blue"
        />
        <KPICard
          title="Starting Wage Premium"
          value="+34%"
          subtitle="Over uncertified baseline wage"
          icon="💵"
          trend={{ value: "₹21,450 vs ₹16,000", isPositive: true }}
          highlightColor="emerald"
        />
      </div>

      {/* Sector-Wise Placement & Wage Delta Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Sector-Wise Longitudinal Employment & Wage Performance
          </h3>
          <span className="text-xs text-slate-500">Audited via EPFO & DigiLocker</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Industry Sector</th>
              <th className="py-3 px-4">Total Certified</th>
              <th className="py-3 px-4">Verified Placed</th>
              <th className="py-3 px-4">Placement Rate</th>
              <th className="py-3 px-4">Avg Starting Wage</th>
              <th className="py-3 px-4">6-Month Retention</th>
              <th className="py-3 px-4">Skill Utilization</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { sector: 'IT & ITES (NASSCOM)', certified: '342,000', placed: '264,000', rate: 77.2, wage: '₹24,500 / mo', retention: '86.4%', utilization: '91.2%' },
              { sector: 'Automotive (ASDC)', certified: '210,000', placed: '158,000', rate: 75.2, wage: '₹21,800 / mo', retention: '82.1%', utilization: '88.5%' },
              { sector: 'Electronics & Hardware', certified: '184,000', placed: '132,000', rate: 71.7, wage: '₹19,500 / mo', retention: '79.3%', utilization: '84.0%' },
              { sector: 'Healthcare & Life Sciences', certified: '154,000', placed: '124,000', rate: 80.5, wage: '₹22,000 / mo', retention: '89.5%', utilization: '94.2%' },
              { sector: 'Renewable Energy & Solar', certified: '92,000', placed: '64,000', rate: 69.5, wage: '₹18,500 / mo', retention: '76.8%', utilization: '82.4%' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">{row.sector}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{row.certified}</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400">{row.placed}</td>
                <td className="py-3.5 px-4">
                  <div className="w-24 space-y-1">
                    <ProgressBar value={row.rate} max={100} color="#10b981" />
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{row.rate}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#1D4ED8] dark:text-blue-400">{row.wage}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{row.retention}</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-700 dark:text-emerald-400">{row.utilization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
