import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none'

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-xs tracking-wide gap-2', // Exact 40px height
    lg: 'h-11 px-5 text-sm gap-2.5',
  }

  const variantClasses = {
    primary:
      'bg-[#0B3B60] text-white hover:bg-[#104C7E] active:bg-[#002541] focus-visible:outline-[#0B3B60] shadow-2xs',
    secondary:
      'bg-white text-[#0B3B60] border border-[#D1D9E2] hover:bg-[#E8F0F7] hover:border-[#0B3B60] focus-visible:outline-[#0B3B60]',
    outline:
      'bg-transparent text-[#1C2733] border border-[#D1D9E2] hover:bg-slate-50 hover:text-[#0B3B60] focus-visible:outline-[#0B3B60]',
    ghost:
      'bg-transparent text-[#4A5568] hover:bg-slate-100 hover:text-[#1C2733] focus-visible:outline-[#0B3B60]',
    destructive:
      'bg-white text-[#C5221F] border border-[#F5A9A4] hover:bg-[#FCE8E6] focus-visible:outline-[#C5221F]',
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-3.5 w-3.5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  )
}
