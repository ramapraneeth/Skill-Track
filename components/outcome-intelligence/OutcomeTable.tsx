import React from 'react';
import { EmploymentOutcome } from '@/types/outcome';
import { StatusBadge } from './StatusBadge';
import { Building2, MapPin, Calendar } from 'lucide-react';

interface OutcomeTableProps {
  outcomes: EmploymentOutcome[];
  isLoading?: boolean;
}

export const OutcomeTable: React.FC<OutcomeTableProps> = ({ outcomes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#D1D9E2] rounded-md p-6 text-center text-sm text-[#627D98]">
        Loading verified outcomes from Neon PostgreSQL...
      </div>
    );
  }

  if (outcomes.length === 0) {
    return (
      <div className="bg-white border border-[#D1D9E2] rounded-md p-8 text-center">
        <p className="text-sm font-semibold text-[#102A43]">No outcomes found</p>
        <p className="text-xs text-[#627D98] mt-1">Adjust filters or record new post-skilling placements.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D1D9E2] rounded-md overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F0F4F8] border-b border-[#D1D9E2] text-[#334E68] font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Role & Employer</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Sector</th>
              <th className="py-3 px-4 text-right">Monthly Salary</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {outcomes.map((outcome) => (
              <tr key={outcome.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 px-4 font-semibold text-[#102A43]">
                  {outcome.learnerName || outcome.learnerId}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-[#102A43]">{outcome.designation}</div>
                  <div className="text-[#627D98] flex items-center gap-1 text-[11px]">
                    <Building2 className="w-3 h-3" />
                    <span>{outcome.employerName}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#334E68]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#627D98]" />
                    <span>{outcome.district}, {outcome.state}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-[#F0F4F8] text-[#334E68] px-2 py-0.5 rounded text-[11px] font-medium border border-[#D1D9E2]">
                    {outcome.sector}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#102A43] tabular-nums">
                  ₹{outcome.monthlySalary.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-[#627D98]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{outcome.startDate}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={outcome.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
