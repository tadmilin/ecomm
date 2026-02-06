'use client'

import React from 'react'
import { HomeCategorySidebar } from '@/components/HomeCategorySidebar/Component'
import { useSidebar } from '@/providers/SidebarProvider'
import { MobileCategoryMenu } from '@/components/Navigation/MobileCategoryMenu'

interface ResponsiveSidebarWrapperProps {
  lang: string
  children: React.ReactNode
}

export const ResponsiveSidebarWrapper: React.FC<ResponsiveSidebarWrapperProps> = ({ lang, children }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  return (
    <>
      {/* Mobile Category Menu - ใช้ component เดียวกับ Header */}
      <MobileCategoryMenu lang={lang} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Desktop Layout */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 items-start">
          {/* Desktop Sidebar - Hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <HomeCategorySidebar lang={lang} />
          </div>
          
          {/* Hero Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
