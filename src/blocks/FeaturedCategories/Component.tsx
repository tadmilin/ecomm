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

  console.log('FeaturedCategories data:', categories)

  return (
    <div className="w-full bg-white py-6">
      <div className="container">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="flex-shrink-0 w-72 flex items-center gap-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-3 group"
              >
                {/* Image - Left */}
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-50">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl text-gray-300">📦</span>
                    </div>
                  )}
                </div>

                {/* Content - Middle */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 line-clamp-1">{category.description}</p>
                  )}
                </div>

                {/* Arrow - Right */}
                <div className="flex-shrink-0">
                  <svg 
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" 
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
