import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon | React.ReactNode | string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlightColor?: 'blue' | 'emerald' | 'amber' | 'rose' | 'default' | string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlightColor = 'default',
}) => {
  const borderColors: Record<string, string> = {
    blue: 'border-blue-200 bg-blue-50/20',
    emerald: 'border-emerald-200 bg-emerald-50/20',
    amber: 'border-amber-200 bg-amber-50/20',
    rose: 'border-rose-200 bg-rose-50/20',
    default: 'border-[#CBD5E1] bg-white',
  };

  const textColors: Record<string, string> = {
    blue: 'text-[#0369A1]',
    emerald: 'text-emerald-700',
    amber: 'text-amber-700',
    rose: 'text-rose-700',
    default: 'text-[#0F172A]',
  };

  const borderClass = borderColors[highlightColor] || 'border-slate-200 bg-white';
  const textClass = textColors[highlightColor] || 'text-[#0F172A]';

  // Render icon whether it is a LucideIcon component, an emoji string, or a React element
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <span className="text-base leading-none">{icon}</span>;
    }
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === 'function' || typeof icon === 'object') {
      const Component = icon as React.ComponentType<{ className?: string }>;
      return <Component className="w-4 h-4 text-[#64748B]" />;
    }
    return null;
  };

  return (
    <div className={`p-4 rounded-lg border ${borderClass} shadow-xs space-y-2`}>
      <div className="flex items-center justify-between text-xs text-[#64748B]">
        <span className="font-semibold text-[11px] uppercase tracking-wider">{title}</span>
        {renderIcon()}
      </div>

      <div className="flex items-baseline justify-between">
        <div className={`text-2xl font-black ${textClass} tracking-tight`}>
          {value}
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 text-[11px] font-bold ${
              trend.isPositive ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-[11px] text-[#64748B] leading-tight">{subtitle}</p>}
    </div>
  );
};
