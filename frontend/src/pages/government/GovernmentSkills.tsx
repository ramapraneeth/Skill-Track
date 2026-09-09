import React from 'react'
import { useSkills, useGovernmentAnalytics } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { Award, RefreshCw } from 'lucide-react'

export const GovernmentSkills: React.FC = () => {
  const { data: skills, isLoading: skillsLoading, isError: skillsError, refetch: refetchSkills } = useSkills()
  const { data: analytics, isLoading: analyticsLoading, isError: analyticsError, refetch: refetchAnalytics } = useGovernmentAnalytics()

  const isLoading = skillsLoading || analyticsLoading

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="kpi" count={3} />
        <LoadingSkeleton variant="table" count={5} />
      </div>
    )
  }

  if (skillsError || analyticsError) {
    return (
      <ErrorMessage
        title="Failed to load skills ecosystem data"
        message="Could not retrieve skill registry from Neon database."
        onRetry={() => {
          refetchSkills()
          refetchAnalytics()
        }}
      />
    )
  }

  const skillList = skills || []
  const highGrowthSkills = analytics?.highGrowthSkills || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B3B60] text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002541]">
                Macro Skill Demand & Market Shortages
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Ecosystem-wide analysis of emerging industry skill requirements versus training center output
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              refetchSkills()
              refetchAnalytics()
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
            <span>Refresh Skills Feed</span>
          </button>
        </div>
      </div>

      {/* High-Growth Skills Section */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider mb-4">
          Fast-Growing Industry Skills (Top Growth Vectors)
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highGrowthSkills.map((sk: any, i: number) => (
            <div key={i} className="rounded-md border border-[#D1D9E2] bg-[#F8FAFC] p-4 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-[#002541] text-sm">{sk.name}</h3>
                <span className="rounded-md bg-[#E8F0F7] px-2 py-0.5 text-[10px] font-bold text-[#0B3B60] border border-[#0B3B60]/20">
                  +{sk.demandGrowthPct}% YoY
                </span>
              </div>
              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[#52606D]">Supply Shortage Deficit:</span>
                <span className="font-bold text-[#B3261E] font-mono">-{sk.supplyDeficitPct}% Gap</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#52606D]">Benchmark Starting Wage:</span>
                <span className="font-bold text-[#002541] font-mono">₹{sk.avgSalary.toLocaleString()}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog of Tracked Sector Skills */}
      <div className="rounded-md border border-[#D1D9E2] bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
            Tracked Skills Inventory & Demand Weights ({skillList.length})
          </h2>
          <p className="text-xs text-[#52606D] mt-0.5">
            Verified competency domains mapped to NSQF standards in Neon database
          </p>
        </div>

        {skillList.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#52606D]">
            No skills found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
                <tr>
                  <th className="py-3 px-4">Skill Title</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Demand Weight</th>
                  <th className="py-3 px-4">Curriculum Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {skillList.map((s: any) => (
                  <tr key={s.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-3 px-4 font-semibold text-[#002541]">{s.name}</td>
                    <td className="py-3 px-4 text-[#52606D]">{s.sector}</td>
                    <td className="py-3 px-4">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-[#1F2937] uppercase border border-slate-200">
                        {(s.category || 'technical').replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0B3B60] tabular-nums">
                      ★ {s.demandWeight} / 5.0
                    </td>
                    <td className="py-3 px-4 text-[#52606D] max-w-sm truncate">{s.description || 'Core curriculum competence'}</td>
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
