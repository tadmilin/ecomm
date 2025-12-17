'use client'

import React, { useRef } from 'react'
import Slider from 'react-slick'
import type { Media } from '@/payload-types'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type BrandLogo = {
  logo: string | Media
  brandName?: string | null
  link?: string | null
  id?: string | null
}

type BrandLogosComponentProps = {
  logos: BrandLogo[]
  title?: string | null
  slidesToShow?: number | null
}

export const BrandLogosComponent: React.FC<BrandLogosComponentProps> = ({
  logos,
  title,
  slidesToShow = 5,
}) => {
  const sliderRef = useRef<typeof Slider | null>(null)

  if (!logos || logos.length === 0) return null

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="brand-logos-section py-12 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{title}</h2>
        )}
        
        <div className="brand-logos-slider">
          <Slider ref={sliderRef} {...settings}>
            {logos.map((item, index) => {
              const logoMedia = typeof item.logo === 'object' ? item.logo : null
              const logoUrl = logoMedia?.url || ''
              const brandName = item.brandName || logoMedia?.alt || 'Brand Logo'
              
              const LogoContent = (
                <div className="brand-logo-item px-4">
                  <div className="brand-logo-wrapper flex items-center justify-center p-6 bg-white rounded-lg transition-all duration-300 hover:shadow-lg">
                    <img
                      src={logoUrl}
                      alt={brandName}
                      className="max-w-full max-h-20 w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              )

              if (item.link) {
                return (
                  <a
                    key={item.id || index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {LogoContent}
                  </a>
                )
              }

              return (
                <div key={item.id || index}>
                  {LogoContent}
                </div>
              )
            })}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        .brand-logos-slider :global(.slick-dots) {
          bottom: -40px;
        }
        
        .brand-logos-slider :global(.slick-dots li button:before) {
          font-size: 12px;
          color: #e53e3e;
        }
        
        .brand-logos-slider :global(.slick-dots li.slick-active button:before) {
          color: #e53e3e;
          opacity: 1;
        }

        .brand-logos-slider :global(.slick-prev),
        .brand-logos-slider :global(.slick-next) {
          width: 40px;
          height: 40px;
          z-index: 10;
        }

        .brand-logos-slider :global(.slick-prev) {
          left: -50px;
        }

        .brand-logos-slider :global(.slick-next) {
          right: -50px;
        }

        .brand-logos-slider :global(.slick-prev:before),
        .brand-logos-slider :global(.slick-next:before) {
          font-size: 40px;
          color: #4a5568;
        }

        @media (max-width: 1024px) {
          .brand-logos-slider :global(.slick-prev) {
            left: -30px;
          }
          
          .brand-logos-slider :global(.slick-next) {
            right: -30px;
          }
        }

        @media (max-width: 768px) {
          .brand-logos-slider :global(.slick-prev),
          .brand-logos-slider :global(.slick-next) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
