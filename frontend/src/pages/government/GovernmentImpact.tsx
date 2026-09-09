import React, { useState } from 'react'
import { useImpact } from '../../api/queries'
import { KpiCard } from '../../components/common/KpiCard'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { TrendingUp, Sparkles, CheckCircle2, ArrowRight, Info, RefreshCw } from 'lucide-react'

export const GovernmentImpact: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'programme' | 'provider' | 'district' | 'intervention_type'>('all')
  const { data: impactList = [], isLoading, isError, refetch } = useImpact()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="kpi" count={3} />
        <LoadingSkeleton variant="card" count={3} />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load impact evaluation records"
        message="Unable to load before/after empirical impact studies."
        onRetry={() => refetch()}
      />
    )
  }

  const filtered = impactList.filter((m: any) => filterType === 'all' || m.entityType === filterType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#002541]">Longitudinal Impact Measurement</h1>
              <span className="rounded-md border border-[#0B3B60]/20 bg-[#E8F0F7] px-2.5 py-0.5 text-xs font-semibold text-[#0B3B60]">
                Before / After Cohort Analysis
              </span>
            </div>
            <p className="text-xs text-[#52606D] mt-1">
              Measuring tangible outcome lifts in placement rates, 90-day retention, and wage progression
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              className="h-10 text-xs font-semibold text-[#1F2937] bg-white hover:bg-[#F4F6F9] px-3.5 rounded-md border border-[#D1D9E2] inline-flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#52606D]" />
              <span>Sync Studies</span>
            </button>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="h-10 rounded-md border border-[#D1D9E2] bg-white px-3 text-xs font-semibold text-[#1F2937] outline-none focus:border-[#0B3B60]"
            >
              <option value="all">Compare All Dimensions</option>
              <option value="programme">By Skilling Programme</option>
              <option value="provider">By Training Provider</option>
              <option value="district">By Target District</option>
              <option value="intervention_type">By Intervention Type</option>
            </select>
          </div>
        </div>
      </div>

      {/* Methodological Transparency Alert */}
      <div className="rounded-md border border-[#0B3B60]/20 bg-[#F4F8FA] p-4 text-xs">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-[#0B3B60] shrink-0 mt-0.5" />
          <div className="space-y-1 text-[#1F2937] leading-relaxed">
            <p className="font-bold text-[#002541]">Scientific Impact Methodology Note:</p>
            <p className="text-[#52606D]">
              Metrics reflect rigorous <strong>Before / After Cohort Analysis</strong> tracking baseline cohorts prior to outcome-intelligence interventions versus post-intervention cohorts. Causal attribution is quantified across standardized 90-day retention checkpoints.
            </p>
          </div>
        </div>
      </div>

      {/* Aggregate Impact KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          title="Average Placement Lift"
          value="+16.5% Lift"
          subtitle="Cohort Baseline: 52.4% → 68.9%"
          icon={TrendingUp}
          variant="success"
        />
        <KpiCard
          title="90-Day Retention Improvement"
          value="+16.6% Lift"
          subtitle="Baseline: 61.2% → Post: 77.8%"
          icon={CheckCircle2}
          variant="success"
        />
        <KpiCard
          title="Monthly Wage Progression"
          value="+₹4,300/mo"
          subtitle="Baseline: ₹15,200 → Post: ₹19,500"
          icon={Sparkles}
          variant="indigo"
        />
      </div>

      {/* Empirical Cohort Comparison Cards */}
      {filtered.length === 0 ? (
        <EmptyState title="No impact studies found" description="Try selecting a different filter dimension above." />
      ) : (
        <div className="space-y-4">
          {filtered.map((item: any) => {
            const placementLift = ((item.postPlacementRate - item.baselinePlacementRate)).toFixed(1)
            const retentionLift = ((item.postRetentionRate - item.baselineRetentionRate)).toFixed(1)
            const wageLift = item.postAvgWage - item.baselineAvgWage

            return (
              <div key={item.id} className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
                  <div>
                    <span className="rounded-md border border-[#D1D9E2] bg-[#F4F6F9] px-2 py-0.5 text-[10px] font-semibold text-[#52606D] uppercase tracking-wider">
                      {item.entityType} Comparison
                    </span>
                    <h2 className="text-sm font-bold text-[#002541] mt-1">{item.entityTitle}</h2>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-mono text-[#52606D]">Period: {item.period}</span>
                    <span className="block font-semibold text-[#1F2937] tabular-nums">Sample Size: {item.sampleSize} Learners</span>
                  </div>
                </div>

                {/* 3 Metric Delta Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Placement Rate Delta */}
                  <div className="p-4 rounded-md border border-[#D1D9E2] bg-[#F8FAFC] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#52606D] font-medium">Placement Rate</span>
                      <span className="font-bold text-[#059669] font-mono tabular-nums">+{placementLift}%</span>
                    </div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-[#52606D] font-mono tabular-nums">Baseline: {item.baselinePlacementRate}%</span>
                      <ArrowRight className="h-3 w-3 text-[#52606D]" />
                      <span className="font-bold text-[#002541] font-mono text-base tabular-nums">{item.postPlacementRate}%</span>
                    </div>
                  </div>

                  {/* 90-Day Retention Delta */}
                  <div className="p-4 rounded-md border border-[#D1D9E2] bg-[#F8FAFC] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#52606D] font-medium">90-Day Retention</span>
                      <span className="font-bold text-[#059669] font-mono tabular-nums">+{retentionLift}%</span>
                    </div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-[#52606D] font-mono tabular-nums">Baseline: {item.baselineRetentionRate}%</span>
                      <ArrowRight className="h-3 w-3 text-[#52606D]" />
                      <span className="font-bold text-[#002541] font-mono text-base tabular-nums">{item.postRetentionRate}%</span>
                    </div>
                  </div>

                  {/* Average Starting Wage Delta */}
                  <div className="p-4 rounded-md border border-[#D1D9E2] bg-[#F8FAFC] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#52606D] font-medium">Monthly Starting Wage</span>
                      <span className="font-bold text-[#059669] font-mono tabular-nums">+₹{wageLift.toLocaleString()}</span>
                    </div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-[#52606D] font-mono tabular-nums">₹{item.baselineAvgWage.toLocaleString()}</span>
                      <ArrowRight className="h-3 w-3 text-[#52606D]" />
                      <span className="font-bold text-[#002541] font-mono text-base tabular-nums">₹{item.postAvgWage.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Qualitative Evaluation Notes */}
                {item.notes && (
                  <div className="rounded-md bg-[#F4F8FA] p-3 text-xs text-[#1F2937] leading-relaxed border border-[#0B3B60]/20">
                    <strong className="text-[#0B3B60]">Evaluation Insight: </strong>
                    {item.notes}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

