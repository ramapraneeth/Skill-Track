import React from 'react'
import { useProgrammes } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { GraduationCap, Clock, RefreshCw } from 'lucide-react'

export const ProviderProgrammes: React.FC = () => {
  const { data: programmes, isLoading, isError, refetch } = useProgrammes()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={3} />
        <LoadingSkeleton variant="card" count={3} />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load provider programmes"
        message="Could not retrieve training programme batches from Neon database."
        onRetry={() => refetch()}
      />
    )
  }

  const list = programmes || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B3B60] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002541]">
                Training Programmes & Batch Health
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Monitoring curricula completion, assessment pass rates, and placement benchmarks by course
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
            <span>Refresh Batches</span>
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-md border border-[#D1D9E2] bg-white p-12 text-center text-xs text-[#52606D]">
          No active training programmes found in database.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((prog: any) => {
            const enrolled = prog.totalEnrolled || prog.enrolledCount || 1
            const completed = prog.completedCount || 0
            const certified = prog.certifiedCount || 1
            const placed = prog.placedCount || 0

            const completionRate = Math.round((completed / enrolled) * 100)
            const placementRate = Math.round((placed / certified) * 100)

            return (
              <div
                key={prog.id}
                className="flex flex-col justify-between rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs transition hover:border-[#0B3B60]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#E8F0F7] border border-[#0B3B60]/20 px-2 py-0.5 text-[10px] font-semibold text-[#0B3B60] uppercase">
                      {prog.schemeName || prog.scheme}
                    </span>
                    <span className="text-xs font-mono text-[#52606D] font-semibold">{prog.code}</span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#002541] text-sm">{prog.title}</h3>
                    <p className="text-xs text-[#52606D] mt-0.5">Sector: {prog.sector}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#52606D] pt-2 border-t border-[#E2E8F0]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#52606D]" />
                      {prog.durationWeeks} Weeks
                    </span>
                    <span>•</span>
                    <span>NSQF Level {prog.nsqfLevel}</span>
                  </div>

                  {/* Progress Stats */}
                  <div className="space-y-2 pt-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span className="text-[#52606D]">
                          Completion ({completed}/{enrolled})
                        </span>
                        <span className="text-[#1F2937] tabular-nums">{completionRate}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-md bg-[#E2E8F0] overflow-hidden">
                        <div
                          className="h-full bg-[#0B3B60] rounded-md"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span className="text-[#52606D]">
                          Placement ({placed}/{certified})
                        </span>
                        <span className="text-[#059669] font-bold tabular-nums">{placementRate}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-md bg-[#E2E8F0] overflow-hidden">
                        <div
                          className="h-full bg-[#059669] rounded-md"
                          style={{ width: `${placementRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E2E8F0] text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#52606D] block">
                      Avg Starting Wage
                    </span>
                    <span className="font-semibold font-mono text-[#002541] tabular-nums">
                      ₹{Number(prog.avgStartingWage).toLocaleString()}/mo
                    </span>
                  </div>
                  <span className="rounded-md bg-[#E8F5E9] border border-[#C8E6C9] px-2.5 py-0.5 text-[11px] font-semibold text-[#059669]">
                    Active Batch
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
