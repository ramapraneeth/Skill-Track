import React from 'react'

export interface StatusBadgeProps {
  status:
    | 'enrolled'
    | 'completed'
    | 'certified'
    | 'seeking_job'
    | 'placed'
    | 'self_employed'
    | 'apprenticeship'
    | 'attrited'
    | 'active'
    | 'at_risk'
    | 'pending'
    | 'in_progress'
    | 'recommended'
    | 'assigned'
    | 'cancelled'
  label?: string
  size?: 'sm' | 'md'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const badgeConfig: Record<string, { bg: string; text: string; dot: string; defaultLabel: string }> = {
    enrolled: { bg: 'bg-[#E8F0F7] border-[#B4CFE5]', text: 'text-[#0B3B60]', dot: 'bg-[#0B3B60]', defaultLabel: 'Enrolled' },
    completed: { bg: 'bg-[#E6F5F6] border-[#77D4E5]', text: 'text-[#006876]', dot: 'bg-[#006876]', defaultLabel: 'Completed' },
    certified: { bg: 'bg-[#E6F4EA] border-[#A8DAB5]', text: 'text-[#137333]', dot: 'bg-[#137333]', defaultLabel: 'Certified' },
    seeking_job: { bg: 'bg-[#FFF3E0] border-[#FFCC80]', text: 'text-[#E65100]', dot: 'bg-[#E65100]', defaultLabel: 'Seeking Job' },
    placed: { bg: 'bg-[#E6F4EA] border-[#A8DAB5]', text: 'text-[#137333]', dot: 'bg-[#137333]', defaultLabel: 'Placed' },
    self_employed: { bg: 'bg-[#E6F5F6] border-[#77D4E5]', text: 'text-[#006876]', dot: 'bg-[#006876]', defaultLabel: 'Self-Employed' },
    apprenticeship: { bg: 'bg-[#E8F0F7] border-[#B4CFE5]', text: 'text-[#0B3B60]', dot: 'bg-[#0B3B60]', defaultLabel: 'Apprenticeship' },
    attrited: { bg: 'bg-[#FCE8E6] border-[#F5A9A4]', text: 'text-[#C5221F]', dot: 'bg-[#C5221F]', defaultLabel: 'Attrited' },
    active: { bg: 'bg-[#E6F4EA] border-[#A8DAB5]', text: 'text-[#137333]', dot: 'bg-[#137333]', defaultLabel: 'Active' },
    at_risk: { bg: 'bg-[#FCE8E6] border-[#F5A9A4]', text: 'text-[#C5221F]', dot: 'bg-[#C5221F]', defaultLabel: 'At Risk' },
    pending: { bg: 'bg-slate-100 border-[#D1D9E2]', text: 'text-[#718096]', dot: 'bg-slate-400', defaultLabel: 'Pending' },
    in_progress: { bg: 'bg-[#FFF3E0] border-[#FFCC80]', text: 'text-[#E65100]', dot: 'bg-[#E65100]', defaultLabel: 'In Progress' },
    recommended: { bg: 'bg-[#E8F0F7] border-[#B4CFE5]', text: 'text-[#0B3B60]', dot: 'bg-[#0B3B60]', defaultLabel: 'Recommended' },
    assigned: { bg: 'bg-[#E8F0F7] border-[#B4CFE5]', text: 'text-[#0B3B60]', dot: 'bg-[#0B3B60]', defaultLabel: 'Assigned' },
  }

  const config = badgeConfig[status] || {
    bg: 'bg-slate-100 border-[#D1D9E2]',
    text: 'text-[#4A5568]',
    dot: 'bg-slate-400',
    defaultLabel: status,
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[11px]'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border font-bold uppercase tracking-wider ${config.bg} ${config.text} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {label || config.defaultLabel}
    </span>
  )
}
