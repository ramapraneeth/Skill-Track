import React, { useState } from 'react'
import { useLearners, useLearner } from '../../api/queries'
import { api } from '../../api/client'
import { FollowupModal } from '../../components/common/FollowupModal'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import {
  Briefcase,
  Building,
  CheckCircle2,
  Plus,
  Coins,
  History,
  RefreshCw,
} from 'lucide-react'

export const LearnerOutcomes: React.FC = () => {
  const { data: learners, isLoading: learnersLoading } = useLearners()
  const [selectedLearnerId, setSelectedLearnerId] = useState('learner-2')
  const [isFollowupOpen, setIsFollowupOpen] = useState(false)

  const {
    data: selectedLearner,
    isLoading: learnerLoading,
    isError,
    refetch,
  } = useLearner(selectedLearnerId)

  if (learnersLoading || learnerLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={3} />
        <LoadingSkeleton variant="table" count={4} />
      </div>
    )
  }

  if (isError || !selectedLearner) {
    return (
      <ErrorMessage
        title="Failed to load outcome record"
        message="Could not retrieve longitudinal outcomes from Neon database."
        onRetry={() => refetch()}
      />
    )
  }

  const employmentOutcomes = selectedLearner.employmentOutcomes || []
  const selfEmploymentOutcomes = selectedLearner.selfEmploymentOutcomes || []
  const apprenticeshipOutcomes = selectedLearner.apprenticeshipOutcomes || []
  const followups = selectedLearner.followups || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold text-[#002541]">Longitudinal Outcome Record</h1>
            <p className="text-xs text-[#52606D] mt-0.5">
              Multi-track career records across Wage Employment, Self-Employment, and Apprenticeships
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Candidate Switcher populated from Neon */}
            <select
              value={selectedLearnerId}
              onChange={(e) => setSelectedLearnerId(e.target.value)}
              className="h-9 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-medium text-[#1F2937] outline-none focus:border-[#0B3B60]"
            >
              {(learners || []).slice(0, 10).map((l: any) => (
                <option key={l.id} value={l.id}>
                  {l.fullName} ({l.currentStatus})
                </option>
              ))}
            </select>

            <button
              onClick={() => refetch()}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setIsFollowupOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#059669] px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-[#047857] transition"
            >
              <Plus className="h-4 w-4" />
              <span>Log Follow-up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Outcome Category Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formal Wage Employment */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-bold text-[#002541] text-sm">
              <Briefcase className="h-4 w-4 text-[#0B3B60]" />
              <span>Wage Employment</span>
            </div>
            <span className="text-xs font-semibold text-[#52606D]">
              {employmentOutcomes.length} Records
            </span>
          </div>

          {employmentOutcomes.length === 0 ? (
            <div className="rounded-md border border-dashed border-[#D1D9E2] p-6 text-center text-xs text-[#52606D]">
              No formal wage employment record logged yet.
            </div>
          ) : (
            <div className="space-y-3">
              {employmentOutcomes.map((emp: any) => (
                <div key={emp.id} className="rounded-md border border-[#D1D9E2] bg-[#F8FAFC] p-3.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-[#002541] text-sm">{emp.designation}</h4>
                      <p className="text-[#52606D]">{emp.employerName}</p>
                    </div>
                    <span className="rounded-md bg-[#E8F5E9] border border-[#C8E6C9] px-2 py-0.5 text-[10px] font-bold text-[#059669] uppercase">
                      {emp.status}
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 text-[#52606D]">
                    <div>
                      <span className="text-[10px] uppercase block">Monthly Wage</span>
                      <span className="font-bold text-[#002541] font-mono tabular-nums">
                        ₹{Number(emp.monthlySalary).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase block">Start Date</span>
                      <span className="font-medium text-[#1F2937]">{emp.startDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Self-Employment & Entrepreneurship */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-bold text-[#002541] text-sm">
              <Coins className="h-4 w-4 text-[#006876]" />
              <span>Self-Employment</span>
            </div>
            <span className="text-xs font-semibold text-[#52606D]">
              {selfEmploymentOutcomes.length} Records
            </span>
          </div>

          {selfEmploymentOutcomes.length === 0 ? (
            <div className="rounded-md border border-dashed border-[#D1D9E2] p-6 text-center text-xs text-[#52606D]">
              No enterprise venture logged.
            </div>
          ) : (
            <div className="space-y-3">
              {selfEmploymentOutcomes.map((se: any) => (
                <div key={se.id} className="rounded-md border border-[#B2DFDB] bg-[#E0F2F1]/30 p-3.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-[#002541] text-sm">{se.enterpriseName}</h4>
                      <p className="text-[#006876] font-medium">{se.sector}</p>
                    </div>
                    <span className="rounded-md bg-[#B2DFDB] px-2 py-0.5 text-[10px] font-bold text-[#004D40]">
                      Active
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#B2DFDB] grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-[#52606D] block uppercase">Monthly Earnings</span>
                      <span className="font-bold text-[#002541] font-mono tabular-nums">
                        ₹{Number(se.monthlyRevenue).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#52606D] block uppercase">Microfinance</span>
                      <span className="font-bold text-[#059669]">MUDRA Supported</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Apprenticeship Contracts */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-bold text-[#002541] text-sm">
              <Building className="h-4 w-4 text-[#0B3B60]" />
              <span>Apprenticeship</span>
            </div>
            <span className="text-xs font-semibold text-[#52606D]">
              {apprenticeshipOutcomes.length} Records
            </span>
          </div>

          {apprenticeshipOutcomes.length === 0 ? (
            <div className="rounded-md border border-dashed border-[#D1D9E2] p-6 text-center text-xs text-[#52606D]">
              No NAPS apprenticeship contract logged.
            </div>
          ) : (
            <div className="space-y-3">
              {apprenticeshipOutcomes.map((app: any) => (
                <div key={app.id} className="rounded-md border border-[#D1D9E2] bg-[#F8FAFC] p-3.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-[#002541] text-sm">{app.establishmentName}</h4>
                      <p className="text-[#0B3B60] font-mono text-[10px]">
                        Contract: {app.contractNumber}
                      </p>
                    </div>
                    <span className="rounded-md bg-[#E8F0F7] px-2 py-0.5 text-[10px] font-semibold text-[#0B3B60]">
                      {app.durationMonths} Months
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-[#52606D] block uppercase">Monthly Stipend</span>
                      <span className="font-bold text-[#002541] font-mono tabular-nums">
                        ₹{Number(app.stipendAmount).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#52606D] block uppercase">Commenced</span>
                      <span className="font-medium text-[#1F2937]">{app.startDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Longitudinal Retention Follow-up Audit Trail */}
      <div className="rounded-md border border-[#D1D9E2] bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-[#002541] uppercase tracking-wider">
            <History className="h-4 w-4 text-[#0B3B60]" />
            <span>Audited Retention Checkpoints ({followups.length})</span>
          </div>
          <span className="text-xs font-semibold text-[#059669] bg-[#E8F5E9] border border-[#C8E6C9] px-2.5 py-0.5 rounded-md">
            Verified Checkpoints Active
          </span>
        </div>

        {followups.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#52606D]">
            No follow-up checkpoints recorded for this candidate yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
                <tr>
                  <th className="py-3 px-4">Milestone</th>
                  <th className="py-3 px-4">Audit Date</th>
                  <th className="py-3 px-4">Retention Status</th>
                  <th className="py-3 px-4">Current Salary</th>
                  <th className="py-3 px-4">Satisfaction</th>
                  <th className="py-3 px-4">Surveyor Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {followups.map((f: any) => (
                  <tr key={f.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-3.5 px-4 font-semibold text-[#002541]">
                      {f.milestone.replace('_', ' ').toUpperCase()}
                    </td>
                    <td className="py-3.5 px-4 text-[#52606D]">{f.followupDate}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#E8F5E9] border border-[#C8E6C9] px-2 py-0.5 text-[11px] font-semibold text-[#059669]">
                        <CheckCircle2 className="h-3 w-3" /> {f.retentionStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#002541] tabular-nums">
                      ₹{Number(f.currentSalary).toLocaleString()}/mo
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0B3B60]">
                      ★ {f.jobSatisfactionScore} / 5
                    </td>
                    <td className="py-3.5 px-4 text-[#52606D] max-w-sm truncate">{f.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FollowupModal
        isOpen={isFollowupOpen}
        onClose={() => setIsFollowupOpen(false)}
        learnerId={selectedLearnerId}
        learnerName={selectedLearner.fullName}
        onSave={async (followupData) => {
          try {
            await api.createFollowup(followupData as any)
            refetch()
            setIsFollowupOpen(false)
          } catch (err) {
            console.error('Failed to create followup', err)
          }
        }}
      />
    </div>
  )
}
