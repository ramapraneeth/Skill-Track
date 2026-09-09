import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const normalized = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (['verified', 'retained', 'active', 'completed', 'high competency', 'low'].includes(normalized)) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (['in_progress', 'assigned', 'moderate competency', 'medium'].includes(normalized)) {
    styles = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (['attrited', 'resigned', 'terminated', 'critical deficit', 'high'].includes(normalized)) {
    styles = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (['seeking_job', 'significant gap'].includes(normalized)) {
    styles = 'bg-blue-50 text-blue-800 border-blue-200';
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border',
        styles,
        className
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};
