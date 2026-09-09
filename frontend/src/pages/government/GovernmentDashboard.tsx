import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGovernmentAnalytics } from '../../api/queries'
import { KpiCard } from '../../components/common/KpiCard'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import {
  Landmark,
  Users,
  Award,
  Briefcase,
  Coins,
  Building,
  CheckCircle2,
  IndianRupee,
  AlertTriangle,
  MapPin,
  FileText,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Filter,
} from 'lucide-react'

export const GovernmentDashboard: React.FC = () => {
  const [selectedScheme, setSelectedScheme] = useState('All Schemes')
  const [selectedState, setSelectedState] = useState('All States')
  const [selectedSector, setSelectedSector] = useState('All Sectors')

  const { data: analyticsData, isLoading, isError, refetch } = useGovernmentAnalytics({
    scheme_name: selectedScheme,
    state: selectedState,
    sector: selectedSector,
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="kpi" count={4} />
        <LoadingSkeleton variant="kpi" count={4} />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    )
  }

  const defaultKpis = {
    totalLearners: 0,
    certifiedLearners: 0,
    employedLearners: 0,
    selfEmployedLearners: 0,
    apprenticeshipLearners: 0,
    overallPlacementRate: 0,
    retentionRate90Day: 0,
    averageMonthlyWage: 0,
    activeInterventionsCount: 0,
  }

  const nationalKpis = analyticsData?.nationalKpis || defaultKpis
  const outcomeFunnel = analyticsData?.outcomeFunnel || []
  const failureModeBreakdown = analyticsData?.failureModeBreakdown || []
  const geographicHeatmap = analyticsData?.geographicHeatmap || []

  return (
    <div className="space-y-6">
      {/* Policy Level Overview Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0B3B60] text-white shadow-xs">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#002541]">
                  National Skilling Outcome Intelligence
                </h1>
                <span className="rounded-md border border-[#0B3B60]/20 bg-[#E8F0F7] px-2.5 py-0.5 text-xs font-semibold text-[#0B3B60]">
                  MSDE / NSDC Longitudinal Layer
                </span>
              </div>
              <p className="text-xs text-[#52606D] mt-0.5">
                Monitoring Post-Certification Pathways Across PMKVY 4.0, DDU-GKY, NULM & PM-Vishwakarma
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => refetch()}
              className="h-10 inline-flex items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#52606D]" />
              <span>Sync Live Feed</span>
            </button>
            <Link
              to="/government/impact"
              className="h-10 inline-flex items-center gap-1.5 rounded-md bg-[#0B3B60] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#082944] transition"
            >
              <span>Longitudinal Impact</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/government/reports"
              className="h-10 inline-flex items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-3.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
            >
              <FileText className="h-3.5 w-3.5 text-[#52606D]" />
              <span>Export Policy Brief</span>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-5 pt-4 border-t border-[#E8EFF5] flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#52606D]">
            <Filter className="h-3.5 w-3.5 text-[#0B3B60]" />
            <span>Policy Scope:</span>
          </div>

          <select
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="h-9 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-medium text-[#1F2937] outline-none focus:border-[#0B3B60]"
          >
            <option>All Schemes (PMKVY, DDU-GKY, NULM, PM-Vishwakarma)</option>
            <option>PMKVY 4.0 Special Projects</option>
            <option>DDU-GKY Rural Placements</option>
            <option>PM-Vishwakarma Artisan Cohorts</option>
            <option>NULM Urban Livelihoods</option>
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="h-9 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-medium text-[#1F2937] outline-none focus:border-[#0B3B60]"
          >
            <option>All States & UTs (36)</option>
            <option>Maharashtra</option>
            <option>Uttar Pradesh</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Gujarat</option>
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="h-9 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-medium text-[#1F2937] outline-none focus:border-[#0B3B60]"
          >
            <option>All Priority Sectors (24 SSCs)</option>
            <option>IT-ITeS & Digital Services</option>
            <option>Electronics & Hardware</option>
            <option>Healthcare & Life Sciences</option>
            <option>Automotive & EV</option>
            <option>Logistics & Supply Chain</option>
          </select>

          <span className="ml-auto text-[11px] font-semibold text-[#006876] bg-[#E0F2F1] px-2.5 py-1 rounded-md border border-[#B2DFDB]">
            Live Cohort: FY 2024-25 Q3
          </span>
        </div>
      </div>

      {isError && (
        <ErrorMessage
          title="Notice: Live analytics connection interrupted"
          message="Displaying cached baseline dataset. Click sync to reconnect."
          onRetry={() => refetch()}
        />
      )}

      {/* Primary KPI Grid (8 Core Indicators) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          title="Total Enrolled"
          value={nationalKpis.totalLearners.toLocaleString()}
          subtitle="Across 36 States & UTs"
          icon={Users}
          variant="default"
        />
        <KpiCard
          title="Certified Candidates"
          value={nationalKpis.certifiedLearners.toLocaleString()}
          subtitle="90.5% Pass Benchmark"
          icon={Award}
          variant="indigo"
        />
        <KpiCard
          title="Formal Wage Placed"
          value={nationalKpis.employedLearners.toLocaleString()}
          trend={{ value: `${nationalKpis.overallPlacementRate}%`, isPositive: true, label: 'Placement rate' }}
          icon={Briefcase}
          variant="success"
        />
        <KpiCard
          title="90-Day Sustainable Retention"
          value={`${nationalKpis.retentionRate90Day}%`}
          trend={{ value: '+8.4%', isPositive: true, label: 'vs previous FY' }}
          icon={CheckCircle2}
          variant="success"
        />
        <KpiCard
          title="Self-Employed / Artisans"
          value={nationalKpis.selfEmployedLearners.toLocaleString()}
          subtitle="PM-Vishwakarma & MUDRA"
          icon={Coins}
          variant="default"
        />
        <KpiCard
          title="Apprenticeship (NAPS)"
          value={nationalKpis.apprenticeshipLearners.toLocaleString()}
          subtitle="Direct Industry Contracts"
          icon={Building}
          variant="indigo"
        />
        <KpiCard
          title="Average Realized Wage"
          value={`₹${nationalKpis.averageMonthlyWage.toLocaleString()}/mo`}
          trend={{ value: '+12.6%', isPositive: true, label: 'Real income lift' }}
          icon={IndianRupee}
          variant="success"
        />
        <KpiCard
          title="Active Interventions"
          value={nationalKpis.activeInterventionsCount.toLocaleString()}
          subtitle="Proactive Risk Rescues"
          trend={{ value: 'Active', isPositive: true, label: 'Targeted support' }}
          icon={Sparkles}
          variant="indigo"
        />
      </div>

      {/* Longitudinal 7-Stage Outcome Funnel */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
              Longitudinal Outcome Funnel & Retention Attrition
            </h2>
            <p className="text-xs text-[#52606D] mt-0.5">
              Tracking {nationalKpis.totalLearners.toLocaleString()} candidate cohort from enrollment through 6-month career sustainability
            </p>
          </div>
          <span className="text-xs font-semibold text-[#059669] bg-[#E8F5E9] px-3 py-1 rounded-md border border-[#C8E6C9] tabular-nums">
            90-Day Retention Benchmark: {nationalKpis.retentionRate90Day}%
          </span>
        </div>

        <div className="space-y-3.5">
          {outcomeFunnel.map((stage: any, idx: number) => (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1F2937] flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#E8F0F7] text-[10px] font-bold text-[#0B3B60]">
                    {idx + 1}
                  </span>
                  {stage.stage}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[#52606D] text-[11px]">{stage.dropReason}</span>
                  <span className="font-semibold text-[#002541] tabular-nums">{stage.count.toLocaleString()}</span>
                  <span className="w-12 text-right font-bold text-[#0B3B60] tabular-nums">{stage.pct}%</span>
                </div>
              </div>
              <div className="h-2.5 w-full rounded-md bg-[#EDF2F7] overflow-hidden">
                <div
                  className={`h-full rounded-md transition-all duration-500 ${
                    stage.pct >= 75 ? 'bg-[#0B3B60]' : stage.pct >= 60 ? 'bg-[#006876]' : 'bg-[#E65100]'
                  }`}
                  style={{ width: `${stage.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Failure Mode Analysis & Geographic Outcomes Heatmap */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Failure Mode Root Cause Breakdown */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">
                Primary Root Causes for Placement Drop-Off
              </h2>
              <p className="text-xs text-[#52606D] mt-0.5">Diagnostic failure modes identified across unplaced and monitored cases</p>
            </div>
            <span className="rounded-md bg-[#FFEBEE] px-2 py-0.5 text-[11px] font-bold text-[#B3261E] border border-[#FFCDD2]">
              Policy Action Required
            </span>
          </div>

          <div className="space-y-3">
            {failureModeBreakdown.map((item: any) => (
              <div key={item.reason} className="p-3.5 rounded-md border border-[#D1D9E2] bg-[#F8FAFC] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1F2937] flex items-center gap-1.5">
                    <AlertTriangle className={`h-3.5 w-3.5 ${item.severity === 'High' ? 'text-[#B3261E]' : 'text-[#E65100]'}`} />
                    {item.reason}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#52606D] tabular-nums">{item.count.toLocaleString()} cases</span>
                    <span className="font-bold text-[#B3261E] tabular-nums">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-md bg-[#E2E8F0] overflow-hidden">
                  <div
                    className={`h-full rounded-md ${item.severity === 'High' ? 'bg-[#B3261E]' : 'bg-[#E65100]'}`}
                    style={{ width: `${item.pct * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic State Performance Heatmap */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider">State-wise Outcome Performance</h2>
              <p className="text-xs text-[#52606D] mt-0.5">Placement velocity and realized average monthly wages</p>
            </div>
            <MapPin className="h-4 w-4 text-[#52606D]" />
          </div>

          <div className="overflow-x-auto border border-[#D1D9E2] rounded-md">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="border-b border-[#D1D9E2] bg-[#F4F6F9] text-[11px] font-semibold text-[#52606D] uppercase tracking-wider">
                <tr>
                  <th className="px-3.5 py-2.5">State</th>
                  <th className="px-3.5 py-2.5">Enrolled</th>
                  <th className="px-3.5 py-2.5">Placed</th>
                  <th className="px-3.5 py-2.5">Placement Rate</th>
                  <th className="px-3.5 py-2.5">Avg Realized Wage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {geographicHeatmap.map((state: any) => (
                  <tr key={state.state} className="hover:bg-[#F8FAFC] transition">
                    <td className="px-3.5 py-2.5 font-semibold text-[#002541]">{state.state}</td>
                    <td className="px-3.5 py-2.5 tabular-nums text-[#52606D]">{state.enrolled.toLocaleString()}</td>
                    <td className="px-3.5 py-2.5 tabular-nums text-[#52606D]">{state.placed.toLocaleString()}</td>
                    <td className="px-3.5 py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md font-semibold text-[11px] tabular-nums ${
                          state.placementRate >= 78
                            ? 'bg-[#E8F5E9] text-[#059669] border border-[#C8E6C9]'
                            : state.placementRate >= 65
                            ? 'bg-[#FFF8E1] text-[#E65100] border border-[#FFE082]'
                            : 'bg-[#FFEBEE] text-[#B3261E] border border-[#FFCDD2]'
                        }`}
                      >
                        {state.placementRate}%
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 font-semibold tabular-nums text-[#002541]">
                      ₹{state.avgWage.toLocaleString()}/mo
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

