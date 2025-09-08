'use client'

import React from 'react'
import Slider from 'react-slick'
import { Media } from '../Media'

// นำเข้า CSS ของ slick-carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

import type { Media as MediaType } from '@/payload-types'

interface ImageSlideItem {
  image: MediaType
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
          <div key={`slide-${index}`} className="slide-item">
            <Media
              // ส่ง slide.image ทั้งหมดไปให้ Media component
              resource={slide.image}
              fill={fill}
              imgClassName={`slide-image ${imgClassName}`}
              // priority ต้องเป็น boolean หรือ undefined
              priority={index === 0 && priority === 'high'}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
