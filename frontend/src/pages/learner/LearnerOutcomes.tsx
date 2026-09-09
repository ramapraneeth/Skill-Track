import React, { useState } from 'react'
import { mockLearners } from '../../data/mockData'
import { FollowupModal } from '../../components/common/FollowupModal'
import {
  Briefcase,
  CalendarCheck,
  TrendingUp,
  Building,
  CheckCircle2,
  AlertCircle,
  Plus,
  Coins,
  History,
} from 'lucide-react'

export const LearnerOutcomes: React.FC = () => {
  // Use Priya Patel (Learner 2) or Rahul Sharma with multi-outcomes
  const [selectedLearner, setSelectedLearner] = useState(mockLearners[1]) // Priya Patel has full verified employment outcomes + followups
  const [isFollowupOpen, setIsFollowupOpen] = useState(false)

  const handleSaveFollowup = (newFollowup: any) => {
    setSelectedLearner((prev) => ({
      ...prev,
      followups: [newFollowup, ...prev.followups],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-black text-slate-900">Longitudinal Outcome Record</h1>
          <p className="text-xs text-slate-500">
            Multi-track career records across Wage Employment, Self-Employment, and Apprenticeships
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Demo Learner Switcher to view Placed vs Unplaced */}
          <select
            value={selectedLearner.id}
            onChange={(e) => {
              const found = mockLearners.find((l) => l.id === e.target.value)
              if (found) setSelectedLearner(found)
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="learner-2">Viewing: Priya Patel (Placed & 60d Retained)</option>
            <option value="learner-3">Viewing: Ananya Das (Self-Employed - PM-Vishwakarma)</option>
            <option value="learner-4">Viewing: Mohammad Arshad (Apprenticeship - NAPS)</option>
            <option value="learner-1">Viewing: Rahul Sharma (Unplaced - Seeking Job)</option>
          </select>

          <button
            onClick={() => setIsFollowupOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Log Follow-up</span>
          </button>
        </div>
      </div>

      {/* Outcome Category Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formal Wage Employment */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Briefcase className="h-4 w-4 text-indigo-600" />
              <span>Wage Employment</span>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {selectedLearner.employmentOutcomes.length} Records
            </span>
          </div>

          {selectedLearner.employmentOutcomes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
              No formal wage employment record logged yet.
            </div>
          ) : (
            <div className="space-y-3">
              {selectedLearner.employmentOutcomes.map((emp) => (
                <div key={emp.id} className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{emp.designation}</h4>
                      <p className="text-slate-600">{emp.employerName}</p>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 uppercase">
                      {emp.status}
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Monthly Wage</span>
                      <span className="font-bold text-slate-900 font-mono">₹{emp.monthlySalary.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Start Date</span>
                      <span className="font-semibold text-slate-800">{emp.startDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Self-Employment & Entrepreneurship */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Coins className="h-4 w-4 text-teal-600" />
              <span>Self-Employment</span>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {selectedLearner.selfEmploymentOutcomes.length} Records
            </span>
          </div>

          {selectedLearner.selfEmploymentOutcomes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
              No enterprise venture logged.
            </div>
          ) : (
            <div className="space-y-3">
              {selectedLearner.selfEmploymentOutcomes.map((se) => (
                <div key={se.id} className="rounded-lg border border-teal-200 bg-teal-50/30 p-3.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{se.enterpriseName}</h4>
                      <p className="text-teal-800 font-medium">{se.sector}</p>
                    </div>
                    <span className="rounded bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                      Active
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-teal-200/60 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Monthly Earnings</span>
                      <span className="font-bold text-slate-900 font-mono">₹{se.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Microfinance</span>
                      <span className="font-bold text-emerald-700">MUDRA Supported</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Apprenticeship Contracts */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Building className="h-4 w-4 text-sky-600" />
              <span>Apprenticeship</span>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {selectedLearner.apprenticeshipOutcomes.length} Records
            </span>
          </div>

          {selectedLearner.apprenticeshipOutcomes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
              No NAPS apprenticeship contract logged.
            </div>
          ) : (
            <div className="space-y-3">
              {selectedLearner.apprenticeshipOutcomes.map((app) => (
                <div key={app.id} className="rounded-lg border border-sky-200 bg-sky-50/30 p-3.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{app.establishmentName}</h4>
                      <p className="text-sky-800 font-medium font-mono text-[10px]">
                        Contract: {app.contractNumber}
                      </p>
                    </div>
                    <span className="rounded bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                      {app.durationMonths} Months
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-sky-200/60 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Monthly Stipend</span>
                      <span className="font-bold text-slate-900 font-mono">₹{app.stipendAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Commenced</span>
                      <span className="font-semibold text-slate-800">{app.startDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Longitudinal Milestone Follow-ups (30d, 60d, 90d, 6m) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Milestone Follow-up Audits (Longitudinal Verification)</h2>
            <p className="text-xs text-slate-500">
              Verified by training providers, independent call centers, and direct payslip audits
            </p>
          </div>
          <button
            onClick={() => setIsFollowupOpen(true)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            + Add Milestone Check-in
          </button>
        </div>

        {selectedLearner.followups.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
            No longitudinal follow-up logged yet for this learner.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Milestone</th>
                  <th className="py-2.5 px-3">Verification Date</th>
                  <th className="py-2.5 px-3">Retention Status</th>
                  <th className="py-2.5 px-3">Verified Wage</th>
                  <th className="py-2.5 px-3">Job Satisfaction</th>
                  <th className="py-2.5 px-3">Skill Relevance</th>
                  <th className="py-2.5 px-3">Auditor Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedLearner.followups.map((fl) => (
                  <tr key={fl.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-bold text-slate-900 uppercase">{fl.milestone.replace('_', ' ')}</td>
                    <td className="py-3 px-3 text-slate-600">{fl.followupDate}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold ${
                          fl.retentionStatus === 'retained'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {fl.retentionStatus === 'retained' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        {fl.retentionStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">₹{fl.currentSalary.toLocaleString()}</td>
                    <td className="py-3 px-3 font-semibold text-slate-700">★ {fl.jobSatisfactionScore} / 5</td>
                    <td className="py-3 px-3 font-semibold text-slate-700">★ {fl.skillRelevanceScore} / 5</td>
                    <td className="py-3 px-3 text-slate-600 max-w-xs truncate">{fl.notes}</td>
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
        learnerName={selectedLearner.fullName}
        learnerId={selectedLearner.id}
        onSave={handleSaveFollowup}
      />
    </div>
  )
}
