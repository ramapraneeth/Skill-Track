import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Failed to load data',
  message = 'An error occurred while communicating with the backend API service.',
  onRetry,
}) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center my-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-red-900 mb-1">{title}</h3>
      <p className="text-sm text-red-700 max-w-md mx-auto mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Request
        </button>
      )}
    </div>
  )
}
