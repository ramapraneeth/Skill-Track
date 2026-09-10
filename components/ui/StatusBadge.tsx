import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-300';

  if (
    normalized === 'verified' ||
    normalized === 'approved' ||
    normalized === 'active' ||
    normalized === 'completed' ||
    normalized === 'passed'
  ) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (
    normalized === 'pending' ||
    normalized === 'pending approval' ||
    normalized === 'in progress' ||
    normalized === 'under inspection' ||
    normalized === 'upcoming'
  ) {
    styles = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (
    normalized === 'rejected' ||
    normalized === 'suspended' ||
    normalized === 'failed' ||
    normalized === 'critical'
  ) {
    styles = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (normalized === 'draft' || normalized === 'offline') {
    styles = 'bg-zinc-100 text-zinc-700 border-zinc-200';
  }

  const sizeClass = size === 'sm' ? 'text-[9px] px-1.5 py-0.2' : 'text-[10px] px-2 py-0.5';

  return (
    <span className={`inline-flex items-center font-bold uppercase rounded border ${sizeClass} ${styles} tracking-wider whitespace-nowrap`}>
      {status}
    </span>
  );
};
