import React, { useState } from 'react'
import { useInterventions } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { StatusBadge } from '../../components/common/StatusBadge'
import { Zap, RefreshCw, Filter } from 'lucide-react'

export const GovernmentInterventions: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const { data: interventions, isLoading, isError, refetch } = useInterventions(
    categoryFilter !== 'all' ? { category: categoryFilter } : undefined
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="kpi" count={3} />
        <LoadingSkeleton variant="table" count={5} />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load intervention registry"
        message="Could not retrieve corrective interventions from Neon database."
        onRetry={() => refetch()}
      />
    )
  }

  const list = interventions || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B3B60] text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002541]">
                National Intervention Registry
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Monitoring corrective skilling actions, corporate liaison, and relocation support across India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#52606D]">
              <Filter className="h-3.5 w-3.5 text-[#0B3B60]" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-9 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-medium text-[#1F2937] outline-none focus:border-[#0B3B60]"
              >
                <option value="all">All Intervention Categories</option>
                <option value="upskilling">Technical Upskilling</option>
                <option value="mock_interview">Mock Interview Drills</option>
                <option value="employer_liaison">Employer Liaison</option>
                <option value="relocation_support">Relocation Support</option>
              </select>
            </div>

            <button
              onClick={() => refetch()}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interventions Table */}
      <div className="rounded-md border border-[#D1D9E2] bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
              Active Interventions List ({list.length})
            </h2>
            <p className="text-xs text-[#52606D] mt-0.5">
              Logged corrective workflows stored in Neon PostgreSQL
            </p>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#52606D]">
            No interventions found for selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
                <tr>
                  <th className="py-3 px-4">Learner & District</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Intervention Title</th>
                  <th className="py-3 px-4">Prescribed By</th>
                  <th className="py-3 px-4">Target Date</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {list.map((item: any, idx: number) => (
                  <tr key={item.id || idx} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#002541]">{item.learnerName}</p>
                      <span className="text-[11px] text-[#52606D]">
                        {item.district || 'District'}, {item.state || 'State'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-md bg-[#E8F0F7] border border-[#0B3B60]/20 px-2 py-0.5 text-[10px] font-semibold text-[#0B3B60] uppercase">
                        {(item.category || 'upskilling').replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#002541]">{item.title}</p>
                      <p className="text-[#52606D] text-[11px] line-clamp-1">{item.description}</p>
                    </td>
                    <td className="py-3.5 px-4 text-[#52606D]">{item.recommendedBy}</td>
                    <td className="py-3.5 px-4 font-mono text-[#52606D] tabular-nums">
                      {item.targetCompletionDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
