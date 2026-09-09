import React from 'react'
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react'

interface RiskIndicatorProps {
  riskLevel: 'Low' | 'Medium' | 'High'
  score?: number
  showIcon?: boolean
  showMeter?: boolean
  label?: string
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  riskLevel,
  score,
  showIcon = true,
  showMeter = false,
  label,
}) => {
  const configs = {
    Low: {
      bg: 'bg-[#E6F4EA] border-[#A8DAB5] text-[#137333]',
      meter: 'bg-[#059669]',
      width: '25%',
      Icon: CheckCircle,
      iconColor: 'text-[#137333]',
      defaultLabel: 'Low Risk',
    },
    Medium: {
      bg: 'bg-[#FFF3E0] border-[#FFCC80] text-[#E65100]',
      meter: 'bg-[#E65100]',
      width: '60%',
      Icon: AlertTriangle,
      iconColor: 'text-[#E65100]',
      defaultLabel: 'Medium Risk',
    },
    High: {
      bg: 'bg-[#FCE8E6] border-[#F5A9A4] text-[#C5221F]',
      meter: 'bg-[#C5221F]',
      width: '90%',
      Icon: ShieldAlert,
      iconColor: 'text-[#C5221F]',
      defaultLabel: 'High Risk',
    },
  }

  const config = configs[riskLevel] || configs.Low
  const IconComponent = config.Icon

  return (
    <div className="inline-flex flex-col gap-1 select-none">
      <div
        className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${config.bg}`}
      >
        {showIcon && <IconComponent className={`h-3.5 w-3.5 ${config.iconColor}`} />}
        <span>{label || config.defaultLabel}</span>
        {score !== undefined && (
          <span className="opacity-90 font-mono font-bold tabular-nums">
            ({Math.round(score * 100)}%)
          </span>
        )}
      </div>

      {showMeter && (
        <div className="h-1.5 w-20 overflow-hidden rounded bg-[#E2E8F0]">
          <div className={`h-full rounded ${config.meter}`} style={{ width: config.width }} />
        </div>
      )}
    </div>
  )
}
