'use client'

import React from 'react'
import Slider from 'react-slick'
import { Media } from '../Media'
import { CMSLink } from '@/components/Link'

// นำเข้า CSS ของ slick-carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { Media as MediaType, Page, Post } from '@/payload-types'

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
      value: string | number | Page | Post
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

/* --- ส่วนประกอบปุ่มลูกศร (Custom Arrows) --- */
const CustomPrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/60 hover:scale-110 focus:outline-none group"
      aria-label="Previous Slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  )
}

const CustomNextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/60 hover:scale-110 focus:outline-none group"
      aria-label="Next Slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  )
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  className = '',
  fill = false,
  imgClassName = '',
  priority = 'low',
}) => {
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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: false, // สำคัญ: ปิด adaptiveHeight เพื่อให้เราคุมความสูงเอง
  }

  if (!slides || slides.length === 0) return null

  return (
    <div className={`image-slider-container ${className}`}>
      <Slider {...settings} className="custom-slick-slider">
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className="slide-item-wrapper">
            <div className="slide-item">
              
              {/* รูปภาพพื้นหลัง */}
              <div className="slide-image-wrapper">
                <Media
                  resource={slide.image}
                  fill={true} 
                  imgClassName={`slide-bg-image ${imgClassName}`}
                  priority={index === 0 && priority === 'high'}
                />
              </div>

              {/* ข้อความและปุ่ม Overlay */}
              {(slide.title || slide.description || slide.link) && (
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center">
                  <div className="container">
                    <div className="max-w-[36.5rem] bg-black/40 backdrop-blur-sm rounded-md p-6 text-white pointer-events-auto">
                      {slide.title && (
                        <h2 className="text-4xl font-extrabold tracking-tight mb-3">{slide.title}</h2>
                      )}
                      {slide.description && (
                        <div className="prose prose-invert max-w-none mb-4">
                           {/* Content goes here */}
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
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        /* 1. Container หลัก - บังคับพื้นหลังดำ */
        .image-slider-container {
          position: relative;
          background-color: #000;
          overflow: hidden;
          line-height: 0;
          font-size: 0;
        }

        /* 2. บังคับโครงสร้าง Slick Slider ให้สูงเต็มพื้นที่ */
        .custom-slick-slider,
        .custom-slick-slider .slick-list,
        .custom-slick-slider .slick-track,
        .custom-slick-slider .slick-slide,
        .custom-slick-slider .slide-item-wrapper {
          height: 100% !important;
          min-height: 100% !important;
        }

        .slick-slide > div {
          height: 100%; /* แก้บั๊ก slick สร้าง div ซ้อน */
        }

        /* 3. กำหนดความสูงของพื้นที่แสดงผล (แก้เลขตรงนี้ได้) */
        .slide-item {
          width: 100%;
          height: 60vh; /* ความสูงที่คุณต้องการ */
          min-height: 400px; /* กันไม่ให้เตี้ยเกินไปในจอกว้าง */
          max-height: 800px;
          position: relative;
          display: flex; /* ใช้ Flex เพื่อยืด child ให้เต็ม */
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* 4. wrapper ของรูปภาพ - ยืดให้เต็มพื้นที่แม่ */
        .slide-image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        /* 5. ท่าไม้ตาย: เจาะจงไปที่ <img> ทุกตัวใน slider */
        .slide-image-wrapper img, 
        .slide-bg-image {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important; /* กุญแจสำคัญ: ขยายให้เต็มโดยตัดส่วนเกินออก */
          object-position: center center !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border: none !important;
        }

        /* ปุ่ม Dots */
        .slick-dots {
          bottom: 25px !important;
          z-index: 20;
        }
        .slick-dots li button:before {
          color: white !important;
          opacity: 0.5;
          font-size: 10px;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .slide-item {
            height: 40vh;
            min-height: 250px;
          }
        }
      `}</style>
    </div>
  )
}