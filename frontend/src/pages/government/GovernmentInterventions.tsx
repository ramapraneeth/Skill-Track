import React, { useState } from 'react'
import { mockLearners } from '../../data/mockData'
import { StatusBadge } from '../../components/common/StatusBadge'
import { Zap, Sparkles, Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export const GovernmentInterventions: React.FC = () => {
  // Aggregate all interventions from learners
  const allInterventions = mockLearners.flatMap((l) =>
    l.interventions.map((int) => ({ ...int, learnerName: l.fullName, district: l.district, state: l.state }))
  )

  const [categoryFilter, setCategoryFilter] = useState('all')

  const filtered = allInterventions.filter((i) => categoryFilter === 'all' || i.category === categoryFilter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-black text-slate-900">National Intervention Registry</h1>
          <p className="text-xs text-slate-500">
            Monitoring corrective skilling actions, corporate liaison, and relocation support across India
          </p>
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none"
        >
          <option value="all">All Intervention Categories</option>
          <option value="upskilling">Technical Upskilling</option>
          <option value="mock_interview">Mock Interview Drills</option>
          <option value="employer_liaison">Employer Liaison</option>
          <option value="relocation_support">Relocation Support</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Interventions List</h2>
            <p className="text-xs text-slate-500">Logged corrective workflows with assigned targets</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{filtered.length} Interventions Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Learner & District</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Intervention Title</th>
                <th className="py-3 px-4">Recommended By</th>
                <th className="py-3 px-4">Target Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{item.learnerName}</p>
                    <span className="text-[10px] text-slate-400">
                      {item.district}, {item.state}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 uppercase">
                      {item.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-slate-500 text-[11px] line-clamp-1">{item.description}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.recommendedBy}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{item.targetCompletionDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <StatusBadge status={item.status} size="sm" />
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
