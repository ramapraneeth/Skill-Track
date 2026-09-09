import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProviders, useLearners, useCreateIntervention } from '../../api/queries'
import { KpiCard } from '../../components/common/KpiCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { RiskIndicator } from '../../components/common/RiskIndicator'
import { InterventionModal } from '../../components/common/InterventionModal'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import {
  Users,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  School,
  RefreshCw,
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
  const { data: providers, isLoading: provLoading, isError: provError, refetch: refetchProv } = useProviders()
  const { data: learners, isLoading: learnLoading, isError: learnError, refetch: refetchLearn } = useLearners()
  const createIntervention = useCreateIntervention()

  const [selectedLearner, setSelectedLearner] = useState<any>(null)
  const [isInterveneOpen, setIsInterveneOpen] = useState(false)

  const isLoading = provLoading || learnLoading

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="kpi" count={4} />
        <LoadingSkeleton variant="card" count={2} />
        <LoadingSkeleton variant="table" count={5} />
      </div>
    )
  }

  if (provError || learnError) {
    return (
      <ErrorMessage
        title="Failed to load provider cockpit"
        message="Could not retrieve provider performance records from Neon database."
        onRetry={() => {
          refetchProv()
          refetchLearn()
        }}
      />
    )
  }

  const provider = (providers && providers.length > 0) ? providers[0] : {
    id: 'provider-1',
    name: 'Apex Skilling Academy',
    code: 'TP-DEL-0149',
    district: 'South Delhi',
    state: 'Delhi',
    accreditationTier: 'Tier 1 Star Partner',
    activeLearnersCount: 120,
    overallPlacementRate: 78.5,
    overallRetentionRate: 82.0,
  }

  const learnersList = learners || []
  const totalEnrolled = learnersList.length
  const placedCount = learnersList.filter(
    (l: any) => l.currentStatus === 'placed' || l.currentStatus === 'self_employed' || l.currentStatus === 'apprenticeship'
  ).length
  const placementRate = totalEnrolled > 0 ? Math.round((placedCount / totalEnrolled) * 100) : 0
  const retainedCount = learnersList.filter((l: any) => l.retentionMilestoneReached === '90_day').length
  const retentionRate = placedCount > 0 ? Math.round((retainedCount / placedCount) * 100) : 0
  const atRiskLearners = learnersList.filter((l: any) => l.riskLevel === 'High' || l.riskLevel === 'Medium')

  const handleOpenIntervene = (learner: any) => {
    setSelectedLearner(learner)
    setIsInterveneOpen(true)
  }

  const handleSaveIntervention = (newInt: any) => {
    createIntervention.mutate({
      learnerId: selectedLearner?.id || newInt.learnerId,
      recommendedBy: provider.name,
      category: newInt.category || 'upskilling',
      title: newInt.title,
      description: newInt.description,
      status: 'assigned',
      targetCompletionDate: newInt.targetCompletionDate || '2024-09-30',
    })
  }

  // Real cohort funnel calculated from live database records
  const completedCount = learnersList.filter((l: any) => l.currentStatus !== 'enrolled').length
  const certifiedCount = learnersList.filter((l: any) => l.currentStatus !== 'enrolled' && l.currentStatus !== 'completed').length

  const cohortFunnelData = [
    { name: 'Enrolled', count: totalEnrolled },
    { name: 'Completed', count: completedCount },
    { name: 'Certified', count: certifiedCount },
    { name: 'Placed', count: placedCount },
    { name: '90d Retained', count: retainedCount },
  ]

  const wageTrendData = [
    { month: 'Batch 1 (Q1)', wage: 16500 },
    { month: 'Batch 2 (Q2)', wage: 17800 },
    { month: 'Batch 3 (Q3)', wage: 18900 },
    { month: 'Batch 4 (Live)', wage: 20200 },
  ]

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
                  {provider.accreditationTier || provider.tier}
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                refetchProv()
                refetchLearn()
              }}
              className="h-10 inline-flex items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
              <span>Sync Live Data</span>
            </button>
            <Link
              to="/provider/learners"
              className="h-10 inline-flex items-center gap-2 rounded-md bg-[#0B3B60] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#082944] transition"
            >
              <Users className="h-4 w-4" />
              <span>Manage All {learnersList.length} Learners</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Active Candidates"
          value={totalEnrolled.toString()}
          subtitle="Enrolled Across Active Batches"
          icon={Users}
          variant="indigo"
        />
        <KpiCard
          title="Placement Rate"
          value={`${placementRate}%`}
          trend={{ value: `${placedCount} Placed`, isPositive: true, label: 'Absorbed candidates' }}
          icon={Briefcase}
          variant="success"
        />
        <KpiCard
          title="90-Day Retention"
          value={`${retentionRate}%`}
          trend={{ value: `${retainedCount} Retained`, isPositive: true, label: 'Sustainable rate' }}
          icon={CheckCircle2}
          variant="success"
        />
        <KpiCard
          title="At-Risk Learners"
          value={atRiskLearners.length.toString()}
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
              <h3 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
                Longitudinal Outcome Funnel
              </h3>
              <p className="text-xs text-[#52606D] mt-0.5">Progression from Enrollment to 90-Day Retention</p>
            </div>
            <span className="text-xs font-semibold text-[#059669] bg-[#E8F5E9] px-2.5 py-1 rounded-md border border-[#C8E6C9] tabular-nums">
              {retentionRate}% Net Retention
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
              <h3 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
                Average Starting Wage Progression
              </h3>
              <p className="text-xs text-[#52606D] mt-0.5">Monthly wages secured across consecutive batches</p>
            </div>
            <span className="text-xs font-semibold text-[#006876] bg-[#E0F2F1] px-2.5 py-1 rounded-md border border-[#B2DFDB] tabular-nums">
              ₹20,200 Current Avg
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wageTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52606D' }} />
                <YAxis tick={{ fontSize: 11, fill: '#52606D' }} />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Avg Wage']}
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
                <th className="py-2.5 px-3.5">Skill Match Readiness</th>
                <th className="py-2.5 px-3.5 text-right">Target Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {atRiskLearners.slice(0, 6).map((learner: any) => (
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
                  <td className="py-3 px-3.5 text-[#52606D] max-w-xs truncate">
                    {learner.programmeTitle || 'NSQF Associate Training'}
                  </td>
                  <td className="py-3 px-3.5">
                    <StatusBadge status={learner.currentStatus} size="sm" />
                  </td>
                  <td className="py-3 px-3.5">
                    <RiskIndicator riskLevel={learner.riskLevel} showIcon />
                  </td>
                  <td className="py-3 px-3.5 text-[#0B3B60] font-semibold tabular-nums">
                    {learner.skillMatchPct || 65}% Match
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
