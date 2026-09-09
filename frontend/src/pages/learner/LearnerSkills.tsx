import React from 'react'
import { Link } from 'react-router-dom'
import { useLearner, useSkills } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { CheckCircle2, AlertCircle, ArrowUpRight, RefreshCw, Award } from 'lucide-react'

export const LearnerSkills: React.FC = () => {
  const { data: learner, isLoading: learnerLoading, isError: learnerError, refetch: refetchLearner } = useLearner('learner-1')
  const { data: skills, isLoading: skillsLoading, isError: skillsError, refetch: refetchSkills } = useSkills()

  const isLoading = learnerLoading || skillsLoading

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={2} />
        <LoadingSkeleton variant="table" count={5} />
      </div>
    )
  }

  if (learnerError || skillsError || !learner) {
    return (
      <ErrorMessage
        title="Failed to load skills profile"
        message="Could not retrieve assessed competencies and market demand records from Neon database."
        onRetry={() => {
          refetchLearner()
          refetchSkills()
        }}
      />
    )
  }

  const learnerSkills = learner.skills || []
  const acquiredSkillNames = new Set(learnerSkills.map((s: any) => s.skillName.toLowerCase()))

  const allSkills = skills || []
  const marketSkills = allSkills.slice(0, 8).map((s: any) => {
    const isAcquired = acquiredSkillNames.has(s.name.toLowerCase())
    return {
      id: s.id,
      name: s.name,
      demandWeight: s.demandWeight,
      missing: !isAcquired,
      priority: !isAcquired ? (s.demandWeight >= 4.7 ? 'Critical' : s.demandWeight >= 4.5 ? 'High' : 'Moderate') : 'Acquired',
      avgSalary: s.sector === 'IT-ITeS' ? '₹22,000/mo' : s.sector === 'Green Energy' ? '₹19,500/mo' : '₹18,000/mo',
    }
  })

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
                Skill Competency & Market Relevance
              </h1>
              <p className="text-xs text-[#52606D] mt-0.5">
                Validated technical proficiencies, soft skills, and local market demand alignment for {learner.fullName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                refetchLearner()
                refetchSkills()
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
              <span>Refresh</span>
            </button>
            <Link
              to="/skill-gap"
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#0B3B60] px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-[#082944] transition"
            >
              <span>Simulate Target Job Gap</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Current Skill Portfolio */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider mb-4">
          Assessed Learner Skills Portfolio ({learnerSkills.length})
        </h2>
        {learnerSkills.length === 0 ? (
          <p className="text-xs text-[#52606D]">No assessed competencies found for this learner.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {learnerSkills.map((skill: any) => (
              <div
                key={skill.id}
                className="rounded-md border border-[#D1D9E2] p-4 bg-[#F8FAFC] space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#52606D]">
                      {(skill.category || 'technical').replace('_', ' ')}
                    </span>
                    <h3 className="font-semibold text-[#002541] text-sm mt-0.5">{skill.skillName}</h3>
                  </div>
                  <span className="rounded-md bg-[#E8F0F7] border border-[#0B3B60]/20 px-2 py-0.5 text-xs font-semibold text-[#0B3B60]">
                    {(skill.proficiencyLevel || 'intermediate').toUpperCase()}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#52606D]">Assessment Score</span>
                    <span className="text-[#1F2937] tabular-nums">{skill.assessedScore}/100</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-md bg-[#E2E8F0]">
                    <div
                      className={`h-full rounded-md ${
                        skill.assessedScore >= 75
                          ? 'bg-[#059669]'
                          : skill.assessedScore >= 60
                          ? 'bg-[#E65100]'
                          : 'bg-[#B3261E]'
                      }`}
                      style={{ width: `${skill.assessedScore}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-[#52606D] pt-2 border-t border-[#E2E8F0]">
                  <span className="flex items-center gap-1 text-[#059669] font-semibold">
                    <CheckCircle2 className="h-3 w-3" /> NCVET Assessed
                  </span>
                  <span>{skill.acquiredFrom || 'Apex Skilling Academy'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Market In-Demand Skills & Gaps */}
      <div className="rounded-md border border-[#D1D9E2] bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
            Regional Market Skill Demand & Gap Diagnosis
          </h2>
          <p className="text-xs text-[#52606D] mt-0.5">
            Active employer demand weights from Neon database mapped against candidate profile
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1F2937]">
            <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
              <tr>
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Market Demand</th>
                <th className="py-3 px-4">Learner Status</th>
                <th className="py-3 px-4">Priority Action</th>
                <th className="py-3 px-4">Associated Wage Benchmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {marketSkills.map((item: any, i: number) => (
                <tr key={i} className="hover:bg-[#F8FAFC] transition">
                  <td className="py-3.5 px-4 font-semibold text-[#002541]">{item.name}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#0B3B60] tabular-nums">
                    ★ {item.demandWeight} / 5.0
                  </td>
                  <td className="py-3.5 px-4">
                    {item.missing ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#FFEBEE] border border-[#FFCDD2] px-2 py-0.5 text-[11px] font-semibold text-[#B3261E]">
                        <AlertCircle className="h-3 w-3" /> Missing Deficit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#E8F5E9] border border-[#C8E6C9] px-2 py-0.5 text-[11px] font-semibold text-[#059669]">
                        <CheckCircle2 className="h-3 w-3" /> Acquired
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold ${
                        item.priority === 'Critical'
                          ? 'text-[#B3261E] font-bold'
                          : item.priority === 'High'
                          ? 'text-[#E65100]'
                          : 'text-[#52606D]'
                      }`}
                    >
                      {item.priority === 'Critical' ? 'Immediate Fast-Track Intervention' : item.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#1F2937] tabular-nums">{item.avgSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
