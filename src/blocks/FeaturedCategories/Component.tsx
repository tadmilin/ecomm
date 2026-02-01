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
                {/* รูปภาพ */}
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

                {/* ข้อความ */}
                <div className="card-content">
                  <h3>{category.title}</h3>
                  {category.description && (
                    <p>{category.description}</p>
                  )}
                </div>

                {/* ลูกศร */}
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
          background-color: transparent; /* หรือสีพื้นหลังที่ต้องการ */
          padding: 20px 0;
        }

        /* Container หลัก: ตัวคุมความกว้างให้เท่ากับแบนเนอร์ข้างบน */
        .main-container {
          width: 100%;
          /* ปรับตัวเลขนี้เพื่อให้ตรงกับแบนเนอร์ (มาตรฐานมักจะ 1200px - 1400px) */
          max-width: 1280px; 
          margin: 0 auto; /* จัดกึ่งกลางหน้าจอ */
          padding-left: 16px;
          padding-right: 16px; /* กันชนขอบซ้ายขวานิดหน่อย */
        }

        /* Container การ์ด */
        .grid-wrapper {
          display: flex;
          gap: 16px; /* ระยะห่างระหว่างการ์ดแต่ละใบ */
        }

        /* --- Mobile & Tablet View --- */
        @media (max-width: 1023px) {
          .grid-wrapper {
            display: grid;
            width: 100%;
            gap: 12px;
          }
        }

        /* Mobile specific adjustments */
        @media (max-width: 639px) {
           .grid-wrapper {
             grid-template-columns: 1fr;
           }
           :global(.menu-card) {
             height: 84px; /* Slightly compact on mobile */
           }
           .card-image {
             width: 84px;
             margin-right: 12px;
           }
           .card-content h3 {
             font-size: 16px;
           }
        }

        /* Tablet specific adjustments */
        @media (min-width: 640px) and (max-width: 1023px) {
           .grid-wrapper {
             grid-template-columns: repeat(2, 1fr);
           }
        }
        
        /* --- Desktop View (คอมพิวเตอร์) --- */
        @media (min-width: 1024px) {
          .grid-wrapper {
            display: grid;
            /* แบ่ง 4 ช่อง เท่ากันเป๊ะ */
            grid-template-columns: repeat(4, 1fr); 
            width: 100%;
          }

          :global(.menu-card) {
            width: 100%; /* ยืดเต็มช่องของตัวเอง */
          }
        }

        /* --- Design ตัวการ์ด --- */
        :global(.menu-card) {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 0;
          text-decoration: none;
          color: #333;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
          height: 90px; /* ลดความสูงลงเล็กน้อยให้กระชับขึ้น */
          box-sizing: border-box;
          overflow: hidden;
        }

        :global(.menu-card:hover) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          border-color: #e0e0e0;
        }

        .card-image {
          width: 90px; /* สี่เหลี่ยมจัตุรัส */
          height: 90px;
          flex-shrink: 0;
          background-color: #fff; /* เปลี่ยนเป็นขาวเพื่อให้กลมกลืนถ้าเป็นโลโก้ */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px; /* เพิ่ม padding เล็กน้อยกันรูปชนขอบ */
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* สำคัญ! ใช้ contain เพื่อไม่ให้รูปถูกตัด */
          transition: transform 0.3s ease;
        }
        
        :global(.menu-card:hover) .card-image img {
          transform: scale(1.05);
        }

        .card-content {
          flex-grow: 1;
          overflow: hidden;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 12px; /* เพิ่ม padding ด้านข้าง */
        }

        .card-content h3 {
          margin: 0;
          font-size: 16px; 
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
          font-family: 'Kanit', sans-serif;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-content p {
          margin: 0;
          font-size: 13px;
          color: #888;
          font-family: 'Kanit', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-arrow {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          margin-right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222;
        }
        
        .card-arrow svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 2;
        }
      `}</style>
    </div>
  )
}