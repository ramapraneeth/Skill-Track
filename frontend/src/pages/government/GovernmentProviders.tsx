import React from 'react'
import { mockProviders } from '../../data/mockData'
import { Building, Award, CheckCircle2, Star, TrendingUp } from 'lucide-react'

export const GovernmentProviders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Training Provider Ratings & Accreditation</h1>
          <p className="text-xs text-slate-500">
            Outcome-based performance ranking of accredited Training Partners and centers
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Accredited Provider Leaderboard</h2>
          <p className="text-xs text-slate-500">Ranked by audited 90-day retention and placement sustainability</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Provider Name & Code</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Accreditation Tier</th>
                <th className="py-3 px-4">Active Capacity</th>
                <th className="py-3 px-4">Audited Placement</th>
                <th className="py-3 px-4">90-Day Retention</th>
                <th className="py-3 px-4 text-right">Outcome Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProviders.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                    <span className="text-[10px] font-mono text-slate-400">{p.code}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {p.district}, {p.state}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-800">
                      {p.accreditationTier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                    {p.activeLearnersCount} Learners
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                    {p.overallPlacementRate}%
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">
                    {p.overallRetentionRate}%
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      <Star className="h-3 w-3 fill-amber-500" />
                      {(4.0 + (p.overallRetentionRate / 100) * 0.9).toFixed(1)} / 5.0
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
