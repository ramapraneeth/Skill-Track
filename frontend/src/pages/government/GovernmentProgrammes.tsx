import React from 'react'
import { useProgrammes } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { Layers, RefreshCw } from 'lucide-react'

export const GovernmentProgrammes: React.FC = () => {
  const { data: programmes, isLoading, isError, refetch } = useProgrammes()

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
        title="Failed to load skilling programmes"
        message="Could not retrieve national scheme and programme records from Neon database."
        onRetry={() => refetch()}
      />
    )
  }

  const list = programmes || []

  // Compute scheme aggregates dynamically from live programme records
  const schemeMap: Record<string, { enrolled: number; placed: number; certified: number; totalWage: number; count: number }> = {}
  for (const p of list) {
    const s = p.schemeName || p.scheme || 'Flagship Initiative'
    if (!schemeMap[s]) {
      schemeMap[s] = { enrolled: 0, placed: 0, certified: 0, totalWage: 0, count: 0 }
    }
    schemeMap[s].enrolled += p.totalEnrolled || p.enrolledCount || 0
    schemeMap[s].placed += p.placedCount || 0
    schemeMap[s].certified += p.certifiedCount || 0
    schemeMap[s].totalWage += p.avgStartingWage || 0
    schemeMap[s].count += 1
  }

  const schemeAggregates = Object.entries(schemeMap).map(([scheme, val]) => ({
    scheme,
    enrolled: val.enrolled,
    placed: val.placed,
    certified: val.certified,
    placementRate: val.enrolled > 0 ? roundOne((val.placed / val.enrolled) * 100) : 0,
    avgWage: val.count > 0 ? Math.round(val.totalWage / val.count) : 0,
  }))

  function roundOne(n: number) {
    return Math.round(n * 10) / 10
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B3B60] text-white">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002541]">
                National Skilling Schemes & Programme Performance
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Cross-scheme benchmarks across placement conversion, retention sustainability, and wage adequacy
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
            <span>Refresh Programmes</span>
          </button>
        </div>
      </div>

      {/* Scheme-Level Outcome Benchmarks */}
      <div className="rounded-md border border-[#D1D9E2] bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
            Scheme-Level Outcome Benchmarks ({schemeAggregates.length})
          </h2>
          <p className="text-xs text-[#52606D] mt-0.5">
            Aggregated dynamically across active central and state skilling missions in Neon PostgreSQL
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1F2937]">
            <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
              <tr>
                <th className="py-3 px-4">Scheme Name</th>
                <th className="py-3 px-4">Enrolled Base</th>
                <th className="py-3 px-4">Certified Candidates</th>
                <th className="py-3 px-4">Placements</th>
                <th className="py-3 px-4">Placement Rate</th>
                <th className="py-3 px-4">Avg Starting Wage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {schemeAggregates.map((s, i) => (
                <tr key={i} className="hover:bg-[#F8FAFC] transition">
                  <td className="py-3.5 px-4 font-semibold text-[#002541]">{s.scheme}</td>
                  <td className="py-3.5 px-4 font-mono text-[#52606D] tabular-nums">{s.enrolled.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-[#52606D] tabular-nums">{s.certified.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#1F2937] tabular-nums">{s.placed.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#059669] tabular-nums">
                    {s.placementRate}%
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#002541] tabular-nums">
                    ₹{s.avgWage.toLocaleString()}/mo
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Level Portfolio Directory */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
              Accredited Course Performance Directory ({list.length})
            </h2>
            <p className="text-xs text-[#52606D] mt-0.5">
              Live NSQF-aligned courses and verified placement counts
            </p>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#52606D]">
            No courses found in database.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((prog: any) => (
              <div key={prog.id} className="rounded-md border border-[#D1D9E2] p-4 bg-[#F8FAFC] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#E8F0F7] px-2 py-0.5 text-[10px] font-semibold text-[#0B3B60] uppercase border border-[#0B3B60]/20">
                    {prog.schemeName || prog.scheme}
                  </span>
                  <span className="text-[10px] font-mono text-[#52606D]">NSQF L{prog.nsqfLevel}</span>
                </div>
                <h3 className="font-semibold text-[#002541] text-sm leading-snug">{prog.title}</h3>
                <p className="text-[#52606D] text-[11px]">Provider: {prog.providerName}</p>
                <div className="pt-2 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 font-mono">
                  <div>
                    <span className="text-[10px] text-[#52606D] font-sans block uppercase">Certified</span>
                    <span className="font-semibold text-[#1F2937] tabular-nums">{prog.certifiedCount} Candidates</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#52606D] font-sans block uppercase">Placed</span>
                    <span className="font-bold text-[#059669] tabular-nums">{prog.placedCount} Candidates</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
