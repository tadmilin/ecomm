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
      <div className="container py-6 flex justify-between items-center">
        <Link href={`/${lang}`}>
          <DynamicLogo
            loading="eager"
            priority="high"
            className="dark:invert-0"
            logo={data.logo as { url?: string; alt?: string; width?: number; height?: number }}
          />
        </Link>
        <div className="flex items-center gap-6">
          <HeaderNav data={data} lang={lang} />
          <LanguageSwitcher />
          <CartButton />
          {status === 'loading' ? (
            <div className="w-8 h-8 animate-pulse bg-white/20 rounded-full"></div>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                สวัสดี, {session.user.name || session.user.email}
              </span>
              <UserMenu />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
