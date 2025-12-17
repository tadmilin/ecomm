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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

        /* --- Mobile View (มือถือ) --- */
        @media (max-width: 1023px) {
          .grid-wrapper {
            overflow-x: auto;
            padding-bottom: 10px;
            /* ซ่อน Scrollbar */
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .grid-wrapper::-webkit-scrollbar {
            display: none;
          }
          /* ให้การ์ดเรียงต่อกันยาวๆ */
          :global(.menu-card) {
            min-width: 280px;
            flex-shrink: 0;
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
            /* ไม่กำหนด min-width หรือ max-width เพื่อให้ขนาดปรับตาม Grid */
          }
        }

        /* --- Design ตัวการ์ด --- */
        :global(.menu-card) {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 12px 16px; /* ปรับ padding ให้พอดี ไม่ใหญ่เกินไป */
          text-decoration: none;
          color: #333;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
          height: 80px; /* กำหนดความสูงมาตรฐานให้เท่ากันทุกอัน */
          box-sizing: border-box;
          overflow: hidden; /* กันเนื้อหาล้น */
        }

        :global(.menu-card:hover) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.08);
        }

        .card-image {
          width: 50px; /* ลดขนาดรูปนิดนึงเพื่อให้การ์ดดูสมส่วนขึ้น */
          height: 50px;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 14px;
          background-color: #f9f9f9;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          flex-grow: 1;
          overflow: hidden;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .card-content h3 {
          margin: 0;
          font-size: 15px; /* ปรับขนาดฟอนต์ให้พอดี */
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 2px;
          font-family: 'Prompt', 'Kanit', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-content p {
          margin: 0;
          font-size: 12px;
          color: #888;
          font-family: 'Prompt', 'Kanit', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-arrow {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-left: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}