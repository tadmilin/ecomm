'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import type { Header } from '@/payload-types'
import { useSidebar } from '@/providers/SidebarProvider'

import { Logo as DynamicLogo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import UserMenu from '@/components/UserMenu'
import { CartButton } from '@/components/CartButton'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SearchBar } from '@/components/SearchBar'
import { CategoryDropdown } from './CategoryDropdown'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { isSidebarOpen, setIsSidebarOpen, toggleSidebar } = useSidebar()
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { data: session, status } = useSession()

  // Debug: ดูข้อมูล logo
  console.log('Header logo data in client:', data?.logo)

  // Extract current language from pathname
  const lang = pathname.split('/')[1] || 'en'
  
  // Check if current page is home
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/home`

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  
  return (
    <>
      {/* แถบบนสุด - สีขาว */}
      <div className="w-full bg-white text-gray-900 border-b shadow-sm" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            {/* โลโก้ - ซ้าย */}
            <Link href={`/${lang}`} className="flex-shrink-0">
              <DynamicLogo
                loading="eager"
                priority="high"
                className=""
                logo={data.logo}
              />
            </Link>

            {/* ช่องค้นหา - กลาง (แสดงเฉพาะ desktop) */}
            <div className="hidden lg:flex justify-center flex-1">
              <div className="w-full max-w-xl">
                <SearchBar lang={lang} className="w-full" />
              </div>
            </div>

            {/* ส่วนผู้ใช้ - ขวา */}
            <div className="flex items-center gap-2 md:gap-4">
              <LanguageSwitcher />
              {status === 'loading' ? (
                <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full hidden md:block"></div>
              ) : session?.user ? (
                <div className="hidden md:flex items-center gap-3">
                  <UserMenu />
                </div>
              ) : null}
              <CartButton />
            </div>
          </div>
        </div>
      </div>

      {/* แถบเมนูด้านล่าง - สีน้ำเงิน */}
      <div className="w-full bg-blue-900 text-white relative">
        <div className="container py-2">
          <div className="flex items-center justify-between">
            {/* ปุ่มแฮมเบอเกอร์ซ้าย - แสดงเฉพาะบนมือถือ/แท็บเล็ต */}
            <div className="lg:hidden">
              <button
                onClick={toggleSidebar}
                className="p-2 text-white hover:bg-blue-800 rounded"
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

            {/* หมวดหมู่สินค้า - แสดงเฉพาะบน desktop */}
            <div className="hidden lg:block">
              {isHomePage ? (
                <Link
                  href={`/${lang}/categories`}
                  className="px-4 py-2 text-white hover:bg-blue-800 rounded flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
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
                  หมวดหมู่สินค้า
                </Link>
              ) : (
                <CategoryDropdown lang={lang} />
              )}
            </div>
            
            {/* เมนูอื่นๆ - ขวา */}
            <HeaderNav data={data} lang={lang} />
          </div>
        </div>
      </div>
    </>
  )
}
