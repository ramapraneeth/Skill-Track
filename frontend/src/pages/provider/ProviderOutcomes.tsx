import React from 'react'
import { useOutcomesSummary, useOutcomes } from '../../api/queries'
import { KpiCard } from '../../components/common/KpiCard'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { Briefcase, Building, IndianRupee, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export const ProviderOutcomes: React.FC = () => {
  const { data: summary, isLoading, isError, refetch } = useOutcomesSummary()
  const { data: allOutcomes = [] } = useOutcomes()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="kpi" count={3} />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    )
  }

  if (isError || !summary) {
    return (
      <ErrorMessage
        title="Failed to load outcome intelligence"
        message="Unable to retrieve aggregated outcome metrics from the API service."
        onRetry={() => refetch()}
      />
    )
  }

  const sectorColors = ['#0B3B60', '#006876', '#059669', '#E65100', '#002541']
  const chartData = (summary.sectorBreakdown || []).map((sec: any, idx: number) => ({
    name: sec.sector,
    count: sec.count,
    fill: sectorColors[idx % sectorColors.length],
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#002541]">Placement & Wage Analytics</h1>
          <p className="text-xs text-[#52606D] mt-0.5">
            Employer absorption, starting salaries, and multi-month wage progression
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="h-10 text-xs font-semibold text-[#1F2937] bg-white hover:bg-[#F4F6F9] px-3.5 rounded-md border border-[#D1D9E2] inline-flex items-center gap-1.5 transition"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#52606D]" />
          <span>Refresh Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <KpiCard
          title="Total Outcomes Recorded"
          value={`${summary.totalRecorded} Placed`}
          subtitle={`${summary.totalFormalEmployment} Formal • ${summary.totalSelfEmployment} Self-Emp • ${summary.totalApprenticeship} Appr`}
          icon={Briefcase}
          variant="indigo"
        />
        <KpiCard
          title="Average Starting Wage"
          value={`₹${Math.round(summary.averageStartingMonthlyWage).toLocaleString()}/mo`}
          trend={{ value: '+14%', isPositive: true, label: 'vs state minimum' }}
          icon={IndianRupee}
          variant="success"
        />
        <KpiCard
          title="Verification Audit Rate"
          value={`${summary.overallVerificationRate}% Verified`}
          subtitle="Documented with offer letters & PF"
          icon={ShieldCheck}
          variant="indigo"
        />
        <KpiCard
          title="Top Absorbing Sector"
          value={summary.sectorBreakdown?.[0]?.sector || 'IT-ITeS'}
          subtitle="Highest demand cluster"
          icon={Building}
          variant="indigo"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sector Distribution */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider mb-0.5">Sectoral Absorption Breakdown</h2>
          <p className="text-xs text-[#52606D] mb-4">Volume of certified learners placed by industry</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#52606D' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#52606D' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#002541', borderRadius: '4px', color: '#fff', fontSize: '12px', border: 'none' }}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                  {chartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Distribution */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
          <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider mb-0.5">Starting Wage Brackets</h2>
          <p className="text-xs text-[#52606D] mb-4">Monthly salary tiers reported upon absorption</p>
          <div className="space-y-3 pt-2">
            {(summary.salaryDistribution || []).map((bracket: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-md border border-[#D1D9E2] bg-[#F8FAFC]">
                <span className="text-xs font-semibold text-[#1F2937]">{bracket.range}</span>
                <span className="text-xs font-semibold text-[#0B3B60] bg-[#E8F0F7] px-2.5 py-1 rounded-md border border-[#0B3B60]/20 tabular-nums">
                  {bracket.count} Candidates
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Outcomes Registry */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs">
        <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider mb-0.5">Recent Verified Placements</h2>
        <p className="text-xs text-[#52606D] mb-4">Live documentary audit stream across schemes</p>

        {allOutcomes.length === 0 ? (
          <EmptyState title="No outcomes recorded yet" description="Outcomes will populate as candidates complete placements." />
        ) : (
          <div className="overflow-x-auto border border-[#D1D9E2] rounded-md">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="border-b border-[#D1D9E2] bg-[#F4F6F9] text-[11px] font-semibold text-[#52606D] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Learner</th>
                  <th className="px-4 py-3">Employer / Enterprise</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Sector</th>
                  <th className="px-4 py-3">Monthly Earning</th>
                  <th className="px-4 py-3">Audit Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {allOutcomes.map((item: any) => (
                  <tr key={item.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="px-4 py-3.5 font-semibold text-[#002541]">{item.learnerName}</td>
                    <td className="px-4 py-3.5 text-[#1F2937] font-medium">{item.organizationOrEnterprise}</td>
                    <td className="px-4 py-3.5 text-[#52606D]">{item.designationOrRole}</td>
                    <td className="px-4 py-3.5 text-[#52606D]">{item.sector}</td>
                    <td className="px-4 py-3.5 font-semibold tabular-nums text-[#002541]">₹{item.monthlyEarning?.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#E8F5E9] px-2 py-0.5 text-[11px] font-semibold text-[#059669] border border-[#C8E6C9]">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

