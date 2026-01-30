'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType; lang: string }> = ({ data, lang }) => {
  const navItems = data?.navItems || []
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* ปุ่มแฮมเบอเกอร์ขวา - แสดงเฉพาะบนมือถือ/แท็บเล็ต */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white hover:bg-blue-800 rounded"
          aria-label="เปิดเมนู"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* เมนูสำหรับ desktop */}
      <nav className="hidden lg:flex gap-6 items-center text-base font-medium">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} lang={lang} appearance="inline" />
        })}
      </nav>

      {/* เมนูแบบ dropdown สำหรับมือถือ */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full right-0 mt-0 w-64 bg-blue-900 shadow-lg z-50 border-t-2 border-blue-800">
          <nav className="flex flex-col py-2">
            {navItems.map(({ link }, i) => (
              <div key={i} className="border-b border-blue-800 last:border-b-0">
                <div onClick={() => setIsMenuOpen(false)} className="block">
                  <CMSLink {...link} lang={lang} appearance="inline" className="block px-4 py-3 hover:bg-blue-800 transition-colors" />
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
