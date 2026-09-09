import React, { useState } from 'react'
import { Intervention } from '../../types'
import { X, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react'

interface InterventionModalProps {
  isOpen: boolean
  onClose: () => void
  learnerName?: string
  learnerId?: string
  existingIntervention?: Intervention
  onSave: (intervention: Partial<Intervention>) => void
}

export const InterventionModal: React.FC<InterventionModalProps> = ({
  isOpen,
  onClose,
  learnerName = 'Rahul Sharma',
  learnerId = 'learner-1',
  existingIntervention,
  onSave,
}) => {
  const [category, setCategory] = useState<Intervention['category']>(
    existingIntervention?.category || 'upskilling'
  )
  const [title, setTitle] = useState(
    existingIntervention?.title || 'Power BI 14-Day Fast-Track Micro-Credential'
  )
  const [description, setDescription] = useState(
    existingIntervention?.description ||
      'Mandatory accelerated training module to bridge the 38% local market deficit in Power BI data visualization.'
  )
  const [targetDate, setTargetDate] = useState(
    existingIntervention?.targetCompletionDate || '2024-07-25'
  )
  const [status, setStatus] = useState<Intervention['status']>(
    existingIntervention?.status || 'in_progress'
  )
  const [outcomeNotes, setOutcomeNotes] = useState(existingIntervention?.outcomeNotes || '')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: existingIntervention?.id || `int-${Date.now()}`,
      learnerId,
      learnerName,
      recommendedBy: 'Training Provider Placement Cell',
      category,
      title,
      description,
      status,
      targetCompletionDate: targetDate,
      outcomeNotes,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {existingIntervention ? 'Update Outcome Intervention' : 'Prescribe Targeted Intervention'}
              </h3>
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
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Intervention Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            >
              <option value="upskilling">Technical Upskilling & Micro-Credential</option>
              <option value="mock_interview">Mock Interview & Communication Coaching</option>
              <option value="relocation_support">Relocation & Commute Support</option>
              <option value="job_matching">Direct Corporate Job Matching</option>
              <option value="counseling">Career Counseling & Confidence Building</option>
              <option value="employer_liaison">Employer Liaison & Wage Realignment</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Intervention Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Action Plan & Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Completion Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Current Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium"
              >
                <option value="recommended">Recommended</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed (Resolved)</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {status === 'completed' && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Outcome Impact Notes (Follow-up Result)
              </label>
              <textarea
                rows={2}
                value={outcomeNotes}
                onChange={(e) => setOutcomeNotes(e.target.value)}
                placeholder="e.g. Learner cleared corporate interview at Delhivery and received offer letter at ₹21,000/mo."
                className="w-full rounded-lg border border-emerald-300 bg-emerald-50/30 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          )}

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
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
            >
              Save Intervention
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
