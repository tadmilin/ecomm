'use client'
import { usePayloadLanguage } from '@/contexts/PayloadLanguageContext'
import { useState, useRef, useEffect } from 'react'

interface PayloadLanguageSwitcherProps {
  className?: string
  showFlags?: boolean
  showNativeNames?: boolean
  variant?: 'dropdown' | 'buttons' | 'select'
}

export const PayloadLanguageSwitcher: React.FC<PayloadLanguageSwitcherProps> = ({
  className = '',
  showFlags = true,
  showNativeNames = true,
  variant = 'dropdown'
}) => {
  const { 
    currentLanguage, 
    setCurrentLanguage, 
    availableLanguages, 
    isLoading, 
    error 
  } = usePayloadLanguage()
  
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (isLoading) {
    return (
      <div className={`language-switcher loading ${className}`}>
        <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
      </div>
    )
  }

  if (error) {
    console.error('Language Switcher Error:', error)
    return null
  }

  if (availableLanguages.length === 0) {
    return null
  }

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLanguage(langCode)
    setIsOpen(false)
  }

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={`language-switcher dropdown ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {showFlags && currentLang?.flag && (
            <img 
              src={currentLang.flag} 
              alt={currentLang.nativeName}
              className="w-4 h-4 rounded-sm"
            />
          )}
          <span className="truncate">
            {showNativeNames ? currentLang?.nativeName : currentLang?.name}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1">
              {availableLanguages
                .filter(lang => lang.isActive)
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                      lang.code === currentLanguage ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                    }`}
                  >
                    {showFlags && lang.flag && (
                      <img 
                        src={lang.flag} 
                        alt={lang.nativeName}
                        className="w-4 h-4 rounded-sm"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {showNativeNames ? lang.nativeName : lang.name}
                      </span>
                      {showNativeNames && (
                        <span className="text-xs text-gray-500">{lang.name}</span>
                      )}
                    </div>
                    {lang.isDefault && (
                      <span className="ml-auto text-xs text-gray-400">Default</span>
                    )}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Buttons variant
  if (variant === 'buttons') {
    return (
      <div className={`language-switcher buttons ${className}`}>
        <div className="flex space-x-1">
          {availableLanguages
            .filter(lang => lang.isActive)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-md transition-colors ${
                  lang.code === currentLanguage
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showFlags && lang.flag && (
                  <img 
                    src={lang.flag} 
                    alt={lang.nativeName}
                    className="w-4 h-4 rounded-sm"
                  />
                )}
                <span className="truncate">
                  {showNativeNames ? lang.nativeName : lang.name}
                </span>
              </button>
            ))}
        </div>
      </div>
    )
  }

  // Select variant
  if (variant === 'select') {
    return (
      <div className={`language-switcher select ${className}`}>
        <select
          value={currentLanguage}
          onChange={(e) => handleLanguageSelect(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {availableLanguages
            .filter(lang => lang.isActive)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((lang) => (
              <option key={lang.code} value={lang.code}>
                {showNativeNames ? lang.nativeName : lang.name}
              </option>
            ))}
        </select>
      </div>
    )
  }

  return null
}

export default PayloadLanguageSwitcher
