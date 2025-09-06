'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './button'

interface ErrorProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export const Error: React.FC<ErrorProps> = ({ 
  title,
  message,
  onRetry,
  className = '' 
}) => {
  
  const displayTitle = title || 'Error'
  const displayMessage = message || 'An error occurred'

  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-8 ${className}`}>
      <AlertCircle className="w-12 h-12 text-red-500" />
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {displayTitle}
        </h2>
        <p className="text-gray-600 mb-4">
          {displayMessage}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}
      </div>
    </div>
  )
}

export const PageError: React.FC<ErrorProps> = (props) => (
  <div className="pt-24 pb-24">
    <div className="container">
      <Error {...props} className="min-h-[400px]" />
    </div>
  </div>
)

export const NotFound: React.FC = () => {
  
  return (
    <PageError
      title="Not Found"
      message="The page you are looking for does not exist"
    />
  )
}
