'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page, Media, Post } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ImageSlider } from '@/components/ImageSlider'
import RichText from '@/components/RichText'

type MediaSlide = {
  image: string | Media
  title?: string | null
  description?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  link: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'posts'
          value: string | Post
        } | null)
    url?: string | null
    label: string
    appearance?: ('default' | 'outline') | null
  }
  id?: string | null
}

export const HighImpactHero: React.FC<Page['hero']> = ({ links, mediaSlides, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'auto' }}>
      {/* Background Image Slider */}
      {Array.isArray(mediaSlides) && mediaSlides.length > 0 ? (
        <div className="relative w-full">
          <ImageSlider
            slides={
              Array.isArray(mediaSlides)
                ? mediaSlides
                    .filter((slide): slide is MediaSlide =>
                      Boolean(slide.image && typeof slide.image === 'object'),
                    )
                    .map((slide) => ({
                      image: slide.image as Media,
                      title: slide.title ?? null,
                      description: slide.description ?? null,
                      link: slide.link ?? null,
                    }))
                : []
            }
            fill={true}
            imgClassName=""
            priority="high"
            className="w-full h-full hero-slider-custom"
          />
        </div>
      ) : null}
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full text-white" data-theme="dark">
        <div className="container">
          <div className="max-w-[36.5rem] md:text-center mx-auto">
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex md:justify-center gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .hero-slider-custom .slide-item {
            height: calc(7 * 3.5rem) !important;
            min-height: auto !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  )
}
