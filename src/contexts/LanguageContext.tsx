'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Language {
  id: string
  code: string
  name: string
  nativeName: string
  flag?: string
  direction: 'ltr' | 'rtl'
  dateFormat: string
  timeFormat: '12h' | '24h'
  currency: string
  isActive: boolean
  isDefault: boolean
}

interface LanguageContextType {
  currentLanguage: Language
  availableLanguages: Language[]
  setLanguage: (lang: Language) => void
  t: (key: string, namespace?: string, params?: Record<string, string>) => string
  formatDate: (date: Date) => string
  formatCurrency: (amount: number) => string
  isLoading: boolean
  error: string | null
}

// Language constants for better maintainability
const LANGUAGE_CODES = {
  THAI: 'th',
  ENGLISH: 'en',
  JAPANESE: 'ja',
} as const

const CURRENCIES = {
  THB: 'THB',
  USD: 'USD',
  JPY: 'JPY',
} as const

const DEFAULT_LANGUAGE: Language = {
  id: 'th',
  code: LANGUAGE_CODES.THAI,
  name: 'Thai',
  nativeName: 'ไทย',
  direction: 'ltr',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '24h',
  currency: CURRENCIES.THB,
  isActive: true,
  isDefault: true,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([])
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // โหลดภาษาที่รองรับ
  useEffect(() => {
    loadLanguages()
  }, [])

  // โหลดคำแปลเมื่อเปลี่ยนภาษา
  useEffect(() => {
    if (currentLanguage.code) {
      loadTranslations(currentLanguage.code)
    }
  }, [currentLanguage.code])

  const loadLanguages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/languages')
      if (response.ok) {
        const data = await response.json()
        setAvailableLanguages(data.languages)
        
        // หาภาษาเริ่มต้น
        const defaultLang = data.languages.find((lang: Language) => lang.isDefault)
        if (defaultLang) {
          setCurrentLanguage(defaultLang)
        }
      }
    } catch (error) {
      console.error('Error loading languages:', error)
      setError('ไม่สามารถโหลดภาษาที่รองรับได้')
    } finally {
      setIsLoading(false)
    }
  }

  const loadTranslations = async (langCode: string) => {
    try {
      const response = await fetch(`/api/translations?language=${langCode}`)
      if (response.ok) {
        const data = await response.json()
        setTranslations(data.translations)
      }
    } catch (error) {
      console.error('Error loading translations:', error)
      setError('ไม่สามารถโหลดคำแปลได้')
    }
  }

  const t = (key: string, namespace: string = 'common', params?: Record<string, any>): string => {
    const translationKey = `${namespace}.${key}`
    let translation = translations[translationKey] || key
    
    // Replace parameters if provided
    if (params) {
      Object.keys(params).forEach(paramKey => {
        const regex = new RegExp(`{${paramKey}}`, 'g')
        translation = translation.replace(regex, params[paramKey])
      })
    }
    
    return translation
  }

    const formatDate = (date: Date): string => {
    try {
      if (currentLanguage.code === LANGUAGE_CODES.THAI) {
        return date.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      } else if (currentLanguage.code === LANGUAGE_CODES.ENGLISH) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      } else if (currentLanguage.code === LANGUAGE_CODES.JAPANESE) {
        return date.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }
      return date.toLocaleDateString()
    } catch (error) {
      return date.toLocaleDateString()
    }
  }

    const formatCurrency = (amount: number): string => {
    try {
      const currency = currentLanguage.currency
      if (currency === CURRENCIES.THB) {
        return `฿${amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}`
      } else if (currency === CURRENCIES.USD) {
        return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
      } else if (currency === CURRENCIES.JPY) {
        return `¥${amount.toLocaleString('ja-JP', { minimumFractionDigits: 0 })}`
      }
      return amount.toLocaleString()
    } catch (error) {
      return amount.toLocaleString()
    }
  }

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    
    // บันทึกการตั้งค่าใน localStorage
    localStorage.setItem('preferredLanguage', JSON.stringify(lang))
    
    // อัปเดต HTML lang attribute
    document.documentElement.lang = lang.code
    document.documentElement.dir = lang.direction
    
    // อัปเดต meta tags
    updateMetaTags(lang)
  }

  const updateMetaTags = (lang: Language) => {
    // อัปเดต meta language
    let metaLang = document.querySelector('meta[name="language"]')
    if (!metaLang) {
      metaLang = document.createElement('meta')
      metaLang.setAttribute('name', 'language')
      document.head.appendChild(metaLang)
    }
    metaLang.setAttribute('content', lang.code)
    
         // อัปเดต meta charset (สำหรับภาษาญี่ปุ่น)
     if (lang.code === LANGUAGE_CODES.JAPANESE) {
       const metaCharset = document.querySelector('meta[charset]')
       if (metaCharset) {
         metaCharset.setAttribute('charset', 'UTF-8')
       }
     }
  }

  useEffect(() => {
    // โหลดการตั้งค่าภาษาจาก localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage) {
      try {
        const lang = JSON.parse(savedLanguage)
        setCurrentLanguage(lang)
        updateMetaTags(lang)
      } catch (error) {
        console.error('Error parsing saved language:', error)
      }
    }
  }, [])

  const value: LanguageContextType = {
    currentLanguage,
    availableLanguages,
    setLanguage,
    t,
    formatDate,
    formatCurrency,
    isLoading,
    error,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
