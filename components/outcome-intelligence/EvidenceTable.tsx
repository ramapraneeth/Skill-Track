import React from 'react';
import { FollowupRecord } from '@/types/evidence';
import { StatusBadge } from './StatusBadge';
import { CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';

interface EvidenceTableProps {
  followups: FollowupRecord[];
  isLoading?: boolean;
}

export const EvidenceTable: React.FC<EvidenceTableProps> = ({ followups, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#D1D9E2] rounded-md p-6 text-center text-sm text-[#627D98]">
        Loading longitudinal milestone verifications...
      </div>
    );
  }

  if (followups.length === 0) {
    return (
      <div className="bg-white border border-[#D1D9E2] rounded-md p-8 text-center">
        <p className="text-sm font-semibold text-[#102A43]">No milestone records found</p>
        <p className="text-xs text-[#627D98] mt-1">Conduct 30-day or 90-day verification surveys.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D1D9E2] rounded-md overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F0F4F8] border-b border-[#D1D9E2] text-[#334E68] font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Milestone</th>
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Verification Date</th>
              <th className="py-3 px-4">Retention Status</th>
              <th className="py-3 px-4 text-right">Current Wage</th>
              <th className="py-3 px-4">Satisfaction</th>
              <th className="py-3 px-4">Skill Relevance</th>
              <th className="py-3 px-4">Survey Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {followups.map((item) => (
              <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 px-4">
                  <span className="bg-[#0B3B60] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {item.milestone.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-[#102A43]">
                  {item.learnerName || item.learnerId}
                </td>
                <td className="py-3 px-4 text-[#627D98]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.followupDate}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    {item.retentionStatus === 'retained' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                    )}
                    <StatusBadge status={item.retentionStatus} />
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#102A43] tabular-nums">
                  {item.currentSalary > 0 ? `₹${item.currentSalary.toLocaleString('en-IN')}` : '—'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 font-semibold text-[#102A43] tabular-nums">
                    <span>{item.jobSatisfactionScore}</span>
                    <span className="text-[#627D98] text-[10px]">/ 5</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 font-semibold text-[#102A43] tabular-nums">
                    <span>{item.skillRelevanceScore}</span>
                    <span className="text-[#627D98] text-[10px]">/ 5</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#627D98] max-w-xs truncate">
                  {item.notes || item.attritionReason || 'Verified active payslip via EPFO'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
