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
    <div className="w-full bg-white border-b">
      <div className="relative w-full h-[80px] md:h-[100px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={alt || 'Top Banner'}
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
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
