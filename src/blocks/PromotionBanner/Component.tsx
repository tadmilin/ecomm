import type { PromotionBannerBlock as PromotionBannerBlockProps } from '@/payload-types'
import React from 'react'
import { PromotionBannerCarousel } from './PromotionBannerCarousel'

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
    height = 'medium',
    rounded = true,
  } = props

  if (!banners || banners.length === 0) {
    return null
  }

  return (
    <div className="my-8 md:my-12" id={`block-${id}`}>
      <div className="container">
        <PromotionBannerCarousel
          banners={banners as any}
          autoPlay={autoPlay}
          showArrows={showArrows}
          showDots={showDots}
          height={height || 'medium'}
          rounded={rounded}
        />
      </div>
    </div>
  )
}
