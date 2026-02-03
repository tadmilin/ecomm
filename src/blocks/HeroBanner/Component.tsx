import type { HeroBannerBlock as HeroBannerBlockProps, Media } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const HeroBannerBlock: React.FC<
  HeroBannerBlockProps & {
    id?: string
    lang?: string
  }
> = (props) => {
  const {
    id,
    image,
    alt,
    link,
    openInNewTab,
    height = 'medium',
  } = props

  const getImageUrl = (img: string | Media): string | null => {
    if (typeof img === 'string') return img
    if (typeof img === 'object' && img?.url) return img.url
    return null
  }

  const imageUrl = image ? getImageUrl(image) : null

  if (!imageUrl) return null

  // Map height to pixel values
  const heightMap = {
    small: '200px',
    medium: '300px',
    large: '400px',
    xlarge: '500px',
  }

  const mobileHeightMap = {
    small: '150px',
    medium: '200px',
    large: '250px',
    xlarge: '300px',
  }

  const desktopHeight = heightMap[height as keyof typeof heightMap] || heightMap.medium
  const mobileHeight = mobileHeightMap[height as keyof typeof mobileHeightMap] || mobileHeightMap.medium

  const content = (
    <div className="w-full">
      <div className="container">
        <div className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
          {/* Hero Banner - Single Image for All Devices */}
          {imageUrl && (
            <>
              {/* Desktop */}
              <div 
                className="hidden md:block relative w-full"
                style={{ height: desktopHeight }}
              >
                <Image
                  src={imageUrl}
                  alt={alt || 'Hero Banner'}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </div>
              {/* Mobile */}
              <div 
                className="block md:hidden relative w-full"
                style={{ height: mobileHeight }}
              >
                <Image
                  src={imageUrl}
                  alt={alt || 'Hero Banner'}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )

  if (link) {
    if (openInNewTab) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    )
  }

  return content
}
