'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const MainNav: React.FC = () => {
  const { t } = useLanguage()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: t('layout.nav.home'), href: '/' },
    { label: t('layout.nav.posts'), href: '/posts' },
    { label: t('layout.nav.search'), href: '/search' },
    { label: t('layout.nav.about'), href: '/about' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
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
