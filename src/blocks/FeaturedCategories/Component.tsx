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
    <div className="w-full bg-white py-6 border-t border-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 p-4 group"
              >
                {/* Image - Left */}
                <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-white border border-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <span className="text-2xl">📦</span>
                    </div>
                  )}
                </div>

                {/* Content - Right */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </CMSLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
