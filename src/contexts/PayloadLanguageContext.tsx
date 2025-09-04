'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface Language {
  id: string
  code: string
  name: string
  nativeName: string
  isActive: boolean
  isDefault: boolean
  direction: 'ltr' | 'rtl'
  dateFormat: string
  timeFormat: '12h' | '24h'
  currency: string
  sortOrder: number
  flag?: string
}

interface Translation {
  key: string
  value: string
  namespace: string
  language: string
  isActive: boolean
}

interface PayloadLanguageContextType {
  currentLanguage: string
  setCurrentLanguage: (lang: string) => void
  availableLanguages: Language[]
  translations: Record<string, string>
  t: (key: string, namespace?: string, params?: Record<string, string>) => string
  isLoading: boolean
  error: string | null
}

const PayloadLanguageContext = createContext<PayloadLanguageContextType | null>(null)

interface PayloadLanguageProviderProps {
  children: ReactNode
  initialLanguage?: string
}

export const PayloadLanguageProvider: React.FC<PayloadLanguageProviderProps> = ({ 
  children, 
  initialLanguage = 'th' 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([])
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const pathname = usePathname()
  const router = useRouter()

  // Extract language from pathname
  useEffect(() => {
    const segments = pathname.split('/')
    if (segments.length > 1 && segments[1]) {
      const langFromPath = segments[1]
      if (langFromPath !== currentLanguage) {
        setCurrentLanguage(langFromPath)
      }
    }
  }, [pathname, currentLanguage])

  // Load available languages
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/languages')
        if (!response.ok) {
          throw new Error('Failed to fetch languages')
        }
        
        const data = await response.json()
        if (data.success) {
          setAvailableLanguages(data.languages)
          
          // Set default language if not set
          const defaultLang = data.languages.find((lang: Language) => lang.isDefault)
          if (defaultLang && currentLanguage === 'th') {
            setCurrentLanguage(defaultLang.code)
          }
        } else {
          throw new Error(data.error || 'Failed to load languages')
        }
      } catch (err) {
        console.error('Error loading languages:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    loadLanguages()
  }, [])

  // Load translations for current language
  useEffect(() => {
    const loadTranslations = async () => {
      if (!currentLanguage) return
      
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`/api/translations?language=${currentLanguage}`)
        if (!response.ok) {
          throw new Error('Failed to fetch translations')
        }
        
        const data = await response.json()
        if (data.success) {
          setTranslations(data.translations)
        } else {
          throw new Error(data.error || 'Failed to load translations')
        }
      } catch (err) {
        console.error('Error loading translations:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [currentLanguage])

  // Translation function
  const t = (key: string, namespace = 'common', params?: Record<string, string>): string => {
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

  // Change language function
  const handleLanguageChange = (newLang: string) => {
    setCurrentLanguage(newLang)
    
    // Update URL
    const segments = pathname.split('/')
    segments[1] = newLang
    const newPath = segments.join('/')
    router.push(newPath)
  }

  const contextValue: PayloadLanguageContextType = {
    currentLanguage,
    setCurrentLanguage: handleLanguageChange,
    availableLanguages,
    translations,
    t,
    isLoading,
    error,
  }

  return (
    <PayloadLanguageContext.Provider value={contextValue}>
      {children}
    </PayloadLanguageContext.Provider>
  )
}

// Hook to use the context
export const usePayloadLanguage = (): PayloadLanguageContextType => {
  const context = useContext(PayloadLanguageContext)
  if (!context) {
    throw new Error('usePayloadLanguage must be used within a PayloadLanguageProvider')
  }
  return context
}

export default PayloadLanguageContext
