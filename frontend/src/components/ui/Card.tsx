import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'subtle' | 'warning' | 'positive'
  noPadding?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  noPadding = false,
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white border-[#D1D9E2]',
    subtle: 'bg-[#F4F6F9] border-[#D1D9E2]',
    warning: 'bg-[#FFF3E0] border-[#FFCC80]',
    positive: 'bg-[#E6F4EA] border-[#A8DAB5]',
  }

  return (
    <div
      className={`rounded-md border ${variantClasses[variant]} ${
        noPadding ? '' : 'p-5'
      } shadow-2xs ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E2E8F0] ${className}`} {...props}>
    {children}
  </div>
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`text-sm font-bold text-[#1C2733] tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-xs text-[#718096] mt-0.5 ${className}`} {...props}>
    {children}
  </p>
)
