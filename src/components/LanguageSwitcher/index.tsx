'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const languages = [
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'cn', label: '中文', flag: '🇨🇳' },
]

export function LanguageSwitcher() {
  const pathname = usePathname()

  // ดึง path segments
  const pathSegments = pathname.split('/').filter(Boolean)

  // หา lang code ปัจจุบัน
  const validLangCodes = ['th', 'en', 'cn']
  const currentLang = validLangCodes.includes(pathSegments[0]) ? pathSegments[0] : 'th'

  // สร้าง path ใหม่
  const getLanguagePath = (newLang: string) => {
    // ตรวจสอบว่า segment แรกเป็น lang code หรือไม่
    const firstSegmentIsLang = validLangCodes.includes(pathSegments[0])

    if (firstSegmentIsLang) {
      // ถ้า segment แรกเป็น lang → แทนที่ด้วย lang ใหม่
      const restPath = pathSegments.slice(1).join('/')
      return restPath ? `/${newLang}/${restPath}` : `/${newLang}`
    } else {
      // ถ้าไม่มี lang → เพิ่ม lang ไปข้างหน้า
      const fullPath = pathSegments.join('/')
      return fullPath ? `/${newLang}/${fullPath}` : `/${newLang}`
    }
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
        <span className="text-xl">
          {languages.find((l) => l.code === currentLang)?.flag || '🌐'}
        </span>
        <span className="text-sm font-medium hidden sm:inline">
          {languages.find((l) => l.code === currentLang)?.label}
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={getLanguagePath(lang.code)}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors ${
                currentLang === lang.code
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm">{lang.label}</span>
              {currentLang === lang.code && (
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
