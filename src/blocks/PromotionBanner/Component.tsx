import type { PromotionBannerBlock as PromotionBannerBlockProps, Media } from '@/payload-types'
import React from 'react'
import { PromotionBannerCarousel } from './PromotionBannerCarousel'

interface BannerItem {
  image: string | Media
  mobileImage?: string | Media | null
  alt?: string | null
  link?: string | null
  openInNewTab?: boolean | null
  id?: string
}

export const PromotionBannerBlock: React.FC<
  PromotionBannerBlockProps & {
    id?: string
    lang?: string
  }
> = (props) => {
  const {
    id,
    banners,
    autoPlay = true,
    showArrows = true,
    showDots = true,
    aspectRatio = '21/9',
    rounded = true,
  } = props

  if (!banners || banners.length === 0) {
    return null
  }

  return (
    <div className="my-4 md:my-6" id={`block-${id}`}>
      <div className="container">
        <PromotionBannerCarousel
          banners={banners as BannerItem[]}
          autoPlay={!!autoPlay}
          showArrows={!!showArrows}
          showDots={!!showDots}
          aspectRatio={aspectRatio || '16/9'}
          rounded={!!rounded}
        />
      </div>
    </div>
  )
}
