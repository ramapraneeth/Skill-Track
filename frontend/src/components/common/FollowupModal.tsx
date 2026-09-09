import React, { useState } from 'react'
import { Followup } from '../../types'
import { X, CalendarCheck, CheckCircle2 } from 'lucide-react'

interface FollowupModalProps {
  isOpen: boolean
  onClose: () => void
  learnerName?: string
  learnerId?: string
  onSave: (followup: Partial<Followup>) => void
}

export const FollowupModal: React.FC<FollowupModalProps> = ({
  isOpen,
  onClose,
  learnerName = 'Rahul Sharma',
  learnerId = 'learner-1',
  onSave,
}) => {
  const [milestone, setMilestone] = useState<Followup['milestone']>('30_day')
  const [employmentStatus, setEmploymentStatus] = useState<Followup['employmentStatus']>('retained')
  const [retentionStatus, setRetentionStatus] = useState<Followup['retentionStatus']>('retained')
  const [currentSalary, setCurrentSalary] = useState<number>(20500)
  const [jobSatisfaction, setJobSatisfaction] = useState<number>(4)
  const [skillRelevance, setSkillRelevance] = useState<number>(4)
  const [notes, setNotes] = useState<string>(
    'Verified active employment via monthly payslip. Learner reports high utility of Python/SQL in daily operations.'
  )
  const [attritionReason, setAttritionReason] = useState<string>('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: `fl-${Date.now()}`,
      learnerId,
      milestone,
      followupDate: new Date().toISOString().split('T')[0],
      employmentStatus,
      retentionStatus,
      currentSalary,
      jobSatisfactionScore: jobSatisfaction,
      skillRelevanceScore: skillRelevance,
      notes,
      attritionReason: retentionStatus === 'attrited' ? attritionReason : undefined,
      surveyorRole: 'provider',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CalendarCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Longitudinal Follow-up</h3>
              <p className="text-xs text-slate-500">Learner: {learnerName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Follow-up Milestone</label>
              <select
                value={milestone}
                onChange={(e) => setMilestone(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-medium"
              >
                <option value="30_day">30-Day Check-in</option>
                <option value="60_day">60-Day Check-in</option>
                <option value="90_day">90-Day Retention Audit</option>
                <option value="6_month">6-Month Career Review</option>
                <option value="12_month">12-Month Annual Impact</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Retention Status</label>
              <select
                value={retentionStatus}
                onChange={(e) => {
                  const val = e.target.value as any
                  setRetentionStatus(val)
                  if (val === 'attrited') setEmploymentStatus('attrited')
                }}
                className={`w-full rounded-lg border px-3 py-2 font-medium outline-none ${
                  retentionStatus === 'retained'
                    ? 'border-emerald-300 bg-emerald-50/50 text-emerald-900'
                    : 'border-rose-300 bg-rose-50/50 text-rose-900'
                }`}
              >
                <option value="retained">Retained (Active)</option>
                <option value="attrited">Attrited (Left Job)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Current Monthly Wage (₹)</label>
              <input
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-semibold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Job Satisfaction (1-5)</label>
              <select
                value={jobSatisfaction}
                onChange={(e) => setJobSatisfaction(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Dissatisfied</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Skill Relevance in Workplace (1-5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSkillRelevance(val)}
                  className={`flex-1 rounded-lg py-1.5 font-bold border transition ${
                    skillRelevance === val
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {val} {val === 5 ? '★ Max' : '★'}
                </button>
              ))}
            </div>
          </div>

          {retentionStatus === 'attrited' && (
            <div>
              <label className="font-semibold text-rose-700 block mb-1">Reason for Attrition</label>
              <input
                type="text"
                value={attritionReason}
                onChange={(e) => setAttritionReason(e.target.value)}
                placeholder="e.g. Excessive travel distance, delayed wages, medical issue"
                required
                className="w-full rounded-lg border border-rose-300 bg-rose-50/40 px-3 py-2 text-rose-950 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Auditor / Surveyor Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none leading-relaxed"
            />
          </div>

          <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
            >
              Save Milestone Follow-up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
