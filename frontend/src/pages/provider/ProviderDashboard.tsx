import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockLearners, mockProgrammes, mockProviders } from '../../data/mockData'
import { KpiCard } from '../../components/common/KpiCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { RiskIndicator } from '../../components/common/RiskIndicator'
import { InterventionModal } from '../../components/common/InterventionModal'
import {
  Users,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  School,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

export const ProviderDashboard: React.FC = () => {
  const provider = mockProviders[0] // Apex Skilling Academy
  const [learnersList, setLearnersList] = useState(mockLearners)
  const [selectedLearner, setSelectedLearner] = useState<any>(null)
  const [isInterveneOpen, setIsInterveneOpen] = useState(false)

  const handleOpenIntervene = (learner: any) => {
    setSelectedLearner(learner)
    setIsInterveneOpen(true)
  }

  const handleSaveIntervention = (newInt: any) => {
    setLearnersList((prev) =>
      prev.map((l) => (l.id === newInt.learnerId ? { ...l, interventions: [newInt, ...l.interventions] } : l))
    )
  }

  // Trend data for charts
  const cohortFunnelData = [
    { name: 'Enrolled', count: 120, pct: 100 },
    { name: 'Completed', count: 112, pct: 93.3 },
    { name: 'Certified', count: 104, pct: 86.7 },
    { name: 'Placed', count: 78, pct: 65.0 },
    { name: '30d Retained', count: 72, pct: 60.0 },
    { name: '90d Retained', count: 65, pct: 54.2 },
  ]

  const wageTrendData = [
    { month: 'Batch 1 (Q1)', wage: 16500 },
    { month: 'Batch 2 (Q2)', wage: 17800 },
    { month: 'Batch 3 (Q3)', wage: 18900 },
    { month: 'Batch 4 (Current)', wage: 19500 },
  ]

  const atRiskLearners = learnersList.filter((l) => l.riskLevel === 'High' || l.riskLevel === 'Medium')

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0B3B60] text-white shadow-xs">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#002541]">{provider.name}</h1>
                <span className="rounded-md border border-[#059669]/30 bg-[#E8F5E9] px-2.5 py-0.5 text-xs font-semibold text-[#059669]">
                  {provider.accreditationTier}
                </span>
                <span className="rounded-md border border-[#D1D9E2] bg-[#F4F6F9] px-2 py-0.5 text-xs font-mono text-[#52606D]">
                  {provider.code}
                </span>
              </div>
              <p className="text-xs text-[#52606D] mt-0.5">
                District: {provider.district}, {provider.state} • Operational Center Performance
              </p>
            </div>
          </div>
          <Link
            to="/provider/learners"
            className="h-10 inline-flex items-center gap-2 rounded-md bg-[#0B3B60] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#082944] transition"
          >
            <Users className="h-4 w-4" />
            <span>Manage All {learnersList.length} Learners</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Active Learners"
          value={provider.activeLearnersCount}
          subtitle="Enrolled Across 4 Active Batches"
          icon={Users}
          variant="indigo"
        />
        <KpiCard
          title="Placement Rate"
          value={`${provider.overallPlacementRate}%`}
          trend={{ value: '+4.8%', isPositive: true, label: 'vs state avg' }}
          icon={Briefcase}
          variant="success"
        />
        <KpiCard
          title="90-Day Retention"
          value={`${provider.overallRetentionRate}%`}
          trend={{ value: '+6.2%', isPositive: true, label: 'Sustainable rate' }}
          icon={CheckCircle2}
          variant="success"
        />
        <KpiCard
          title="At-Risk Learners"
          value={atRiskLearners.length}
          subtitle="Requiring Targeted Interventions"
          trend={{ value: 'Action Required', isPositive: false }}
          icon={ShieldAlert}
          variant="danger"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Cohort Funnel */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#002541] uppercase tracking-wider">Longitudinal Outcome Funnel</h3>
              <p className="text-xs text-[#52606D] mt-0.5">Progression from Enrollment to 90-Day Retention</p>
            </div>
            <span className="text-xs font-semibold text-[#059669] bg-[#E8F5E9] px-2.5 py-1 rounded-md border border-[#C8E6C9] tabular-nums">
              54.2% Net Retention
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortFunnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#52606D' }} />
                <YAxis tick={{ fontSize: 11, fill: '#52606D' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} Learners`, 'Count']}
                  contentStyle={{ backgroundColor: '#002541', borderRadius: '4px', color: '#fff', fontSize: '12px', border: 'none' }}
                />
                <Bar dataKey="count" fill="#0B3B60" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wage Progression Trend */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#002541] uppercase tracking-wider">Average Starting Wage Progression</h3>
              <p className="text-xs text-[#52606D] mt-0.5">Monthly wages secured across consecutive batches</p>
            </div>
            <span className="text-xs font-semibold text-[#006876] bg-[#E0F2F1] px-2.5 py-1 rounded-md border border-[#B2DFDB] tabular-nums">
              ₹19,500 Current Avg
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wageTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52606D' }} />
                <YAxis tick={{ fontSize: 11, fill: '#52606D' }} />
                <Tooltip
                  formatter={(val: any) => [`₹${val.toLocaleString()}`, 'Avg Wage']}
                  contentStyle={{ backgroundColor: '#002541', borderRadius: '4px', color: '#fff', fontSize: '12px', border: 'none' }}
                />
                <Line type="monotone" dataKey="wage" stroke="#006876" strokeWidth={2.5} dot={{ r: 4, fill: '#006876' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* At-Risk Cohort Priority Action Table */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#002541] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[#E65100]" />
              <span>Learners Requiring Outcome Intervention (At-Risk Cohort)</span>
            </h3>
            <p className="text-xs text-[#52606D] mt-0.5">
              Flagged by predictive engine for low placement likelihood or post-placement attrition risk
            </p>
          </div>
          <Link to="/provider/learners" className="text-xs font-semibold text-[#0B3B60] hover:underline">
            View All Cohorts →
          </Link>
        </div>

        <div className="overflow-x-auto border border-[#D1D9E2] rounded-md">
          <table className="w-full text-left text-xs text-[#1F2937]">
            <thead className="bg-[#F4F6F9] text-[11px] uppercase font-semibold text-[#52606D] border-b border-[#D1D9E2]">
              <tr>
                <th className="py-2.5 px-3.5">Learner</th>
                <th className="py-2.5 px-3.5">Programme</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5">Outcome Risk Level</th>
                <th className="py-2.5 px-3.5">Identified Deficit</th>
                <th className="py-2.5 px-3.5 text-right">Target Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {atRiskLearners.slice(0, 5).map((learner) => (
                <tr key={learner.id} className="hover:bg-[#F8FAFC] transition">
                  <td className="py-3 px-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-md bg-[#0B3B60] text-white flex items-center justify-center font-bold text-xs">
                        {learner.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#002541]">{learner.fullName}</p>
                        <p className="text-[10px] text-[#52606D] font-mono">{learner.learnerCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3.5 text-[#52606D] max-w-xs truncate">{learner.programmeTitle}</td>
                  <td className="py-3 px-3.5">
                    <StatusBadge status={learner.currentStatus} size="sm" />
                  </td>
                  <td className="py-3 px-3.5">
                    <RiskIndicator riskLevel={learner.riskLevel} showIcon />
                  </td>
                  <td className="py-3 px-3.5 text-[#52606D]">
                    {learner.id === 'learner-1'
                      ? 'Missing Power BI & Low Mock Score (42/100)'
                      : learner.id === 'learner-5'
                      ? 'Commute Mismatch (>45km) & Low Salary'
                      : 'Technical assessment score below 60%'}
                  </td>
                  <td className="py-3 px-3.5 text-right">
                    <button
                      onClick={() => handleOpenIntervene(learner)}
                      className="h-8 inline-flex items-center gap-1 rounded-md bg-[#E8F0F7] border border-[#0B3B60]/20 px-2.5 text-xs font-semibold text-[#0B3B60] hover:bg-[#0B3B60] hover:text-white transition"
                    >
                      <span>Prescribe</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLearner && (
        <InterventionModal
          isOpen={isInterveneOpen}
          onClose={() => setIsInterveneOpen(false)}
          learnerName={selectedLearner.fullName}
          learnerId={selectedLearner.id}
          onSave={handleSaveIntervention}
        />
      )}
    </div>
  )
}

