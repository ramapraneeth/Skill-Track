import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100 or relative to max
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'emerald' | 'blue' | 'amber' | 'rose' | 'default' | (string & {});
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = true,
  color = 'default',
  height = 'md',
}) => {
  const safeValue = max ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : Math.min(100, Math.max(0, Math.round(value)));

  const isPredefinedColor = color in {
    emerald: true,
    blue: true,
    amber: true,
    rose: true,
    default: true,
  };

  const colorStyles: Record<string, string> = {
    emerald: 'bg-emerald-500',
    blue: 'bg-[#0B3B60]',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    default: safeValue >= 80 ? 'bg-emerald-500' : safeValue >= 60 ? 'bg-amber-500' : 'bg-rose-500',
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const barClass = isPredefinedColor ? colorStyles[color] : '';
  const barCustomStyle: React.CSSProperties = {
    width: `${safeValue}%`,
    ...(isPredefinedColor ? {} : { backgroundColor: color }),
  };

  return (
    <div className="space-y-1 w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-semibold text-[#1E293B]">{label}</span>}
          {showPercentage && <span className="font-mono font-bold text-[#0B3B60]">{safeValue}%</span>}
        </div>
      )}
      <div className={`w-full bg-[#E2E8F0] ${heightStyles[height]} rounded-full overflow-hidden`}>
        <div
          className={`${barClass} h-full rounded-full transition-all duration-300`}
          style={barCustomStyle}
        />
      </div>
    </div>
  );
};

