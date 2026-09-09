import React from 'react'
import { mockLearners } from '../../data/mockData'
import { BrainCircuit, ShieldAlert, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { RiskIndicator } from '../../components/common/RiskIndicator'

export const GovernmentPredictions: React.FC = () => {
  const atRiskLearners = mockLearners.filter((l) => l.riskLevel === 'High' || l.riskLevel === 'Medium')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Ecosystem Predictive Risk Forecasting</h1>
          <p className="text-xs text-slate-500">
            Macro-level risk forecasting identifying batches and districts prone to placement deficits or high attrition
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
          <BrainCircuit className="h-4 w-4" /> Predictive Diagnostic Layer Active
        </span>
      </div>

      {/* Forecasting Insights Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>High Placement Risk Hotspots</span>
          </div>
          <p className="mt-2 text-2xl font-black text-rose-950 font-mono">14 Districts</p>
          <p className="mt-1 text-xs text-rose-800 leading-relaxed">
            Districts with severe corporate hiring supply bottlenecks requiring active mobilization interventions.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>Predicted Early Attrition</span>
          </div>
          <p className="mt-2 text-2xl font-black text-amber-950 font-mono">18.4% Forecasted</p>
          <p className="mt-1 text-xs text-amber-800 leading-relaxed">
            Projected 30-day drop-off driven primarily by urban commute friction and below-median wage offers.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4" />
            <span>Predicted Intervention Uplift</span>
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-950 font-mono">+16.5% Lift</p>
          <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
            Expected improvement in sustainable placement if prescribed micro-credentials are fully completed.
          </p>
        </div>
      </div>

      {/* Flagged Candidates Sample */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">High Risk Learner Cohorts Sample</h2>
          <p className="text-xs text-slate-500">Individual risk profiles flagged for provider and counselor intervention</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Learner</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Core Bottleneck Drivers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {atRiskLearners.slice(0, 8).map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{l.fullName}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{l.learnerCode}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {l.district}, {l.state}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-700">{l.programmeTitle}</td>
                  <td className="py-3 px-4">
                    <RiskIndicator riskLevel={l.riskLevel} showIcon />
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {l.id === 'learner-1'
                      ? 'Missing Power BI & Low Mock Score (42/100)'
                      : l.id === 'learner-5'
                      ? 'Commute Distance >45km & Low Salary'
                      : 'Skill deficit in required sector tools'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
