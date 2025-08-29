'use client'

import { useLanguage } from '@/contexts/LanguageContext'
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
  const { t } = useLanguage()
  
  const displayTitle = title || t('common.error')
  const displayMessage = message || t('common.error_message')

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
            {t('common.retry')}
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
  const { t } = useLanguage()
  
  return (
    <PageError
      title={t('common.not_found')}
      message={t('common.page_not_found')}
    />
  )
}
