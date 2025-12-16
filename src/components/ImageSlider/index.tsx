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
    centerMode: false, // แนะนำ: ปิด centerMode เพื่อลดปัญหาขอบขาวด้านข้าง
    variableWidth: false,
  }

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div className={`image-slider-container ${className}`}>
      <Slider {...settings} className="custom-slick-slider">
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className="slide-item-wrapper">
            <div className="slide-item relative">
              <Media
                resource={slide.image}
                fill={fill}
                // ใส่ class "fix-slide-image" เพื่อไปบังคับ CSS ข้างล่าง
                imgClassName={`slide-image fix-slide-image ${imgClassName}`}
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
                        <div className="prose prose-invert max-w-none mb-4"></div>
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

      {/* ใส่ CSS ไว้ตรงนี้เลยครับ จะได้ทำงานแน่นอน */}
      <style jsx global>{`
        /* 1. ลบช่องว่างบรรทัดของ Container */
        .image-slider-container {
          line-height: 0;
          font-size: 0;
          overflow: hidden;
          background-color: #000; /* ใส่พื้นหลังดำไว้กันเหนียว */
        }

        /* 2. จัดการตัว Slick Track */
        .custom-slick-slider .slick-list,
        .custom-slick-slider .slick-track {
          display: flex !important;
          align-items: flex-start; /* ดึงให้ชิดบนสุด */
          height: 100%;
        }

        .slide-item-wrapper {
          height: 100%;
          display: flex !important;
          justify-content: center;
        }

        /* 3. กำหนดความสูงของพื้นที่แสดงผล */
        .slide-item {
          width: 100%;
          /* ปรับความสูงตรงนี้: เช่น 50vh, 60vh หรือ 500px */
          height: 60vh; 
          max-height: 700px;
          position: relative;
          overflow: hidden;
        }

        /* 4. แก้รูปภาพให้ขยายเต็มและลบขอบดำล่าง (หัวใจสำคัญ) */
        .fix-slide-image {
          display: block !important; /* เปลี่ยนเป็น Block เพื่อลบช่องว่าง Text ด้านล่าง */
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important; /* ขยายรูปให้เต็มกรอบโดยไม่บี้ */
          object-position: center top; /* จัดให้โฟกัสเริ่มจากข้างบน */
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Responsive: ปรับความสูงสำหรับมือถือ */
        @media (max-width: 768px) {
          .slide-item {
            height: 40vh; /* มือถือให้เตี้ยลงหน่อย */
          }
        }
      `}</style>
    </div>
  )
}