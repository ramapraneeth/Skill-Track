import React from 'react'
import { useLearners } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { RiskIndicator } from '../../components/common/RiskIndicator'
import { BrainCircuit, ShieldAlert, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react'

export const GovernmentPredictions: React.FC = () => {
  const { data: learners, isLoading, isError, refetch } = useLearners()

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
        title="Failed to load predictive risk models"
        message="Could not retrieve risk predictions from Neon database."
        onRetry={() => refetch()}
      />
    )
  }

  const allLearners = learners || []
  const atRiskLearners = allLearners.filter(
    (l: any) => l.riskLevel === 'High' || l.riskLevel === 'Medium'
  )

  const highRiskCount = allLearners.filter((l: any) => l.riskLevel === 'High').length
  const mediumRiskCount = allLearners.filter((l: any) => l.riskLevel === 'Medium').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B3B60] text-white">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002541]">
                Ecosystem Predictive Risk Forecasting
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Machine learning-driven diagnostic layer identifying candidate cohorts at risk of placement deficits or early attrition
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
            <span>Re-run Inference</span>
          </button>
        </div>
      </div>

      {/* Forecasting Insights Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-[#FFCDD2] bg-[#FFEBEE]/50 p-5">
          <div className="flex items-center gap-2 text-[#B3261E] font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>High Placement Risk Flagged</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#B3261E] font-mono tabular-nums">
            {highRiskCount} Candidates
          </p>
          <p className="mt-1 text-xs text-[#B3261E] leading-relaxed">
            Candidates with multiple mandatory skill deficits requiring proactive intervention before completion.
          </p>
        </div>

        <div className="rounded-md border border-[#FFE082] bg-[#FFF8E1]/60 p-5">
          <div className="flex items-center gap-2 text-[#E65100] font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>Moderate Attrition Watch</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#E65100] font-mono tabular-nums">
            {mediumRiskCount} Candidates
          </p>
          <p className="mt-1 text-xs text-[#E65100] leading-relaxed">
            Candidates identified for 30-day workplace transition monitoring to safeguard long-term retention.
          </p>
        </div>

        <div className="rounded-md border border-[#C8E6C9] bg-[#E8F5E9]/60 p-5">
          <div className="flex items-center gap-2 text-[#059669] font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4" />
            <span>Intervention Rescue Target</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#059669] font-mono tabular-nums">
            {atRiskLearners.length} Actionable
          </p>
          <p className="mt-1 text-xs text-[#059669] leading-relaxed">
            Projected sustainable absorption recovery if prescribed bootcamps and mock assessments are executed.
          </p>
        </div>
      </div>

      {/* Flagged Candidates Cohort Table */}
      <div className="rounded-md border border-[#D1D9E2] bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
            Actionable Risk Cohort Records ({atRiskLearners.length})
          </h2>
          <p className="text-xs text-[#52606D] mt-0.5">
            Individual candidate profiles flagged in Neon database for provider and counselor intervention
          </p>
        </div>

        {atRiskLearners.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#52606D]">
            No at-risk candidates detected in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
                <tr>
                  <th className="py-3 px-4">Learner</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Enrolled Programme</th>
                  <th className="py-3 px-4">Risk Level</th>
                  <th className="py-3 px-4">Skill Match Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {atRiskLearners.map((l: any) => (
                  <tr key={l.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#002541]">{l.fullName}</p>
                      <span className="text-[11px] text-[#52606D] font-mono">{l.learnerCode}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#52606D]">
                      {l.district}, {l.state}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-[#1F2937]">
                      {l.programmeTitle || 'NSQF Domain Certification'}
                    </td>
                    <td className="py-3.5 px-4">
                      <RiskIndicator riskLevel={l.riskLevel} showIcon />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#0B3B60] tabular-nums">
                      {l.skillMatchPct || 65}% Match
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
