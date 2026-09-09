import React from 'react'
import { useProviders } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { Building2, Star, RefreshCw } from 'lucide-react'

export const GovernmentProviders: React.FC = () => {
  const { data: providers, isLoading, isError, refetch } = useProviders()

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
        title="Failed to load training providers"
        message="Could not retrieve accredited training partner records from Neon database."
        onRetry={() => refetch()}
      />
    )
  }

  const list = providers || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B3B60] text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002541]">
                Training Provider Ratings & Accreditation
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Outcome-based performance ranking of accredited Training Partners and centers
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
            <span>Refresh Providers</span>
          </button>
        </div>
      </div>

      {/* Provider Leaderboard Table */}
      <div className="rounded-md border border-[#D1D9E2] bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
            Accredited Provider Leaderboard ({list.length})
          </h2>
          <p className="text-xs text-[#52606D] mt-0.5">
            Ranked by audited 90-day retention and longitudinal placement sustainability from database
          </p>
        </div>

        {list.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#52606D]">
            No training providers found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
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
              <tbody className="divide-y divide-[#E5E7EB]">
                {list.map((p: any) => (
                  <tr key={p.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#002541]">{p.name}</p>
                      <span className="text-[11px] font-mono text-[#52606D]">{p.code}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#52606D]">
                      {p.district}, {p.state}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-md bg-[#E8F0F7] border border-[#0B3B60]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3B60]">
                        {p.accreditationTier || p.tier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#1F2937] tabular-nums">
                      {p.activeLearnersCount || p.activeCapacity} Learners
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#059669] tabular-nums">
                      {p.overallPlacementRate || p.placementRate}%
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#006876] tabular-nums">
                      {p.overallRetentionRate || p.retentionRate}%
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 font-bold text-[#E65100] bg-[#FFF8E1] border border-[#FFE082] px-2 py-0.5 rounded-md tabular-nums text-[11px]">
                        <Star className="h-3 w-3 fill-[#E65100]" />
                        {(4.0 + ((p.overallRetentionRate || p.retentionRate || 70) / 100) * 0.9).toFixed(1)} / 5.0
                      </span>
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
