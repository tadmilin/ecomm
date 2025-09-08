'use client'

import React from 'react'
import Slider from 'react-slick'
import { Media } from '../Media'

// นำเข้า CSS ของ slick-carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

interface ImageSlideItem {
  image: {
    id: string
    url: string
    filename: string
    mimeType: string
    filesize: number
    width: number
    height: number
    alt?: string
  }
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
              // แปลง slide.image ให้เป็นชนิดที่ Media component รองรับ (string หรือ Media object)
              resource={slide.image.id ? slide.image.id : slide.image.url}
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
