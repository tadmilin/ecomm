'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'

interface FeaturedCategory {
  id?: string
  image: string | Media
  title: string
  description?: string
  link: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?: any
    url?: string | null
    label: string
    appearance?: ('default' | 'outline') | null
  }
}

interface FeaturedCategoriesProps {
  categories?: FeaturedCategory[]
  lang?: string
}

export const FeaturedCategoriesComponent: React.FC<FeaturedCategoriesProps> = ({ 
  categories, 
  lang = 'th' 
}) => {
  if (!categories || categories.length === 0) return null

  return (
    <div className="w-full bg-white py-6 border-t border-gray-200">
      <div className="container">
        {/* Mobile: Horizontal scroll | Desktop: Grid */}
        <div className="flex gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible pb-4 lg:pb-0">
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="flex-none min-w-[280px] lg:min-w-0 flex items-center gap-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 p-4 group"
              >
                {/* Image - Left (64x64) */}
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">📦</span>
                    </div>
                  )}
                </div>

                {/* Content - Middle */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Arrow - Right */}
                <div className="flex-shrink-0">
                  <svg 
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CMSLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
