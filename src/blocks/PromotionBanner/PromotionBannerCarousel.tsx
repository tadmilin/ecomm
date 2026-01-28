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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const aspectRatioClasses: Record<string, string> = {
    '16/9': 'aspect-[16/9]',
    '21/9': 'aspect-[21/9]',
    '4/3': 'aspect-[4/3]',
    '2/1': 'aspect-[2/1]',
  }

  const getImageUrl = (image: string | Media, isMobile = false): string | null => {
    if (typeof image === 'string') return image
    if (typeof image === 'object' && image?.url) return image.url
    return null
  }

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
  }, [banners.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoPlay || isPaused || banners.length <= 1) return

    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [autoPlay, isPaused, goToNext, banners.length])

  if (banners.length === 0) return null

  const currentBanner = banners[currentIndex]
  const desktopImageUrl = getImageUrl(currentBanner.image)
  const mobileImageUrl = currentBanner.mobileImage
    ? getImageUrl(currentBanner.mobileImage)
    : desktopImageUrl

  const BannerContent = () => (
    <div
      className={`relative w-full ${aspectRatioClasses[aspectRatio] || aspectRatioClasses['16/9']} overflow-hidden bg-gray-100 ${rounded ? 'rounded-2xl' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Desktop Image */}
      {desktopImageUrl && (
        <div className="hidden md:block w-full h-full">
          <Image
            src={desktopImageUrl}
            alt={currentBanner.alt || 'Promotion Banner'}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
        </div>
      )}

      {/* Mobile Image */}
      {mobileImageUrl && (
        <div className="block md:hidden w-full h-full">
          <Image
            src={mobileImageUrl}
            alt={currentBanner.alt || 'Promotion Banner'}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
        </div>
      )}

      {/* Navigation Arrows */}
      {showArrows && banners.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
            aria-label="Previous banner"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
            aria-label="Next banner"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault()
                goToSlide(index)
              }}
              className={`transition-all ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              } rounded-full`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )

  // If banner has link, wrap in Link component
  if (currentBanner.link) {
    if (currentBanner.openInNewTab) {
      return (
        <a
          href={currentBanner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <BannerContent />
        </a>
      )
    }
    return (
      <Link href={currentBanner.link} className="block">
        <BannerContent />
      </Link>
    )
  }

  return <BannerContent />
}
