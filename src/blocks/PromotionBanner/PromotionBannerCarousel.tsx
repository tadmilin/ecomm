'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

interface Banner {
  image: string | Media
  mobileImage?: string | Media | null
  alt?: string | null
  link?: string | null
  openInNewTab?: boolean | null
  id?: string
}

interface PromotionBannerCarouselProps {
  banners: Banner[]
  autoPlay: boolean
  showArrows: boolean
  showDots: boolean
  aspectRatio: string
  rounded: boolean
}

export const PromotionBannerCarousel: React.FC<PromotionBannerCarouselProps> = ({
  banners,
  autoPlay,
  showArrows,
  showDots,
  aspectRatio,
  rounded,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const itemsPerPage = 3
  const totalPages = Math.ceil(banners.length / itemsPerPage)

  const getImageUrl = (image: string | Media, isMobile = false): string | null => {
    if (typeof image === 'string') return image
    if (typeof image === 'object' && image?.url) return image.url
    return null
  }

  const goToNext = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
  }, [totalPages])

  const goToPrevious = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (!autoPlay || isPaused || totalPages <= 1) return

    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [autoPlay, isPaused, goToNext, totalPages])

  if (banners.length === 0) return null

  const startIndex = currentPage * itemsPerPage
  const currentBanners = banners.slice(startIndex, startIndex + itemsPerPage)

  const BannerItem = ({ banner, index }: { banner: Banner; index: number }) => {
    const desktopImageUrl = getImageUrl(banner.image)
    const mobileImageUrl = banner.mobileImage
      ? getImageUrl(banner.mobileImage)
      : desktopImageUrl

    const content = (
      <div
        className={`relative w-full overflow-hidden bg-gray-100 ${rounded ? 'rounded-lg' : ''} h-[180px] md:h-[220px] transition-transform hover:scale-105`}
      >
        {/* Desktop Image */}
        {desktopImageUrl && (
          <div className="hidden md:block w-full h-full">
            <Image
              src={desktopImageUrl}
              alt={banner.alt || 'Promotion Banner'}
              fill
              className="object-contain"
              priority={currentPage === 0 && index === 0}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        {/* Mobile Image */}
        {mobileImageUrl && (
          <div className="block md:hidden w-full h-full">
            <Image
              src={mobileImageUrl}
              alt={banner.alt || 'Promotion Banner'}
              fill
              className="object-contain"
              priority={currentPage === 0 && index === 0}
              sizes="100vw"
            />
          </div>
        )}
      </div>
    )

    if (banner.link) {
      if (banner.openInNewTab) {
        return (
          <a
            href={banner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {content}
          </a>
        )
      }
      return (
        <Link href={banner.link} className="block">
          {content}
        </Link>
      )
    }

    return content
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Grid of 3 banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentBanners.map((banner, index) => (
          <BannerItem key={`${startIndex + index}`} banner={banner} index={index} />
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalPages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-110"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-110"
            aria-label="Next page"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`transition-all ${
                index === currentPage
                  ? 'w-8 h-2 bg-blue-600'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              } rounded-full`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
