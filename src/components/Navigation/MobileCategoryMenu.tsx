'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import type { Category } from '@/payload-types'

interface MobileCategoryMenuProps {
  lang: string
  isOpen: boolean
  onClose: () => void
}

export const MobileCategoryMenu: React.FC<MobileCategoryMenuProps> = ({ lang, isOpen, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

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

    if (isOpen) {
      fetchCategories()
    }
  }, [lang, isOpen])

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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
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
      <div className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <h2 className="text-lg font-bold">หมวดหมู่สินค้า</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            aria-label="ปิดเมนู"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {loading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="py-2">
              {rootCategories.map((category) => {
                const subcategories = getSubcategories(category.id)
                const hasSubcategories = subcategories.length > 0
                const isExpanded = expandedCategories.has(category.id)

                return (
                  <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      {/* Category Link */}
                      <Link
                        href={`/${lang}/categories/${category.slug}`}
                        onClick={onClose}
                        className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
                      >
                        {/* Icon/Image */}
                        {category.image && typeof category.image === 'object' && category.image.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={category.image.url}
                            alt={getTranslatedTitle(category)}
                            className="w-10 h-10 object-cover rounded-lg shadow-sm flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">📦</span>
                          </div>
                        )}
                        
                        {/* Title */}
                        <span className="text-sm font-medium text-gray-800 group-hover:text-blue-900 flex-1">
                          {getTranslatedTitle(category)}
                        </span>
                      </Link>

                      {/* Expand Button */}
                      {hasSubcategories && (
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="px-3 py-3 hover:bg-blue-50 transition-colors"
                          aria-label={isExpanded ? 'ซ่อนหมวดหมู่ย่อย' : 'แสดงหมวดหมู่ย่อย'}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Subcategories */}
                    {hasSubcategories && isExpanded && (
                      <div className="bg-gray-50 py-2 animate-slideDown">
                        {subcategories.map((subcat) => (
                          <Link
                            key={subcat.id}
                            href={`/${lang}/categories/${subcat.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-2.5 pl-8 hover:bg-blue-100 transition-colors group"
                          >
                            {/* Subcategory Icon/Image */}
                            {subcat.image && typeof subcat.image === 'object' && subcat.image.url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={subcat.image.url}
                                alt={getTranslatedTitle(subcat)}
                                className="w-8 h-8 object-cover rounded shadow-sm flex-shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">📁</span>
                              </div>
                            )}
                            
                            {/* Subcategory Title */}
                            <span className="text-sm text-gray-700 group-hover:text-blue-900 flex-1">
                              {getTranslatedTitle(subcat)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <Link
            href={`/${lang}/categories`}
            onClick={onClose}
            className="block w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white text-center font-medium rounded-lg transition-colors shadow-sm"
          >
            ดูหมวดหมู่ทั้งหมด
          </Link>
        </div>
      </div>
    </>
  )
}
