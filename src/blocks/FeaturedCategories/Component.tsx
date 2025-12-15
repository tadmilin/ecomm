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
    <div className="w-full bg-gray-50 py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="flex items-center gap-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 group"
              >
                {/* Image - Left */}
                <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">📦</span>
                    </div>
                  )}
                </div>

                {/* Content - Middle */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1.5 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Arrow - Right */}
                <div className="flex-shrink-0">
                  <svg 
                    className="w-7 h-7 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
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
