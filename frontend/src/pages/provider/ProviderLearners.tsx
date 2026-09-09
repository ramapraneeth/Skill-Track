import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLearners, useProgrammes, useCreateIntervention, useCreateFollowup } from '../../api/queries'
import { StatusBadge } from '../../components/common/StatusBadge'
import { RiskIndicator } from '../../components/common/RiskIndicator'
import { InterventionModal } from '../../components/common/InterventionModal'
import { FollowupModal } from '../../components/common/FollowupModal'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { Search, Sparkles, CalendarCheck, RefreshCw } from 'lucide-react'

export const ProviderLearners: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selectedProgramme, setSelectedProgramme] = useState('all')
  const [selectedRisk, setSelectedRisk] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const { data: learnersList = [], isLoading, isError, refetch } = useLearners()
  const { data: programmesList = [] } = useProgrammes()
  const createIntervention = useCreateIntervention()
  const createFollowup = useCreateFollowup()

  const [activeLearner, setActiveLearner] = useState<any>(null)
  const [isInterventionOpen, setIsInterventionOpen] = useState(false)
  const [isFollowupOpen, setIsFollowupOpen] = useState(false)

  const handleOpenIntervene = (learner: any) => {
    setActiveLearner(learner)
    setIsInterventionOpen(true)
  }

  const handleOpenFollowup = (learner: any) => {
    setActiveLearner(learner)
    setIsFollowupOpen(true)
  }

  const handleSaveIntervention = (newInt: any) => {
    createIntervention.mutate({
      learnerId: activeLearner?.id || newInt.learnerId,
      recommendedBy: newInt.recommendedBy || 'Training Provider Coordinator',
      category: newInt.category || 'upskilling',
      title: newInt.title,
      description: newInt.description,
      status: 'assigned',
      targetCompletionDate: newInt.targetCompletionDate || '2024-08-30',
    })
  }

  const handleSaveFollowup = (newFollowup: any) => {
    createFollowup.mutate({
      learnerId: activeLearner?.id || newFollowup.learnerId,
      milestone: newFollowup.milestone || '30_day',
      followupDate: newFollowup.followupDate || new Date().toISOString().split('T')[0],
      employmentStatus: newFollowup.employmentStatus || 'retained',
      currentSalary: Number(newFollowup.currentSalary) || 18500,
      retentionStatus: newFollowup.retentionStatus || 'retained',
      jobSatisfactionScore: Number(newFollowup.jobSatisfactionScore) || 5,
      skillRelevanceScore: Number(newFollowup.skillRelevanceScore) || 5,
      notes: newFollowup.notes || 'Follow-up logged via Provider Portal',
      surveyorRole: 'provider',
    })
  }

  const filtered = learnersList.filter((l: any) => {
    const matchSearch =
      l.fullName.toLowerCase().includes(search.toLowerCase()) ||
      l.learnerCode.toLowerCase().includes(search.toLowerCase()) ||
      l.district.toLowerCase().includes(search.toLowerCase())

    const matchProg = selectedProgramme === 'all' || l.currentProgrammeId === selectedProgramme
    const matchRisk = selectedRisk === 'all' || l.riskLevel === selectedRisk
    const matchStatus = selectedStatus === 'all' || l.currentStatus === selectedStatus

    return matchSearch && matchProg && matchRisk && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-[#002541]">Learner Cohorts Management</h1>
          <p className="text-xs text-[#52606D] mt-0.5">
            Track individual learner trajectories, identify skill gaps, and prescribe outcome interventions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="h-10 text-xs font-semibold text-[#1F2937] bg-white hover:bg-[#F4F6F9] px-3.5 rounded-md border border-[#D1D9E2] inline-flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#52606D]" />
            <span>Sync Live List</span>
          </button>
          <span className="h-10 text-xs font-semibold text-[#002541] bg-[#E8F0F7] px-3.5 rounded-md border border-[#0B3B60]/20 inline-flex items-center">
            Total Cohort: <strong className="ml-1 text-[#0B3B60] tabular-nums">{filtered.length} Learners</strong>
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-4 shadow-xs">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#52606D]" />
            <input
              type="text"
              placeholder="Search candidate name, ID, district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-md border border-[#D1D9E2] py-2 pl-9 pr-3 text-xs text-[#1F2937] placeholder:text-[#52606D] focus:border-[#0B3B60] focus:outline-none"
            />
          </div>

          <div>
            <select
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="h-10 w-full rounded-md border border-[#D1D9E2] py-2 px-3 text-xs text-[#1F2937] focus:border-[#0B3B60] focus:outline-none"
            >
              <option value="all">All Programmes</option>
              {programmesList.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="h-10 w-full rounded-md border border-[#D1D9E2] py-2 px-3 text-xs text-[#1F2937] focus:border-[#0B3B60] focus:outline-none"
            >
              <option value="all">All Risk Tiers</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 w-full rounded-md border border-[#D1D9E2] py-2 px-3 text-xs text-[#1F2937] focus:border-[#0B3B60] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="enrolled">Enrolled</option>
              <option value="completed">Completed</option>
              <option value="certified">Certified</option>
              <option value="seeking_job">Seeking Placement</option>
              <option value="placed">Placed</option>
              <option value="self_employed">Self-Employed</option>
              <option value="apprenticeship">Apprenticeship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <LoadingSkeleton variant="table" count={8} />
      ) : isError ? (
        <ErrorMessage
          title="Failed to load learner registry"
          message="An error occurred while loading candidates. Please try again."
          onRetry={() => refetch()}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No candidates match your criteria"
          description="Try resetting your filters or clearing search terms."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('')
            setSelectedProgramme('all')
            setSelectedRisk('all')
            setSelectedStatus('all')
          }}
        />
      ) : (
        /* Learners Table */
        <div className="overflow-hidden rounded-md border border-[#D1D9E2] bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="border-b border-[#D1D9E2] bg-[#F4F6F9] text-[11px] font-semibold text-[#52606D] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Learner Profile</th>
                  <th className="px-4 py-3">Programme & Scheme</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Placement Risk</th>
                  <th className="px-4 py-3">Skill Match</th>
                  <th className="px-4 py-3">Wage / Mo</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filtered.map((learner: any) => (
                  <tr key={learner.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-[#0B3B60] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {learner.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-[#002541]">{learner.fullName}</div>
                          <div className="text-[11px] font-mono text-[#52606D]">{learner.learnerCode} • {learner.district}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-medium text-[#1F2937] max-w-[180px] truncate">{learner.programmeTitle}</div>
                      <div className="text-[11px] text-[#52606D]">{learner.providerName}</div>
                    </td>

                    <td className="px-4 py-3.5">
                      <StatusBadge status={learner.currentStatus} />
                    </td>

                    <td className="px-4 py-3.5">
                      <RiskIndicator riskLevel={learner.riskLevel || 'Low'} />
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-md bg-[#EDF2F7] overflow-hidden">
                          <div
                            className={`h-full rounded-md ${
                              (learner.skillMatchPct || 50) >= 80
                                ? 'bg-[#059669]'
                                : (learner.skillMatchPct || 50) >= 60
                                ? 'bg-[#006876]'
                                : 'bg-[#E65100]'
                            }`}
                            style={{ width: `${learner.skillMatchPct || 50}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-[#002541] tabular-nums">{learner.skillMatchPct || 50}%</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-semibold text-[#002541] tabular-nums">
                      {learner.currentSalary > 0 ? `₹${learner.currentSalary.toLocaleString()}` : <span className="text-[#9CA3AF] font-normal">—</span>}
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenIntervene(learner)}
                          title="Prescribe Action"
                          className="h-8 inline-flex items-center gap-1 rounded-md bg-[#E8F0F7] border border-[#0B3B60]/20 px-2.5 text-xs font-semibold text-[#0B3B60] hover:bg-[#0B3B60] hover:text-white transition"
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>Intervene</span>
                        </button>
                        <button
                          onClick={() => handleOpenFollowup(learner)}
                          title="Log 30/60/90 Day Check-in"
                          className="h-8 inline-flex items-center gap-1 rounded-md bg-[#E8F5E9] border border-[#059669]/20 px-2.5 text-xs font-semibold text-[#059669] hover:bg-[#059669] hover:text-white transition"
                        >
                          <CalendarCheck className="h-3 w-3" />
                          <span>Follow-up</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Intervention Modal */}
      {activeLearner && (
        <InterventionModal
          isOpen={isInterventionOpen}
          onClose={() => setIsInterventionOpen(false)}
          learnerId={activeLearner.id}
          learnerName={activeLearner.fullName}
          onSave={handleSaveIntervention}
        />
      )}

      {/* Followup Modal */}
      {activeLearner && (
        <FollowupModal
          isOpen={isFollowupOpen}
          onClose={() => setIsFollowupOpen(false)}
          learnerId={activeLearner.id}
          learnerName={activeLearner.fullName}
          onSave={handleSaveFollowup}
        />
      )}
    </div>
  )
}

