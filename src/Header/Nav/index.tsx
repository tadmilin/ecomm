'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ 
  data: HeaderType
  lang: string
  onMobileMenuToggle?: () => void
}> = ({ data, lang, onMobileMenuToggle }) => {
  const navItems = data?.navItems || []

  return (
    <>
      {/* ปุ่มแฮมเบอเกอร์ขวา - แสดงเฉพาะบนมือถือ/แท็บเล็ต */}
      <div className="lg:hidden">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 text-white hover:bg-blue-800 rounded transition-colors"
          aria-label="เปิดเมนู"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* เมนูสำหรับ desktop */}
      <nav className="hidden lg:flex gap-6 items-center text-base font-medium">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} lang={lang} appearance="inline" />
        })}
      </nav>
    </>
  )
}
