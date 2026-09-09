import React from 'react'
import { mockProgrammes } from '../../data/mockData'
import { Layers, Award, Briefcase, IndianRupee, TrendingUp } from 'lucide-react'

export const GovernmentProgrammes: React.FC = () => {
  const schemeAggregates = [
    { scheme: 'PMKVY 4.0 (Short-Term Skilling)', enrolled: 54000, placed: 41040, placementRate: 76.0, retentionRate: 78.2, avgWage: 18500 },
    { scheme: 'DDU-GKY (Rural Youth Placement)', enrolled: 32000, placed: 23680, placementRate: 74.0, retentionRate: 75.1, avgWage: 17200 },
    { scheme: 'PM-Vishwakarma (Artisan Support)', enrolled: 24000, placed: 19680, placementRate: 82.0, retentionRate: 84.5, avgWage: 19800 },
    { scheme: 'NULM (Urban Livelihood Mission)', enrolled: 18450, placed: 12915, placementRate: 70.0, retentionRate: 71.0, avgWage: 16400 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">National Skilling Schemes & Programme Performance</h1>
          <p className="text-xs text-slate-500">
            Cross-scheme comparative benchmarks across placement conversion, retention sustainability, and wage adequacy
          </p>
        </div>
      </div>

      {/* Cross-Scheme Comparison Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Scheme-Level Outcome Benchmarks</h2>
          <p className="text-xs text-slate-500">Longitudinal performance aggregated across central flagship missions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Scheme Name</th>
                <th className="py-3 px-4">Enrolled Base</th>
                <th className="py-3 px-4">Placements</th>
                <th className="py-3 px-4">Placement Rate</th>
                <th className="py-3 px-4">90-Day Retention</th>
                <th className="py-3 px-4">Median Starting Wage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schemeAggregates.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{s.scheme}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{s.enrolled.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{s.placed.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{s.placementRate}%</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">{s.retentionRate}%</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">₹{s.avgWage.toLocaleString()}/mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Level Portfolio */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">Sample Course Performance Directory</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProgrammes.map((prog) => (
            <div key={prog.id} className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 text-xs space-y-2">
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 uppercase">
                {prog.schemeName}
              </span>
              <h3 className="font-bold text-slate-900 text-sm">{prog.title}</h3>
              <p className="text-slate-500 text-[11px]">Provider: {prog.providerName}</p>
              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-slate-600 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">Certified</span>
                  <span className="font-bold">{prog.certifiedCount} Candidates</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">Placed</span>
                  <span className="font-bold text-emerald-700">{prog.placedCount} Candidates</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
