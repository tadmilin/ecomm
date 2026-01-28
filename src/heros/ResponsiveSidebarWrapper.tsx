'use client'

import React, { useState } from 'react'
import { HomeCategorySidebar } from '@/components/HomeCategorySidebar/Component'

interface ResponsiveSidebarWrapperProps {
  lang: string
  children: React.ReactNode
}

export const ResponsiveSidebarWrapper: React.FC<ResponsiveSidebarWrapperProps> = ({ lang, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-12 h-12 bg-primary text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">หมวดหมู่สินค้า</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-73px)]">
          <HomeCategorySidebar lang={lang} onCategoryClick={() => setIsSidebarOpen(false)} />
        </div>
      </div>

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
