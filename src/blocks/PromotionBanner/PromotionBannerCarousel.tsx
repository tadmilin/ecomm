'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
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
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentPage < totalPages - 1) {
      goToNext()
    }
    if (isRightSwipe && currentPage > 0) {
      goToPrevious()
    }
    
    setTouchStart(0)
    setTouchEnd(0)
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
        className={`relative w-full overflow-hidden bg-white ${rounded ? 'rounded-lg' : ''} shadow-md transition-all hover:shadow-xl hover:scale-[1.02] flex items-center justify-center`}
        style={{ aspectRatio: '16/9' }}
      >
        {/* Desktop Image */}
        {desktopImageUrl && (
          <div className="hidden md:block relative w-full h-full p-2">
            <Image
              src={desktopImageUrl}
              alt={banner.alt || 'Promotion Banner'}
              fill
              className="object-contain p-1"
              priority={currentPage === 0 && index === 0}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        {/* Mobile Image */}
        {mobileImageUrl && (
          <div className="block md:hidden relative w-full h-full p-2">
            <Image
              src={mobileImageUrl}
              alt={banner.alt || 'Promotion Banner'}
              fill
              className="object-contain p-1"
              priority={currentPage === 0 && index === 0}
              sizes="50vw"
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
      {/* Desktop Grid - 3 columns */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {currentBanners.map((banner, index) => (
          <BannerItem key={`${startIndex + index}`} banner={banner} index={index} />
        ))}
      </div>

      {/* Mobile Horizontal Scroll - Show 2 items with smooth scrolling */}
      <div 
        className="md:hidden relative -mx-4 px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {banners.map((banner, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 snap-start"
              style={{ width: 'calc(50% - 6px)' }}
            >
              <BannerItem banner={banner} index={index} />
            </div>
          ))}
        </div>
        
        {/* Gradient fade edges for mobile */}
        <div className="absolute left-0 top-0 bottom-2 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-2 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Navigation Arrows - Desktop only */}
      {showArrows && totalPages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-100 transition-all hover:scale-110"
            aria-label="Previous page"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-100 transition-all hover:scale-110"
            aria-label="Next page"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator - Desktop only */}
      {showDots && totalPages > 1 && (
        <div className="hidden md:flex justify-center gap-2 mt-4">
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
