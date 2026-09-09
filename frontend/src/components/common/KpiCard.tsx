import React from 'react'
import { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    isPositive: boolean
    label?: string
  }
  icon: LucideIcon
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'indigo'
  onClick?: () => void
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  variant = 'default',
  onClick,
}) => {
  const iconStyles = {
    default: 'bg-[#E8F0F7] text-[#0B3B60]',
    success: 'bg-[#E6F4EA] text-[#059669]',
    warning: 'bg-[#FFF3E0] text-[#E65100]',
    danger: 'bg-[#FCE8E6] text-[#C5221F]',
    indigo: 'bg-[#E8F0F7] text-[#0B3B60]',
  }

  return (
    <div
      onClick={onClick}
      className={`relative rounded-md border border-[#D1D9E2] bg-white p-5 shadow-2xs transition-all ${
        onClick ? 'cursor-pointer hover:border-[#0B3B60] hover:shadow-xs' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold tracking-wider text-[#718096] uppercase">{title}</p>
          <p className="text-2xl font-black font-mono tabular-nums text-[#002541] tracking-tight">{value}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#D1D9E2]/60 ${iconStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center gap-2 pt-2 border-t border-[#E2E8F0] text-xs">
          {trend && (
            <span
              className={`font-bold flex items-center gap-0.5 ${
                trend.isPositive ? 'text-[#059669]' : 'text-[#C5221F]'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
          {trend?.label && <span className="text-[#718096]">{trend.label}</span>}
          {subtitle && !trend && <span className="text-[#718096]">{subtitle}</span>}
        </div>
      )}
    </div>
  )
}
