import React from 'react'
import { mockJobs, mockLearners } from '../../data/mockData'
import { Sparkles, Briefcase, GraduationCap, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export const LearnerRecommendations: React.FC = () => {
  const learner = mockLearners[0] // Rahul Sharma

  const recommendedTrainings = [
    {
      id: 'rec-tr-1',
      title: 'Power BI Accelerated Micro-Credential (14 Days)',
      provider: 'NASSCOM / Apex Skilling Academy',
      duration: '40 Hours',
      fitScore: 98,
      reason: 'Bridges the 38% skill deficit for 12 local corporate job openings in Delhi NCR.',
      cost: 'Government Sponsored (PMKVY 4.0)',
    },
    {
      id: 'rec-tr-2',
      title: 'Corporate Interview & Business Communication Drill',
      provider: 'National Skill Development Corporation (NSDC)',
      duration: '15 Hours',
      fitScore: 92,
      reason: 'Directly addresses the 42/100 mock interview readiness gap identified in screening.',
      cost: 'Free Self-Paced Module',
    },
    {
      id: 'rec-tr-3',
      title: 'Advanced Data Modeling in PostgreSQL',
      provider: 'TechVeda Foundation',
      duration: '30 Hours',
      fitScore: 84,
      reason: 'Enhances existing SQL fundamentals to qualify for higher salary brackets (₹25,000+).',
      cost: 'Sponsored via Digital Skill Hub',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Personalized Career & Upskilling Recommendations</h1>
          <p className="text-xs text-slate-500">
            Algorithmic recommendations generated from your skill gap diagnosis and regional hiring demand
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
          <Sparkles className="h-4 w-4" /> AI Prescriptive Engine Active
        </span>
      </div>

      {/* Priority Recommended Upskilling Modules */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-indigo-600" />
          <span>Priority Upskilling Modules (Bridge Your Immediate Gaps)</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {recommendedTrainings.map((tr) => (
            <div
              key={tr.id}
              className="flex flex-col justify-between rounded-xl border border-indigo-100 bg-indigo-50/20 p-4 text-xs transition hover:border-indigo-400 hover:shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800">
                    {tr.fitScore}% Fit Match
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">{tr.duration}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{tr.title}</h3>
                <p className="text-slate-500 text-[11px] font-medium">{tr.provider}</p>
                <p className="text-slate-600 leading-relaxed pt-2 border-t border-indigo-100/60">{tr.reason}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-indigo-100/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-700">{tr.cost}</span>
                <button className="inline-flex items-center gap-1 rounded bg-indigo-600 px-2.5 py-1 text-white font-bold hover:bg-indigo-700 transition">
                  <span>Enroll</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Matching Jobs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-indigo-600" />
            <span>Target Job Openings Aligned with Your Profile</span>
          </h2>
          <Link to="/jobs" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
            Browse All Jobs →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockJobs.slice(0, 4).map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-200 p-4 text-xs transition hover:border-slate-300 bg-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                  <p className="text-slate-600 font-medium">{job.companyName}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{job.district}, {job.state}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 font-bold font-mono text-slate-800">
                  ₹{job.minSalary.toLocaleString()} - ₹{job.maxSalary.toLocaleString()}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                {job.requiredSkills.map((sk) => (
                  <span
                    key={sk.skillId}
                    className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                  >
                    {sk.skillName}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 font-semibold">{job.vacancies} Vacancies Open</span>
                <Link
                  to="/skill-gap"
                  className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700"
                >
                  <span>Check Skill Match</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
