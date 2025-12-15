'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/payload-types'

interface CategoryDropdownProps {
  lang: string
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // เช็คว่าเป็นหน้า home หรือไม่
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`

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

  // Get root categories (no parent)
  const rootCategories = categories.filter((cat) => !cat.parent)

  // Get subcategories for a parent
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

  // ถ้าเป็นหน้า home → แสดงออกมาเลย (visible ตลอด)
  // ถ้าเป็นหน้าอื่น → แสดงเมื่อ hover
  const shouldShowDropdown = isHomePage || isOpen

  if (loading) {
    return (
      <div className="relative">
        <button className="px-4 py-2 text-white hover:bg-blue-800 rounded">
          หมวดหมู่สินค้า
        </button>
      </div>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => !isHomePage && setIsOpen(true)}
      onMouseLeave={() => !isHomePage && setIsOpen(false)}
    >
      {/* ปุ่มหมวดหมู่ */}
      <button className="px-4 py-2 text-white hover:bg-blue-800 rounded flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        หมวดหมู่สินค้า
      </button>

      {/* Dropdown รายการหมวดหมู่ */}
      {shouldShowDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-50 min-w-[250px]">
          {rootCategories.map((category) => {
            const subcategories = getSubcategories(category.id)
            const hasSubcategories = subcategories.length > 0

            return (
              <div key={category.id} className="group">
                <Link
                  href={`/${lang}/categories/${category.slug}`}
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 border-b border-gray-100"
                >
                  <span className="font-medium">{getTranslatedTitle(category)}</span>
                  {hasSubcategories && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Subcategories - แสดงเมื่อ hover ที่หมวดหมู่หลัก */}
                {hasSubcategories && (
                  <div className="hidden group-hover:block absolute left-full top-0 ml-1 bg-white shadow-lg rounded-lg overflow-hidden min-w-[200px]">
                    {subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/${lang}/categories/${sub.slug}`}
                        className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-900 border-b border-gray-100"
                      >
                        {getTranslatedTitle(sub)}
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
  )
}
