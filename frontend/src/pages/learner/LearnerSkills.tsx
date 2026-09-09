import React from 'react'
import { mockLearners, mockSkills } from '../../data/mockData'
import { Award, CheckCircle2, TrendingUp, AlertCircle, ArrowUpRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export const LearnerSkills: React.FC = () => {
  const learner = mockLearners[0] // Rahul Sharma

  const marketInDemandSkills = [
    { name: 'Power BI & Visual Dashboards', demandWeight: 4.7, missing: true, priority: 'Critical', avgSalary: '₹22,000/mo' },
    { name: 'Advanced MS Excel', demandWeight: 4.5, missing: false, priority: 'Moderate', avgSalary: '₹18,500/mo' },
    { name: 'SQL & Database Queries', demandWeight: 4.9, missing: false, priority: 'Acquired', avgSalary: '₹24,000/mo' },
    { name: 'Python Fundamentals', demandWeight: 4.8, missing: false, priority: 'Acquired', avgSalary: '₹25,000/mo' },
    { name: 'Cloud Basics (AWS/GCP)', demandWeight: 4.4, missing: true, priority: 'High', avgSalary: '₹26,000/mo' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Skill Competency & Market Relevance</h1>
          <p className="text-xs text-slate-500">
            Validated technical proficiencies, soft skills, and local market demand alignment
          </p>
        </div>
        <Link
          to="/skill-gap"
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
        >
          <span>Simulate Target Job Gap</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Current Skill Portfolio */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">Assessed Learner Skills Portfolio</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {learner.skills.map((skill) => (
            <div
              key={skill.id}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 bg-slate-50/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {skill.category.replace('_', ' ')}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{skill.skillName}</h3>
                </div>
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800">
                  {skill.proficiencyLevel.toUpperCase()}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-500">Assessment Score</span>
                  <span className="text-slate-800">{skill.assessedScore}/100</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${
                      skill.assessedScore >= 75
                        ? 'bg-emerald-500'
                        : skill.assessedScore >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${skill.assessedScore}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> NCVET Assessed
                </span>
                <span>{skill.acquiredFrom}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market In-Demand Skills & Gaps */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Regional Market Skill Demand (Delhi NCR)</h2>
            <p className="text-xs text-slate-500">Real-time vacancy demand across 150+ regional IT & Logistics employers</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            Demand Index Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Skill Name</th>
                <th className="py-2.5 px-3">Market Demand Weight</th>
                <th className="py-2.5 px-3">Learner Status</th>
                <th className="py-2.5 px-3">Priority Action</th>
                <th className="py-2.5 px-3">Associated Avg Wage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {marketInDemandSkills.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">★ {item.demandWeight} / 5.0</td>
                  <td className="py-3 px-3">
                    {item.missing ? (
                      <span className="inline-flex items-center gap-1 rounded bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-800">
                        <AlertCircle className="h-3 w-3" /> Missing Deficit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                        <CheckCircle2 className="h-3 w-3" /> Acquired
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-semibold ${
                        item.priority === 'Critical'
                          ? 'text-rose-600 font-bold'
                          : item.priority === 'High'
                          ? 'text-amber-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {item.priority === 'Critical' ? 'Immediate Fast-Track Intervention' : item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-slate-700">{item.avgSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
