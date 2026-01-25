'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Category, Media } from '@/payload-types'

interface CategoriesCarouselProps {
  categories: Category[]
  columns: string
  rows: string
  showDescription: boolean
  imageStyle: string
  lang: string
}

export const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({
  categories,
  columns,
  rows,
  showDescription,
  imageStyle,
  lang,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const columnsNum = parseInt(columns || '6', 10)
  const rowsNum = parseInt(rows || '2', 10)
  const itemsPerPage = columnsNum * rowsNum
  const totalPages = Math.ceil(categories.length / itemsPerPage)

  const getTitle = (category: Category): string => {
    if (typeof category.title === 'string') {
      return category.title
    }
    return 'Category'
  }

  const getDescription = (category: Category): string | null => {
    if (typeof category.description === 'string') {
      return category.description
    }
    return null
  }

  const getImageUrl = (category: Category): string | null => {
    const image = category.image as Media | null
    if (image && typeof image === 'object' && image.url) {
      return image.url
    }
    return null
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const startIndex = currentPage * itemsPerPage
  const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage)

  // Image style classes
  const imageStyleClasses: Record<string, string> = {
    square: 'aspect-square',
    circle: 'aspect-square rounded-full',
    rectangle: 'aspect-[4/3]',
  }

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Categories Grid */}
      <div ref={scrollRef} className="overflow-hidden">
        <div
          className="grid gap-2 transition-all duration-500"
          style={{
            gridTemplateColumns: `repeat(${columnsNum}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rowsNum}, minmax(0, 1fr))`,
          }}
        >
          {visibleCategories.map((category) => {
            const imageUrl = getImageUrl(category)
            const title = getTitle(category)
            const description = getDescription(category)
            const slug = category.slug || category.id

            return (
              <Link
                key={category.id}
                href={`/${lang}/categories/${slug}`}
                className="group block bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 hover:border-primary/40"
              >
                {/* Image */}
                <div className={`relative overflow-hidden bg-gray-50 ${imageStyleClasses[imageStyle || 'square']}`}>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="150px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-2">
                  <h3 className="text-xs font-medium text-gray-800 group-hover:text-primary transition-colors text-center line-clamp-2 leading-tight">
                    {title}
                  </h3>
                  {showDescription && description && (
                    <p className="mt-0.5 text-[10px] text-gray-500 line-clamp-1 text-center">
                      {description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentPage ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
