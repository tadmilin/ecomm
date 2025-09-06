'use client'

import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  text,
  className = '' 
}) => {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const displayText = text || 'Loading...'

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span className="text-sm text-gray-600">{displayText}</span>
    </div>
  )
}

export const PageLoading: React.FC = () => (
  <div className="pt-24 pb-24">
    <div className="container">
      <Loading size="lg" className="min-h-[400px]" />
    </div>
  </div>
)

export const CardLoading: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
    <div className="bg-gray-200 rounded h-4 mb-2"></div>
    <div className="bg-gray-200 rounded h-4 w-3/4"></div>
  </div>
)
