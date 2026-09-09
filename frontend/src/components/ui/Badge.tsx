import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'risk' | 'info' | 'outline'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 font-semibold',
  }

  const variantClasses = {
    default: 'bg-[#F4F6F9] text-[#4A5568] border border-[#D1D9E2]',
    success: 'bg-[#E6F4EA] text-[#137333] border border-[#A8DAB5]',
    warning: 'bg-[#FFF3E0] text-[#E65100] border border-[#FFCC80]',
    risk: 'bg-[#FCE8E6] text-[#C5221F] border border-[#F5A9A4]',
    info: 'bg-[#E8F0F7] text-[#0B3B60] border border-[#B4CFE5]',
    outline: 'bg-white text-[#1C2733] border border-[#D1D9E2]',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
