'use client'

import React, { useMemo } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { X, User, LogOut, Settings, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import type { Header as HeaderType } from '@/payload-types'

interface MobileRightMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: HeaderType['navItems']
  lang: string
}

export const MobileRightMenu: React.FC<MobileRightMenuProps> = ({ 
  isOpen, 
  onClose, 
  navItems,
  lang 
}) => {
  const { data: session, status } = useSession()

  // Memoize unique navigation items to prevent duplicates
  const uniqueNavItems = useMemo(() => {
    if (!navItems || navItems.length === 0) return []
    
    const seen = new Set<string>()
    return navItems.filter(({ link }) => {
      const identifier = `${link.type}-${link.label}-${link.url || link.reference?.value}`
      if (seen.has(identifier)) return false
      seen.add(identifier)
      return true
    })
  }, [navItems])

  const handleLinkClick = () => {
    onClose()
  }
  
  const getNavLinkHref = (link: any) => {
    if (link.type === 'reference' && link.reference?.value) {
      const ref = link.reference.value
      if (typeof ref === 'string') return `/${lang}/${ref}`
      if (ref.slug) return `/${lang}/${ref.slug}`
    }
    return link.url || '#'
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <h2 className="text-lg font-bold">เมนู</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            aria-label="ปิดเมนู"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* User Section - แสดงเฉพาะเมื่อ login แล้ว */}
          {status === 'loading' ? (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
              </div>
            </div>
          ) : session?.user ? (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {session.user.name || 'ผู้ใช้'}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{session.user.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>จัดการโปรไฟล์</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                {(session.user as { role?: string })?.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={handleLinkClick}
                    className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>แผงควบคุมแอดมิน</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                )}

                <button
                  onClick={() => {
                    signOut()
                    onClose()
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    <span>ออกจากระบบ</span>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          {/* Navigation Items */}
          {uniqueNavItems.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  เมนูหลัก
                </h3>
              </div>
              <nav>
                {uniqueNavItems.map(({ link }, index) => {
                  const href = getNavLinkHref(link)
                  const isExternal = link.type === 'custom' && link.newTab
                  
                  return (
                    <Link
                      key={`nav-${index}-${link.label}`}
                      href={href}
                      onClick={handleLinkClick}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors border-b border-gray-100 last:border-b-0 group"
                    >
                      <span className="font-medium">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-center text-gray-500">
            © 2026 E-Commerce Store
          </div>
        </div>
      </div>
    </>
  )
}
