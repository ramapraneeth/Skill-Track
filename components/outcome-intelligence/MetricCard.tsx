import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive,
  className,
}) => {
  return (
    <div
      className={clsx(
        'bg-white border border-[#D1D9E2] rounded-md p-4 shadow-sm flex flex-col justify-between',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#486581] uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded bg-[#F0F4F8] flex items-center justify-center text-[#0B3B60]">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2">
        <div className="text-2xl font-bold text-[#102A43] tabular-nums tracking-tight">{value}</div>
        {(subtitle || trend) && (
          <div className="mt-1 flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={clsx(
                  'font-semibold tabular-nums',
                  trendPositive ? 'text-emerald-700' : 'text-rose-700'
                )}
              >
                {trend}
              </span>
            )}
            {subtitle && <span className="text-[#627D98] truncate">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
