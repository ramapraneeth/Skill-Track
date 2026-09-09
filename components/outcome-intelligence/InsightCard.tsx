import React from 'react';
import { RiskPrediction } from '@/types/insight';
import { StatusBadge } from './StatusBadge';
import { AlertOctagon, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';

interface InsightCardProps {
  prediction: RiskPrediction;
}

export const InsightCard: React.FC<InsightCardProps> = ({ prediction }) => {
  return (
    <div className="bg-white border border-[#D1D9E2] rounded-md p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-3">
        <div>
          <span className="text-xs font-semibold text-[#627D98] uppercase tracking-wider">Candidate</span>
          <h4 className="text-base font-bold text-[#102A43]">{prediction.learnerName || prediction.learnerId}</h4>
        </div>
        <div className="text-right">
          <StatusBadge status={`${prediction.riskLevel} Risk`} />
          <div className="text-xs text-[#627D98] mt-1 tabular-nums">
            Probability: {(prediction.probability * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Positive Factors */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded p-3">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Positive Attribution Factors</span>
          </div>
          <ul className="space-y-1.5">
            {prediction.positiveFactors.map((f, i) => (
              <li key={i} className="text-emerald-800">
                <span className="font-semibold">{f.factor}:</span> {f.description}
              </li>
            ))}
            {prediction.positiveFactors.length === 0 && (
              <li className="text-emerald-700 italic">No strong positive indicators detected.</li>
            )}
          </ul>
        </div>

        {/* Risk Factors */}
        <div className="bg-rose-50/60 border border-rose-100 rounded p-3">
          <div className="flex items-center gap-1.5 font-bold text-rose-900 mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Risk Attribution Factors</span>
          </div>
          <ul className="space-y-1.5">
            {prediction.riskFactors.map((f, i) => (
              <li key={i} className="text-rose-800">
                <span className="font-semibold">{f.factor}:</span> {f.description}
              </li>
            ))}
            {prediction.riskFactors.length === 0 && (
              <li className="text-rose-700 italic">No critical risk flags flagged.</li>
            )}
          </ul>
        </div>
      </div>

      {prediction.recommendedInterventions.length > 0 && (
        <div className="bg-[#F0F4F8] border border-[#D1D9E2] rounded p-3 text-xs">
          <span className="font-bold text-[#102A43] block mb-1">Prescriptive Recommendations:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {prediction.recommendedInterventions.map((rec, i) => (
              <span
                key={i}
                className="bg-white border border-[#CBD5E1] text-[#0B3B60] px-2.5 py-1 rounded font-medium"
              >
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
