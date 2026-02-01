'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'

interface FeaturedCategory {
  id?: string
  image: string | Media
  title: string
  description?: string | null
  link: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?: any
    url?: string | null
    label: string
    appearance?: ('default' | 'outline') | null
  }
}

interface FeaturedCategoriesProps {
  categories?: FeaturedCategory[]
  lang?: string
}

export const FeaturedCategoriesComponent: React.FC<FeaturedCategoriesProps> = ({ 
  categories, 
  lang = 'th' 
}) => {
  if (!categories || categories.length === 0) return null

  return (
    <div className="section-bg">
      <div className="main-container">
        <div className="grid-wrapper">
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="menu-card"
              >
                {/* รูปภาพ - ปรับให้เต็มพื้นที่ซ้ายเหมือนตัวอย่าง */}
                <div className="card-image">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                    />
                  ) : (
                    <div className="placeholder-icon">📦</div>
                  )}
                </div>

                {/* ข้อความ - จัดวางเหมือนเดิมแต่ปรับฟอนต์และระยะห่าง */}
                <div className="card-content">
                  <h3>{category.link?.label || category.title}</h3>
                  {category.description && (
                    <p>{category.description}</p>
                  )}
                </div>

                {/* ลูกศร - ปรับให้ดูเรียบง่าย */}
                <div className="card-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </CMSLink>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        /* พื้นหลังของ Section */
        .section-bg {
          width: 100%;
          background-color: transparent;
          margin-top: -8px; /* Negative margin to pull it up closer to hero */
          padding-bottom: 24px;
        }

        /* Container หลัก */
        .main-container {
          width: 100%;
          max-width: 1280px; 
          margin: 0 auto;
          padding-left: 16px;
          padding-right: 16px;
        }

        /* Container การ์ด */
        .grid-wrapper {
          display: flex;
          gap: 16px;
        }

        /* --- Desktop View --- */
        @media (min-width: 1024px) {
          .grid-wrapper {
            display: grid;
            grid-template-columns: repeat(4, 1fr); 
            width: 100%;
          }

          :global(.menu-card) {
            width: 100%;
          }
        }

        /* --- Design ตัวการ์ด --- */
        :global(.menu-card) {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 8px; /* Slightly smaller radius */
          padding: 0; 
          text-decoration: none;
          color: #333;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* Subtle shadow like example */
          border: 1px solid #e5e7eb; /* Light border */
          transition: all 0.2s ease;
          height: 96px; /* Similar height to example */
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }

        :global(.menu-card:hover) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-color: #d1d5db;
        }

        .card-image {
          width: 96px; /* Square */
          height: 100%;
          flex-shrink: 0;
          background-color: #f3f4f6; /* Light gray bg for image placeholder */
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Full bleed image like example */
          transition: transform 0.5s ease;
        }
        
        :global(.menu-card:hover) .card-image img {
          transform: scale(1.1);
        }

        .card-content {
          flex-grow: 1;
          overflow: hidden;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 16px;
        }

        .card-content h3 {
          margin: 0;
          font-size: 18px; 
          font-weight: 600; /* Bold title */
          color: #111827; /* Dark text */
          margin-bottom: 4px;
          font-family: 'Kanit', sans-serif;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-content p {
          margin: 0;
          font-size: 14px;
          color: #6b7280; /* Gray description */
          font-family: 'Kanit', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }

        .card-arrow {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111827;
        }
        
        .card-arrow svg {
            width: 24px;
            height: 24px;
            stroke-width: 1.5;
        }
        
        /* Tablet */
        @media (min-width: 640px) and (max-width: 1023px) {
           .grid-wrapper {
             display: grid;
             grid-template-columns: repeat(2, 1fr);
             gap: 12px;
           }
        }

        /* Mobile */
        @media (max-width: 639px) {
           .section-bg {
             margin-top: -4px;
           }
           
           .grid-wrapper {
             display: grid;
             grid-template-columns: 1fr;
             gap: 12px;
           }
           
           :global(.menu-card) {
             height: 80px; 
           }
           
           .card-image {
             width: 80px;
           }
           
           .card-content h3 {
             font-size: 16px;
           }
           
           .card-content p {
             font-size: 13px;
           }
        }
      `}</style>
    </div>
  )
}