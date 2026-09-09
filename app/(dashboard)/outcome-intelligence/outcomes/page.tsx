'use client';

import React, { useState, useEffect } from 'react';
import { OutcomeTable } from '@/components/outcome-intelligence/OutcomeTable';
import { EmploymentOutcome, OutcomeSummary } from '@/types/outcome';
import { Award, Briefcase, Plus, Filter, RefreshCw } from 'lucide-react';

export default function OutcomesRegistryPage() {
  const [outcomes, setOutcomes] = useState<EmploymentOutcome[]>([]);
  const [summary, setSummary] = useState<OutcomeSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sectorFilter, setSectorFilter] = useState('');

  const fetchOutcomes = async () => {
    setIsLoading(true);
    try {
      const url = sectorFilter
        ? `/api/outcome-intelligence/outcomes?sector=${encodeURIComponent(sectorFilter)}`
        : '/api/outcome-intelligence/outcomes';

      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setOutcomes(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch outcomes', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOutcomes();
  }, [sectorFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D9E2] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#102A43]">Longitudinal Outcome Registry</h1>
            <span className="bg-[#0B3B60] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {outcomes.length} Placements
            </span>
          </div>
          <p className="text-xs text-[#627D98] mt-1">
            Verified wage employment, formal apprenticeships, and micro-enterprise outcomes registered in Neon DB
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
          >
            <option value="">All Sectors</option>
            <option value="IT-ITeS">IT-ITeS</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Capital Goods">Capital Goods</option>
            <option value="Logistics">Logistics</option>
          </select>
          <button
            onClick={fetchOutcomes}
            className="h-9 px-3 text-xs font-semibold text-[#0B3B60] bg-white border border-[#D1D9E2] rounded hover:bg-[#F0F4F8] flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <OutcomeTable outcomes={outcomes} isLoading={isLoading} />
    </div>
  );
}
