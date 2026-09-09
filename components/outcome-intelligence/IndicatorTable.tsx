import React from 'react';
import { SchemeIndicator } from '@/types/indicator';

interface IndicatorTableProps {
  schemes: SchemeIndicator[];
  isLoading?: boolean;
}

export const IndicatorTable: React.FC<IndicatorTableProps> = ({ schemes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#D1D9E2] rounded-md p-6 text-center text-sm text-[#627D98]">
        Loading scheme outcome indicators...
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D1D9E2] rounded-md overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F0F4F8] border-b border-[#D1D9E2] text-[#334E68] font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Scheme & Programme</th>
              <th className="py-3 px-4 text-right">Enrolled</th>
              <th className="py-3 px-4 text-right">Certified</th>
              <th className="py-3 px-4 text-right">Placed</th>
              <th className="py-3 px-4 text-right">Certification Rate</th>
              <th className="py-3 px-4 text-right">Placement Rate</th>
              <th className="py-3 px-4 text-right">90-Day Retention</th>
              <th className="py-3 px-4 text-right">Avg Wage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {schemes.map((scheme) => (
              <tr key={scheme.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 px-4 font-bold text-[#102A43]">{scheme.schemeName}</td>
                <td className="py-3 px-4 text-right tabular-nums text-[#334E68]">{scheme.enrolled.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-right tabular-nums text-[#334E68]">{scheme.certified.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-right tabular-nums font-semibold text-[#0B3B60]">{scheme.placed.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-right tabular-nums font-semibold text-emerald-700">{scheme.certificationRate}%</td>
                <td className="py-3 px-4 text-right tabular-nums font-semibold text-emerald-700">{scheme.placementRate}%</td>
                <td className="py-3 px-4 text-right tabular-nums font-semibold text-[#006876]">{scheme.retention90DayRate}%</td>
                <td className="py-3 px-4 text-right tabular-nums font-bold text-[#102A43]">₹{scheme.avgWage.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
