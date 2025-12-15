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
    <div className="w-full bg-gray-50 py-8 border-t">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden group block"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl text-gray-300">📦</span>
                    </div>
                  )}
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                  )}
                  <div className="mt-2 flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    ดูเพิ่มเติม
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CMSLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
