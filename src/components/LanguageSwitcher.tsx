'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Globe, ChevronDown, Check } from 'lucide-react'

// Language constants for consistency
const LANGUAGE_CODES = {
  THAI: 'th',
  ENGLISH: 'en',
  JAPANESE: 'ja',
} as const

const FLAG_EMOJIS = {
  [LANGUAGE_CODES.THAI]: '🇹🇭',
  [LANGUAGE_CODES.ENGLISH]: '🇺🇸',
  [LANGUAGE_CODES.JAPANESE]: '🇯🇵',
} as const

export default function LanguageSwitcher() {
  const { currentLanguage, availableLanguages, setLanguage, isLoading } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 animate-pulse">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
      </div>
    )
  }

  const handleLanguageChange = (language: any) => {
    setLanguage(language)
    setIsOpen(false)
  }

  const getFlagEmoji = (code: string) => {
    return FLAG_EMOJIS[code as keyof typeof FLAG_EMOJIS] || '🌐'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
        aria-label="เปลี่ยนภาษา"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {getFlagEmoji(currentLanguage.code)} {currentLanguage.nativeName}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">เลือกภาษา</p>
          </div>
          
          <div className="py-1">
            {availableLanguages
              .filter(lang => lang.isActive)
              .map((language) => (
                <button
                  key={language.id}
                  onClick={() => handleLanguageChange(language)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                    currentLanguage.code === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getFlagEmoji(language.code)}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{language.nativeName}</span>
                      <span className="text-xs text-gray-500">{language.name}</span>
                    </div>
                  </div>
                  
                  {currentLanguage.code === language.code && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Component สำหรับแสดงใน Header
export function HeaderLanguageSwitcher() {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (language: any) => {
    setLanguage(language)
    setIsOpen(false)
  }

  const getFlagEmoji = (code: string) => {
    return FLAG_EMOJIS[code as keyof typeof FLAG_EMOJIS] || '🌐'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="เปลี่ยนภาษา"
      >
        <span className="text-lg">{getFlagEmoji(currentLanguage.code)}</span>
        <span className="text-sm text-gray-600 hidden sm:block">
          {currentLanguage.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {availableLanguages
            .filter(lang => lang.isActive)
            .map((language) => (
              <button
                key={language.id}
                onClick={() => handleLanguageChange(language)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3 ${
                  currentLanguage.code === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{getFlagEmoji(language.code)}</span>
                <span>{language.nativeName}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
