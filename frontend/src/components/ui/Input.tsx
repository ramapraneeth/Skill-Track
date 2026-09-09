import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#1C2733]"
          >
            {label} {required && <span className="text-[#C5221F]">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full h-10 px-3 text-xs bg-white text-[#1C2733] border rounded transition-colors outline-none ${
            error
              ? 'border-[#C5221F] focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F]'
              : 'border-[#D1D9E2] focus:border-[#0B3B60] focus:ring-1 focus:ring-[#0B3B60]'
          } ${className}`}
          required={required}
          {...props}
        />
        {error && <p className="text-[11px] text-[#C5221F] font-medium">{error}</p>}
        {!error && helperText && <p className="text-[11px] text-[#718096]">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
