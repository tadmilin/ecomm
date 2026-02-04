import type { Page, Media } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type TopBannerProps = NonNullable<Page['topBanner']>

export const TopBanner: React.FC<TopBannerProps> = ({ enabled, image, alt, link, openInNewTab }) => {
  if (!enabled || !image) return null

  const getImageUrl = (img: string | Media): string | null => {
    if (typeof img === 'string') return img
    if (typeof img === 'object' && img?.url) return img.url
    return null
  }

  const imageUrl = getImageUrl(image)
  if (!imageUrl) return null

  const content = (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[100px] sm:h-[110px] md:h-[120px] lg:h-[130px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={alt || 'Top Banner'}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
          />
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
          className="block hover:opacity-90 transition-opacity"
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={link} className="block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}
