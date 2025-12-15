'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import type { Header } from '@/payload-types'

import { Logo as DynamicLogo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import UserMenu from '@/components/UserMenu'
import { CartButton } from '@/components/CartButton'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SearchBar } from '@/components/SearchBar'
import { CategorySidebarComponent } from '@/blocks/CategorySidebar/Component'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { data: session, status } = useSession()

  // Debug: ดูข้อมูล logo
  console.log('Header logo data in client:', data?.logo)

  // Extract current language from pathname
  const lang = pathname.split('/')[1] || 'en'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="w-full bg-blue-900 text-white" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container py-3">
        <div className="flex gap-4">
          {/* ส่วนซ้าย: โลโก้ + ปุ่มหมวดหมู่สินค้า */}
          <div className="flex flex-col gap-2">
            {/* โลโก้ */}
            <Link href={`/${lang}`} className="flex-shrink-0">
              <DynamicLogo
                loading="eager"
                priority="high"
                className="dark:invert-0"
                logo={data.logo}
              />
            </Link>
            
            {/* ปุ่มหมวดหมู่สินค้า + Dropdown */}
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-800 to-blue-700 px-4 py-2 flex items-center gap-2 cursor-pointer hover:from-blue-700 hover:to-blue-600 transition-colors w-64">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="font-semibold">หมวดหมู่สินค้า</span>
              </div>
              
              {/* Dropdown รายการหมวดหมู่ - ลอยทับเนื้อหาด้านล่าง */}
              <div className="absolute top-full left-0 z-50 mt-0">
                <CategorySidebarComponent lang={lang} title="" showOnDesktopOnly={true} />
              </div>
            </div>
          </div>

          {/* ส่วนขวา: Search + User Actions + Menu */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Top Row: Search + User Actions */}
            <div className="flex items-center justify-between gap-4">
              {/* ช่องค้นหา - กลาง */}
              <div className="hidden md:flex justify-center flex-1">
                <div className="w-full max-w-xl">
                  <SearchBar lang={lang} className="w-full" />
                </div>
              </div>

              {/* ส่วนผู้ใช้ - ขวา */}
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                {status === 'loading' ? (
                  <div className="w-8 h-8 animate-pulse bg-white/20 rounded-full"></div>
                ) : session?.user ? (
                  <div className="hidden md:flex items-center gap-3">
                    <span className="text-sm font-medium">เข้าสู่ระบบแล้ว</span>
                    <UserMenu />
                  </div>
                ) : (
                  <Link
                    href={`/${lang}/login`}
                    className="hidden md:flex items-center gap-2 text-sm hover:text-blue-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    เข้าสู่ระบบ
                  </Link>
                )}
                <CartButton />
              </div>
            </div>

            {/* แถวล่าง: เมนูนำทาง */}
            <div className="hidden lg:flex items-center justify-end">
              <HeaderNav data={data} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
