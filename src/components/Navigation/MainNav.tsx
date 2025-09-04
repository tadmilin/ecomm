'use client'

import React from 'react'
import Link from 'next/link'
import { usePayloadLanguage } from '@/contexts/PayloadLanguageContext'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const MainNav: React.FC = () => {
  const { t, currentLanguage } = usePayloadLanguage()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: t('layout.nav.home'), href: `/${currentLanguage}` },
    { label: t('layout.nav.posts'), href: `/${currentLanguage}/posts` },
    { label: t('layout.nav.search'), href: `/${currentLanguage}/search` },
    { label: t('layout.nav.about'), href: `/${currentLanguage}/about` },
  ]

  const isActive = (href: string) => {
    if (href === `/${currentLanguage}`) {
      return pathname === `/${currentLanguage}` || pathname === `/${currentLanguage}/`
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            isActive(item.href)
              ? 'text-primary'
              : 'text-muted-foreground'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
