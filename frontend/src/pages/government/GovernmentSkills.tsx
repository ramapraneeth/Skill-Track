import React from 'react'
import { mockSkills, mockGovernmentAnalytics } from '../../data/mockData'
import { Award, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react'

export const GovernmentSkills: React.FC = () => {
  const { highGrowthSkills } = mockGovernmentAnalytics

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Macro Skill Demand & Market Shortages</h1>
          <p className="text-xs text-slate-500">
            Ecosystem-wide analysis of emerging industry skill requirements versus training center output
          </p>
        </div>
      </div>

      {/* High-Growth Skills Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">Fast-Growing Industry Skills (Top Growth Vectors)</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highGrowthSkills.map((sk, i) => (
            <div key={i} className="rounded-xl border border-indigo-100 bg-indigo-50/20 p-4 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{sk.name}</h3>
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800">
                  +{sk.demandGrowthPct}% YoY Demand
                </span>
              </div>
              <div className="pt-2 border-t border-indigo-100/60 flex items-center justify-between">
                <span className="text-slate-500">Supply Shortage Deficit:</span>
                <span className="font-bold text-rose-600 font-mono">-{sk.supplyDeficitPct}% Gap</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Benchmark Starting Wage:</span>
                <span className="font-bold text-slate-900 font-mono">₹{sk.avgSalary.toLocaleString()}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog of 20 Tracked Sector Skills */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Tracked Skills Inventory & Demand Weights</h2>
          <p className="text-xs text-slate-500">20 verified competency domains mapped to NSQF standards</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Skill Title</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Demand Weight</th>
                <th className="py-3 px-4">Curriculum Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSkills.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3 px-4 text-slate-600">{s.sector}</td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                      {s.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-indigo-700">★ {s.demandWeight} / 5.0</td>
                  <td className="py-3 px-4 text-slate-500 max-w-sm truncate">{s.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
