'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const MainNav: React.FC = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Search', href: '/search' },
    { label: 'About', href: '/about' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/'
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
