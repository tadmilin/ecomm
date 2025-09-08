'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { ImageSlider } from '@/components/ImageSlider'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, mediaSlides, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
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
      <div className="min-h-[80vh] select-none w-full">
        {Array.isArray(mediaSlides) && mediaSlides.length > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageSlider
              slides={
                mediaSlides
                  .filter((slide) => typeof slide.image !== 'string' && slide.image && typeof slide.image === 'object')
                  .map((slide) => ({
                    image: slide.image as {
                      id: string
                      url: string
                      filename: string
                      mimeType: string
                      filesize: number
                      width: number
                      height: number
                      alt?: string
                    }
                  }))
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
