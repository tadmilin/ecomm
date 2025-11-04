'use client'

import React from 'react'
import Slider from 'react-slick'
import { Media } from '../Media'
import { CMSLink } from '@/components/Link'

// นำเข้า CSS ของ slick-carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

import type { Media as MediaType } from '@/payload-types'

interface ImageSlideItem {
  image: MediaType
  title?: string | null
  description?: {
    root: {
      type: string
      children: Array<{
        type: string
        version: number
        [k: string]: unknown
      }>
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  link?: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string | number | any
    } | null
    url?: string | null
    label?: string | null
    appearance?: 'default' | 'outline' | 'inline' | null
  } | null
}

interface ImageSliderProps {
  slides: ImageSlideItem[]
  className?: string
  fill?: boolean
  imgClassName?: string
  priority?: 'high' | 'low' | 'auto'
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  className = '',
  fill = false,
  imgClassName = '',
  priority = 'low',
}) => {
  // ตั้งค่า slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    centerPadding: '0',
  }

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div className={`image-slider-container ${className}`}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className="slide-item relative">
            <Media
              // ส่ง slide.image ทั้งหมดไปให้ Media component
              resource={slide.image}
              fill={fill}
              imgClassName={`slide-image ${imgClassName}`}
              // priority ต้องเป็น boolean หรือ undefined
              priority={index === 0 && priority === 'high'}
            />
            {(slide.title || slide.description || slide.link) && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="container h-full flex items-center">
                  <div className="max-w-[36.5rem] bg-black/40 backdrop-blur-sm rounded-md p-6 text-white pointer-events-auto">
                    {slide.title && (
                      <h2 className="text-4xl font-extrabold tracking-tight mb-3">{slide.title}</h2>
                    )}
                    {slide.description && (
                      <div className="prose prose-invert max-w-none mb-4">
                        {/* description เป็น richText (lexical JSON) จะเรนเดอร์ผ่าน RichText ของหน้าแม่ จึงให้เป็น children แบบ plain ไม่แปลงที่นี่ */}
                      </div>
                    )}
                    {slide.link && (
                      <CMSLink
                        appearance="default"
                        type={slide.link.type}
                        url={slide.link.url}
                        newTab={slide.link.newTab}
                        reference={slide.link.reference}
                        label={slide.link.label}
                      >
                        {slide.link.label || 'Learn more'}
                      </CMSLink>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  )
}
