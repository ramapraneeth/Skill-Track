import React from 'react';
import { FunnelStage, FailureMode } from '@/types/analytics';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface IntelligenceSummaryProps {
  funnel: FunnelStage[];
  failureModes: FailureMode[];
}

export const IntelligenceSummary: React.FC<IntelligenceSummaryProps> = ({ funnel, failureModes }) => {
  return (
    <div className="space-y-6">
      {/* 5-Stage Longitudinal Funnel */}
      <div className="bg-white border border-[#D1D9E2] rounded-md p-5 shadow-sm">
        <div className="border-b border-[#E2E8F0] pb-3 mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#102A43]">Longitudinal Skilling-to-Employment Funnel</h3>
            <p className="text-xs text-[#627D98] mt-0.5">
              Live tracking from candidate enrollment through verified 90-day post-placement retention
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#006876] bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
            Closed-Loop Outcome Tracking
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {funnel.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-[#D1D9E2] rounded p-3 relative flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-bold text-[#627D98] uppercase tracking-wider mb-1">
                  Stage {idx + 1}
                </div>
                <div className="text-xs font-bold text-[#102A43] line-clamp-1">{step.stage}</div>
              </div>

              <div className="mt-3">
                <div className="text-xl font-extrabold text-[#0B3B60] tabular-nums">
                  {step.count.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-0.5 tabular-nums">
                  {step.rate}% conversion
                </div>
              </div>

              {idx < funnel.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#CBD5E1] rounded-full p-0.5 text-[#627D98]">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Failure Modes Diagnostics */}
      <div className="bg-white border border-[#D1D9E2] rounded-md p-5 shadow-sm">
        <div className="border-b border-[#E2E8F0] pb-3 mb-4">
          <h3 className="text-sm font-bold text-[#102A43]">Outcome Intelligence Failure Mode Diagnostics</h3>
          <p className="text-xs text-[#627D98] mt-0.5">
            Pinpoints exact stages where public investment loses traction to guide targeted interventions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {failureModes.map((mode, i) => (
            <div key={i} className="border border-[#D1D9E2] rounded p-3.5 bg-[#F8FAFC]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-[#102A43]">{mode.mode}</span>
                <span className="text-xs font-bold text-rose-700 tabular-nums">
                  {mode.count} cases ({mode.percentage}%)
                </span>
              </div>
              <p className="text-xs text-[#627D98] leading-relaxed">{mode.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
