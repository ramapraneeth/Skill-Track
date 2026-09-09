import React from 'react'
import { KpiCard } from '../../components/common/KpiCard'
import { LineChart, BarChart3, AlertTriangle, ShieldCheck } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export const ProviderAnalytics: React.FC = () => {
  const retentionCurve = [
    { milestone: 'Day 1 (Placement)', rate: 100 },
    { milestone: 'Day 30 Check-in', rate: 91.2 },
    { milestone: 'Day 60 Check-in', rate: 84.5 },
    { milestone: 'Day 90 Audit', rate: 78.5 },
    { milestone: 'Month 6 Review', rate: 71.0 },
    { milestone: 'Month 12 Impact', rate: 64.2 },
  ]

  const dropOffReasons = [
    { reason: 'Salary Expectation vs City Cost of Living', pct: 34, action: 'Pre-placement wage counseling' },
    { reason: 'Commute Distance > 25 km from residence', pct: 28, action: 'Cluster-based local job matching' },
    { reason: 'Technical Skill Gap on workplace tools (e.g. ERP)', pct: 22, action: 'Diagnostic micro-credentials' },
    { reason: 'Shift Timings & Cultural Workplace Friction', pct: 16, action: 'Soft-skills & orientation drill' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Longitudinal Cohort Retention Analytics</h1>
          <p className="text-xs text-slate-500">
            Survival curves, attrition driver analysis, and retention optimization
          </p>
        </div>
      </div>

      {/* Retention Survival Curve */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Post-Placement Retention Curve</h3>
            <p className="text-xs text-slate-500">Longitudinal tracking of employment continuity over 12 months</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            78.5% Benchmark at 90 Days
          </span>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={retentionCurve} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="milestone" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                formatter={(v: any) => [`${v}% Active`, 'Retention Rate']}
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={3} fill="url(#retentionGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Failure Mode Breakdown Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <span>Primary Drivers of Early Attrition & Recommended Interventions</span>
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {dropOffReasons.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{item.reason}</span>
                <span className="font-bold text-rose-600 font-mono text-sm">{item.pct}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.pct * 2}%` }} />
              </div>
              <p className="text-slate-600 pt-1">
                <strong className="text-indigo-700 font-semibold">Recommended Intervention:</strong> {item.action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
