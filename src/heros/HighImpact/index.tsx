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
    <div className="relative flex items-center justify-center text-white" data-theme="dark">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
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
      <div className="select-none w-full" style={{ height: 'calc(7 * 3.5rem)' }}>
        {Array.isArray(mediaSlides) && mediaSlides.length > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
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
              imgClassName="-z-10 object-cover"
              priority="high"
              className="w-full h-full"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
