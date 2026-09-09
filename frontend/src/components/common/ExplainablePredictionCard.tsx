import React from 'react'
import { Prediction } from '../../types'
import { PlusCircle, MinusCircle, ArrowRight, BrainCircuit, ShieldCheck } from 'lucide-react'
import { RiskIndicator } from './RiskIndicator'
import { Button } from '../ui/Button'

interface ExplainablePredictionCardProps {
  prediction: Prediction
  onIntervene?: () => void
  learnerName?: string
}

export const ExplainablePredictionCard: React.FC<ExplainablePredictionCardProps> = ({
  prediction,
  onIntervene,
}) => {
  const isPlacement = prediction.predictionType === 'placement'
  const pct = Math.round(prediction.probability * 100)

  return (
    <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-2xs">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#0B3B60] text-white shadow-xs">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#002541]">
                {isPlacement ? 'Placement Likelihood Diagnostic' : '90-Day Retention & Attrition Diagnostic'}
              </h3>
              <span className="rounded bg-[#E8F0F7] px-2 py-0.5 text-[9px] font-bold text-[#0B3B60] border border-[#B4CFE5] uppercase">
                Explainable AI
              </span>
            </div>
            <p className="text-xs text-[#718096]">
              Model: {prediction.modelVersion} • Evaluated against national longitudinal outcome benchmarks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#718096] uppercase block">
              {isPlacement ? 'Placement Probability' : 'Attrition Risk'}
            </span>
            <span
              className={`text-2xl font-black font-mono tabular-nums ${
                isPlacement
                  ? pct >= 70
                    ? 'text-[#059669]'
                    : pct >= 50
                    ? 'text-[#E65100]'
                    : 'text-[#C5221F]'
                  : pct >= 50
                  ? 'text-[#C5221F]'
                  : 'text-[#059669]'
              }`}
            >
              {pct}%
            </span>
          </div>
          <RiskIndicator riskLevel={prediction.riskLevel} showIcon showMeter />
        </div>
      </div>

      {/* Driver Analysis Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Positive Contributing Factors */}
        <div className="rounded border border-[#A8DAB5] bg-[#E6F4EA]/60 p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#137333]">
            <PlusCircle className="h-4 w-4 text-[#059669]" />
            <span>Key Positive Drivers (+ Boosters)</span>
          </div>
          <ul className="mt-3 space-y-2">
            {prediction.positiveFactors.map((factor, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#137333] font-medium leading-relaxed">
                <span className="mt-0.5 text-[#059669] font-bold">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Deficit Factors */}
        <div className="rounded border border-[#F5A9A4] bg-[#FCE8E6]/60 p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C5221F]">
            <MinusCircle className="h-4 w-4 text-[#C5221F]" />
            <span>Key Risk Drivers (- Bottlenecks)</span>
          </div>
          <ul className="mt-3 space-y-2">
            {prediction.riskFactors.map((risk, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#C5221F] font-medium leading-relaxed">
                <span className="mt-0.5 text-[#C5221F] font-bold">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prescriptive Recommended Actions */}
      {prediction.recommendedInterventions && prediction.recommendedInterventions.length > 0 && (
        <div className="mt-4 rounded border border-[#D1D9E2] bg-[#F4F6F9] p-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#002541]">
              <ShieldCheck className="h-4 w-4 text-[#0B3B60]" />
              <span>Prescriptive Interventions to Mitigate Outcome Risk</span>
            </div>
            {onIntervene && (
              <Button
                onClick={onIntervene}
                size="sm"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Prescribe Action
              </Button>
            )}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {prediction.recommendedInterventions.map((rec, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded border border-[#B4CFE5] bg-white px-2.5 py-1 text-xs font-medium text-[#0B3B60]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0B3B60]" />
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
