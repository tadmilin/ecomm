'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const MobileNav: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <nav className="container py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
