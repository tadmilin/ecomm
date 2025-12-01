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

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { data: session, status } = useSession()

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
        {/* Top Row: Logo + Search + User Actions */}
        <div className="flex items-center justify-between gap-4 mb-3">
          {/* Logo - Left */}
          <Link href={`/${lang}`} className="flex-shrink-0">
            <DynamicLogo
              loading="eager"
              priority="high"
              className="dark:invert-0"
              logo={data.logo as { url?: string; alt?: string; width?: number; height?: number }}
            />
          </Link>

          {/* Search Bar - Center (Medium size) */}
          <div className="hidden md:block flex-1 max-w-md">
            <SearchBar lang={lang} className="w-full" />
          </div>

          {/* User Actions - Right */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-pulse bg-white/20 rounded-full"></div>
            ) : session?.user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm font-medium">
                  {lang === 'th' && 'เข้าสู่ระบบ'}
                  {lang === 'en' && 'Login'}
                  {lang === 'cn' && '登录'}
                </span>
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
                {lang === 'th' && 'เข้าสู่ระบบ'}
                {lang === 'en' && 'Login'}
                {lang === 'cn' && '登录'}
              </Link>
            )}
            <CartButton />
          </div>
        </div>

        {/* Bottom Row: Menu Navigation */}
        <div className="hidden lg:flex items-center justify-center">
          <HeaderNav data={data} lang={lang} />
        </div>
      </div>
    </header>
  )
}
