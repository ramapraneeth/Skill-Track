import React from 'react'
import { mockProgrammes } from '../../data/mockData'
import { GraduationCap, Award, Briefcase, IndianRupee, Clock, ArrowUpRight } from 'lucide-react'

export const ProviderProgrammes: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Training Programmes & Batch Health</h1>
          <p className="text-xs text-slate-500">
            Monitoring curricula completion, assessment pass rates, and placement benchmarks by course
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProgrammes.map((prog) => {
          const completionRate = Math.round((prog.completedCount / prog.totalEnrolled) * 100)
          const placementRate = Math.round((prog.placedCount / prog.certifiedCount) * 100)

          return (
            <div
              key={prog.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 uppercase">
                    {prog.schemeName}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{prog.code}</span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{prog.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Sector: {prog.sector}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {prog.durationWeeks} Weeks
                  </span>
                  <span>•</span>
                  <span>NSQF Level {prog.nsqfLevel}</span>
                </div>

                {/* Progress Stats */}
                <div className="space-y-2 pt-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold mb-1">
                      <span className="text-slate-500">Completion ({prog.completedCount}/{prog.totalEnrolled})</span>
                      <span className="text-slate-800">{completionRate}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${completionRate}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-semibold mb-1">
                      <span className="text-slate-500">Placement ({prog.placedCount}/{prog.certifiedCount})</span>
                      <span className="text-slate-800">{placementRate}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${placementRate}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Starting Wage</span>
                  <span className="font-bold font-mono text-slate-900">₹{prog.avgStartingWage.toLocaleString()}/mo</span>
                </div>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                  Active Batch
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
