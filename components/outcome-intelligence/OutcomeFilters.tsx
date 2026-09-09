import React from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import { AnalyticsFilterParams } from '@/types/analytics';

interface OutcomeFiltersProps {
  filters: AnalyticsFilterParams;
  onChange: (newFilters: AnalyticsFilterParams) => void;
  onReset: () => void;
}

export const OutcomeFilters: React.FC<OutcomeFiltersProps> = ({ filters, onChange, onReset }) => {
  return (
    <div className="bg-white border border-[#D1D9E2] rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#102A43]">
          <Filter className="w-4 h-4 text-[#0B3B60]" />
          <span>Outcome Intelligence Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#006876] hover:text-[#0B3B60] font-medium flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#486581] mb-1">State</label>
          <select
            value={filters.state || ''}
            onChange={(e) => onChange({ ...filters, state: e.target.value || undefined })}
            className="w-full h-9 px-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
          >
            <option value="">All States</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#486581] mb-1">Scheme</label>
          <select
            value={filters.schemeName || ''}
            onChange={(e) => onChange({ ...filters, schemeName: e.target.value || undefined })}
            className="w-full h-9 px-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
          >
            <option value="">All Schemes</option>
            <option value="PMKVY 4.0">PMKVY 4.0</option>
            <option value="DDU-GKY">DDU-GKY</option>
            <option value="PM-Vishwakarma">PM-Vishwakarma</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#486581] mb-1">Sector</label>
          <select
            value={filters.sector || ''}
            onChange={(e) => onChange({ ...filters, sector: e.target.value || undefined })}
            className="w-full h-9 px-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
          >
            <option value="">All Sectors</option>
            <option value="IT-ITeS">IT-ITeS</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Capital Goods">Capital Goods</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#486581] mb-1">District</label>
          <input
            type="text"
            placeholder="Filter by district..."
            value={filters.district || ''}
            onChange={(e) => onChange({ ...filters, district: e.target.value || undefined })}
            className="w-full h-9 px-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
          />
        </div>
      </div>
    </div>
  );
};
