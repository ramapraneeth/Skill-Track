import React, { useState } from 'react'
import { useSkillGap, useLearners, useJobs } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { Compass, CheckCircle2, AlertCircle, RefreshCw, BookOpen, Clock, Zap, Target } from 'lucide-react'

export const SkillGapPage: React.FC = () => {
  const [selectedLearnerId, setSelectedLearnerId] = useState('learner-1')
  const [selectedJobId, setSelectedJobId] = useState('job-1')

  const { data: learnersList = [] } = useLearners()
  const { data: jobsList = [] } = useJobs()
  const { data: gapResult, isLoading, isError, refetch } = useSkillGap(selectedLearnerId, selectedJobId)

  const matchedSkills = gapResult?.matched_skills || []
  const missingSkills = gapResult?.missing_skills || []
  const matchPercentage = gapResult?.skill_match_percentage ?? gapResult?.match_percentage ?? 80
  const priority = gapResult?.priority || 'Medium'
  const recommendedTraining = Array.isArray(gapResult?.recommended_training)
    ? gapResult.recommended_training
    : []
  const totalTrainingDays = gapResult?.total_training_days || 0

  const getPriorityBadgeClass = (p: string) => {
    switch (p?.toLowerCase()) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-black text-slate-900">Skill Gap Diagnosis Engine</h1>
          <p className="text-xs text-slate-500">
            Transparent deterministic competency matching weighted by industry demand and requirement criticality
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate Gap</span>
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            <Compass className="h-4 w-4" /> Algorithmic Skill Alignment
          </span>
        </div>
      </div>

      {/* Simulator Selector Bar */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs text-xs md:grid-cols-2">
        <div>
          <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
            1. Select Learner Candidate
          </label>
          <select
            value={selectedLearnerId}
            onChange={(e) => setSelectedLearnerId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium"
          >
            {learnersList.slice(0, 10).map((l: any) => (
              <option key={l.id} value={l.id}>
                {l.fullName} ({l.programmeTitle} • {l.currentStatus})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[10px]">
            2. Select Target Job Vacancy
          </label>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium"
          >
            {jobsList.map((j: any) => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.companyName} • {j.sector})
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton variant="card" count={2} />
      ) : isError ? (
        <ErrorMessage
          title="Skill gap service unavailable"
          message="Could not compute dynamic competency vector comparison."
          onRetry={() => refetch()}
        />
      ) : (
        <>
          {/* Comparison Score Banner */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400">Calculated Competency Match</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span
                    className={`text-3xl font-black font-mono ${
                      matchPercentage >= 75
                        ? 'text-emerald-600'
                        : matchPercentage >= 50
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {matchPercentage}%
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {matchedSkills.length} of {matchedSkills.length + missingSkills.length} competencies fulfilled
                  </span>
                </div>
                {gapResult?.diagnosis_notes && (
                  <p className="text-xs text-slate-500 mt-1 font-medium max-w-2xl">{gapResult.diagnosis_notes}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-400 font-medium">Gap Classification</span>
                  <span
                    className={`block px-3 py-1 rounded-full text-xs font-bold mt-1 text-center ${
                      matchPercentage >= 75
                        ? 'bg-emerald-100 text-emerald-800'
                        : matchPercentage >= 50
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {matchPercentage >= 75 ? 'Low Friction' : matchPercentage >= 50 ? 'Moderate Gap' : 'Severe Deficit'}
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-400 font-medium">Action Priority</span>
                  <span
                    className={`block px-3 py-1 rounded-full text-xs font-bold mt-1 text-center border ${getPriorityBadgeClass(
                      priority
                    )}`}
                  >
                    {priority} Priority
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Two-Column Competency Matrix */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Matched Competencies */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Satisfied Competencies ({matchedSkills.length})</h3>
                    <p className="text-[11px] text-slate-500">Verified candidate skills meeting requisition criteria</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {matchedSkills.length === 0 ? (
                  <p className="text-xs text-slate-400 italic p-3 text-center">No matching competencies found.</p>
                ) : (
                  matchedSkills.map((req: any) => (
                    <div
                      key={req.skillId}
                      className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white p-3 text-xs shadow-2xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900">{req.skillName}</span>
                        <div className="flex items-center gap-2 text-[11px] text-emerald-700 capitalize">
                          <span>Importance: {req.importance}</span>
                          {req.demandWeight && (
                            <span className="text-slate-400 font-medium">• Demand: {req.demandWeight}/5.0</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Score: {req.score || 75}/100
                        </span>
                        {req.coverage !== undefined && (
                          <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                            {Math.round(req.coverage * 100)}% coverage
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Deficit / Missing Competencies */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Identified Competency Deficits ({missingSkills.length})</h3>
                    <p className="text-[11px] text-slate-500">Prerequisites required by employer but unverified or below threshold</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {missingSkills.length === 0 ? (
                  <p className="text-xs text-emerald-600 font-semibold p-3 text-center">
                    Candidate satisfies all job requirements!
                  </p>
                ) : (
                  missingSkills.map((req: any) => (
                    <div
                      key={req.skillId}
                      className="rounded-xl border border-rose-100 bg-white p-3.5 text-xs shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{req.skillName}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase border ${getPriorityBadgeClass(
                              req.priority || 'Medium'
                            )}`}
                          >
                            {req.priority || 'Medium'} Priority
                          </span>
                        </div>
                        <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 uppercase">
                          {req.importance} Deficit
                        </span>
                      </div>

                      {req.isProficiencyDeficit && (
                        <div className="flex items-center gap-2 text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                          <Target className="w-3 h-3" />
                          <span>
                            Current score: {req.learnerScore}/100 • Target: {req.requiredScore}/100 (-{req.deficitScore} pts)
                          </span>
                        </div>
                      )}

                      <div className="flex items-start gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-800">
                            {req.recommendedTraining?.title || req.recommendation}
                          </span>
                          {req.recommendedTraining?.delivery_mode && (
                            <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-0.5">
                              <span>Mode: {req.recommendedTraining.delivery_mode}</span>
                              <span>• Duration: {req.recommendedTraining.duration_days} days</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recommended Prescriptive Training Roadmap */}
          {recommendedTraining.length > 0 && (
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Recommended Training Action Plan</h3>
                    <p className="text-xs text-slate-500">
                      Deterministic learning curriculum to transition candidate to 90%+ placement readiness
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-900 bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-200">
                    <Clock className="w-3.5 h-3.5" /> Total Duration: {totalTrainingDays} Days
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {recommendedTraining.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Module {idx + 1}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${getPriorityBadgeClass(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                      <span>{item.delivery_mode}</span>
                      <span className="font-bold text-indigo-700">{item.duration_days} days</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
