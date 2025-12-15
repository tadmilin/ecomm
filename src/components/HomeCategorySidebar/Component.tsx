'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Category } from '@/payload-types'

interface HomeCategorySidebarProps {
  lang: string
}

export const HomeCategorySidebar: React.FC<HomeCategorySidebarProps> = ({ lang }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories?locale=${lang}&depth=2&limit=100`)
        const data = await response.json()
        setCategories(data.docs || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [lang])

  const getTranslatedTitle = (category: Category) => {
    if (typeof category.title === 'object' && category.title !== null) {
      const titleObj = category.title as Record<string, string>
      return titleObj[lang] || titleObj.th || 'Category'
    }
    return category.title || 'Category'
  }

  const rootCategories = categories.filter((cat) => !cat.parent)

  const getSubcategories = (parentId: string) => {
    return categories.filter((cat) => {
      if (typeof cat.parent === 'string') {
        return cat.parent === parentId
      }
      if (cat.parent && typeof cat.parent === 'object' && 'id' in cat.parent) {
        return cat.parent.id === parentId
      }
      return false
    })
  }

  if (loading) {
    return (
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 space-y-3">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-white shadow-md overflow-hidden">
      {/* Categories List */}
      <div className="divide-y h-full">
        {rootCategories.map((category) => {
          const subcategories = getSubcategories(category.id)
          const hasSubcategories = subcategories.length > 0
          const isHovered = hoveredCategory === category.id

          return (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                href={`/${lang}/categories/${category.slug}`}
                className={`flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors ${
                  isHovered && hasSubcategories ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {category.image && typeof category.image === 'object' && category.image.url ? (
                    <img
                      src={category.image.url}
                      alt={getTranslatedTitle(category)}
                      className="w-6 h-6 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 text-xl">📁</span>
                  )}
                  <span className="text-sm font-medium text-gray-700 hover:text-blue-900">
                    {getTranslatedTitle(category)}
                  </span>
                </div>
                {hasSubcategories && (
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>

              {/* Subcategories Flyout */}
              {hasSubcategories && isHovered && (
                <div className="absolute left-full top-0 ml-1 w-80 bg-white border rounded-lg shadow-lg z-50 p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b">
                    {getTranslatedTitle(category)}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 max-h-96">
                    {subcategories.map((subcat) => (
                      <Link
                        key={subcat.id}
                        href={`/${lang}/categories/${subcat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition-colors group"
                      >
                        {subcat.image && typeof subcat.image === 'object' && subcat.image.url ? (
                          <img
                            src={subcat.image.url}
                            alt={getTranslatedTitle(subcat)}
                            className="w-8 h-8 object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-300 text-lg">📁</span>
                        )}
                        <span className="text-sm text-gray-700 group-hover:text-blue-600">
                          {getTranslatedTitle(subcat)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
