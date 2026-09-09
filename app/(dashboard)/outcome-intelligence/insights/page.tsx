'use client';

import React, { useState, useEffect } from 'react';
import { InsightCard } from '@/components/outcome-intelligence/InsightCard';
import { RiskPrediction } from '@/types/insight';
import { Compass, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';

export default function ExplainableInsightsPage() {
  const [predictions, setPredictions] = useState<RiskPrediction[]>([]);
  const [riskFilter, setRiskFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchPredictions = async () => {
    setIsLoading(true);
    try {
      const url = riskFilter
        ? `/api/outcome-intelligence/insights?riskLevel=${encodeURIComponent(riskFilter)}`
        : '/api/outcome-intelligence/insights';

      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setPredictions(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch predictions', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [riskFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D9E2] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#102A43]">Explainable Risk Diagnostics & Insights</h1>
            <span className="bg-[#B45309] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Transparent Intelligence
            </span>
          </div>
          <p className="text-xs text-[#627D98] mt-1">
            Explainable placement forecast and post-placement attrition risks with ranked positive/risk attribution factors
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
          >
            <option value="">All Risk Tiers</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>

          <button
            onClick={fetchPredictions}
            className="h-9 px-3 text-xs font-semibold text-[#0B3B60] bg-white border border-[#D1D9E2] rounded hover:bg-[#F0F4F8] flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white border border-[#D1D9E2] rounded-md p-8 text-center text-xs text-[#627D98]">
          Loading explainable risk attribution models...
        </div>
      ) : predictions.length === 0 ? (
        <div className="bg-white border border-[#D1D9E2] rounded-md p-8 text-center">
          <p className="text-sm font-semibold text-[#102A43]">No risk predictions match criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {predictions.map((p) => (
            <InsightCard key={p.id} prediction={p} />
          ))}
        </div>
      )}
    </div>
  );
}
