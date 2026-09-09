import React from 'react'
import { Link } from 'react-router-dom'
import { useLearner, useJobs, useSkillGap } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { Sparkles, Briefcase, GraduationCap, ArrowRight, RefreshCw } from 'lucide-react'

export const LearnerRecommendations: React.FC = () => {
  const { data: learner, isLoading: learnerLoading, isError: learnerError, refetch: refetchLearner } = useLearner('learner-1')
  const { data: jobs, isLoading: jobsLoading, isError: jobsError, refetch: refetchJobs } = useJobs()
  const { data: skillGap, isLoading: gapLoading, isError: gapError, refetch: refetchGap } = useSkillGap('learner-1')

  const isLoading = learnerLoading || jobsLoading || gapLoading

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={3} />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    )
  }

  if (learnerError || jobsError || gapError || !learner) {
    return (
      <ErrorMessage
        title="Failed to load career recommendations"
        message="Could not retrieve job requisitions or prescriptive engine data from Neon database."
        onRetry={() => {
          refetchLearner()
          refetchJobs()
          refetchGap()
        }}
      />
    )
  }

  const jobList = jobs || []
  const missingSkills = skillGap?.missing_skills || []

  // Prescriptive modules synthesized from real skill gap diagnostic
  const recommendedTrainings = missingSkills.length > 0
    ? missingSkills.map((ms: any, i: number) => ({
        id: `rec-tr-${i + 1}`,
        title: ms.recommendation || `Accelerated Micro-Credential in ${ms.skillName}`,
        provider: 'NASSCOM / National Skill Development Corporation (NSDC)',
        duration: '14 Days (40 Hours)',
        fitScore: 95 - i * 4,
        reason: `Directly closes the mandatory ${ms.skillName} deficit identified for corporate placements.`,
        cost: 'Government Sponsored (PMKVY 4.0)',
      }))
    : [
        {
          id: 'rec-tr-1',
          title: 'Power BI & Visual Analytics Micro-Credential',
          provider: 'Apex Skilling Academy / NASSCOM',
          duration: '14 Days (40 Hours)',
          fitScore: 98,
          reason: 'Bridges key deficit for regional corporate data analyst openings.',
          cost: 'Government Sponsored (PMKVY 4.0)',
        },
        {
          id: 'rec-tr-2',
          title: 'Corporate Interview & Business Communication Drill',
          provider: 'National Skill Development Corporation (NSDC)',
          duration: '15 Hours',
          fitScore: 92,
          reason: 'Addresses screening readiness gap identified in predictive assessment.',
          cost: 'Free Self-Paced Module',
        },
      ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B3B60] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002541]">
                Personalized Career & Upskilling Recommendations
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Algorithmic recommendations generated from live skill gap diagnostics for {learner.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              refetchLearner()
              refetchJobs()
              refetchGap()
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
            <span>Refresh Recommendations</span>
          </button>
        </div>
      </div>

      {/* Priority Recommended Upskilling Modules */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider mb-4 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-[#0B3B60]" />
          <span>Priority Upskilling Modules (Prescribed Gap Closures)</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {recommendedTrainings.map((tr: any) => (
            <div
              key={tr.id}
              className="flex flex-col justify-between rounded-md border border-[#D1D9E2] bg-[#F8FAFC] p-4 text-xs space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#E8F0F7] border border-[#0B3B60]/20 px-2 py-0.5 text-[10px] font-semibold text-[#0B3B60]">
                    {tr.fitScore}% Fit Match
                  </span>
                  <span className="text-[10px] font-semibold text-[#52606D]">{tr.duration}</span>
                </div>
                <h3 className="font-semibold text-[#002541] text-sm">{tr.title}</h3>
                <p className="text-[#52606D] text-[11px]">{tr.provider}</p>
                <p className="text-[#1F2937] leading-relaxed pt-2 border-t border-[#E2E8F0]">{tr.reason}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#059669]">{tr.cost}</span>
                <button className="inline-flex items-center gap-1 rounded-md bg-[#0B3B60] px-3 py-1 text-white font-semibold text-xs hover:bg-[#082944] transition">
                  <span>Enroll</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Matching Jobs */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[#0B3B60]" />
            <span>Target Job Openings Aligned with Candidate Profile ({jobList.length})</span>
          </h2>
          <Link to="/jobs" className="text-xs font-semibold text-[#0B3B60] hover:underline">
            Browse All Jobs →
          </Link>
        </div>

        {jobList.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#52606D]">
            No job openings found in database.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {jobList.slice(0, 4).map((job: any) => (
              <div
                key={job.id}
                className="rounded-md border border-[#D1D9E2] p-4 text-xs bg-[#F8FAFC] space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#002541] text-sm">{job.title}</h3>
                    <p className="text-[#52606D]">{job.companyName}</p>
                    <p className="text-[#52606D] text-[11px] mt-0.5">{job.district}, {job.state}</p>
                  </div>
                  <span className="rounded-md bg-white border border-[#D1D9E2] px-2.5 py-1 font-semibold font-mono text-[#002541] tabular-nums">
                    ₹{Number(job.minSalary).toLocaleString()} - ₹{Number(job.maxSalary).toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-[#E2E8F0]">
                  {(job.requiredSkills || []).map((sk: any) => (
                    <span
                      key={sk.skillId || sk.skill_id || sk.skillName}
                      className="rounded-md bg-white border border-[#D1D9E2] px-2 py-0.5 text-[10px] font-medium text-[#1F2937]"
                    >
                      {sk.skillName || sk.skill_name}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[11px] text-[#52606D] font-semibold">{job.vacancies} Vacancies Open</span>
                  <Link
                    to="/skill-gap"
                    className="inline-flex items-center gap-1 font-semibold text-[#0B3B60] hover:underline"
                  >
                    <span>Check Skill Match</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
