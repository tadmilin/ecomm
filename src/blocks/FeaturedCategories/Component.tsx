'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'

interface FeaturedCategory {
  id?: string
  image: string | Media
  title: string
  description?: string
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
    <div className="section-wrapper">
      <div className="grid-container">
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

      <style jsx>{`
        /* Wrapper หลัก: กำหนดให้กว้างเต็มพื้นที่ของกรอบสีแดง (ตาม Parent) */
        .section-wrapper {
          width: 100%; 
          padding-top: 20px;
          padding-bottom: 20px;
          /* พื้นหลังสีเดียวกับเว็บเพื่อให้กลมกลืน */
          background-color: transparent; 
        }

        /* Container การ์ด */
        .grid-container {
          display: flex;
          gap: 16px; /* ระยะห่างระหว่างการ์ด */
          width: 100%;
        }

        /* --- STYLES (Mobile First) --- */
        /* บนมือถือ: ให้เลื่อนแนวนอน (Scroll) */
        @media (max-width: 1023px) {
          .grid-container {
            overflow-x: auto;
            padding-left: 16px;
            padding-right: 16px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .grid-container::-webkit-scrollbar {
            display: none;
          }
          :global(.menu-card) {
            min-width: 280px;
            flex-shrink: 0;
          }
        }

        /* --- STYLES (Desktop / PC) --- */
        /* บนจอคอม: เปลี่ยนเป็น Grid 4 ช่องเท่ากันเป๊ะ */
        @media (min-width: 1024px) {
          .grid-container {
            display: grid;
            /* แบ่ง 4 ช่อง เท่ากัน 100% โดยใช้ minmax(0, 1fr) เพื่อแก้ปัญหาการ์ดยืดเกิน */
            grid-template-columns: repeat(4, minmax(0, 1fr)); 
            overflow: visible;
            padding: 0; /* ไม่ต้องดันขอบซ้ายขวา เพราะจะให้ตรงกับแบนเนอร์ด้านบน */
          }

          :global(.menu-card) {
            width: 100%;
            min-width: 0; /* สำคัญมาก: เพื่อให้ Grid ควบคุมขนาด ไม่ใช่ Content */
          }
        }

        /* --- CARD DESIGN --- */
        :global(.menu-card) {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 12px; /* มุมโค้งมนสวยงาม */
          padding: 16px; /* เพิ่ม Padding ให้กรอบดูใหญ่กว่ารูป ไม่อึดอัด */
          text-decoration: none;
          color: #333;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04); /* เงานุ่มๆ */
          border: 1px solid #f0f0f0; /* เส้นขอบบางๆ */
          transition: all 0.2s ease;
          height: 100%; /* บังคับให้การ์ดสูงเท่ากันหมดในแถว */
          box-sizing: border-box;
        }

        :global(.menu-card:hover) {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
          border-color: transparent;
        }

        /* รูปภาพซ้ายมือ */
        .card-image {
          width: 64px; /* ขนาดรูป */
          height: 64px;
          flex-shrink: 0;
          border-radius: 8px; /* รูปโค้งมน */
          overflow: hidden;
          margin-right: 16px; /* ระยะห่างระหว่างรูปกับข้อความ */
          background-color: #f9f9f9;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* กล่องข้อความ */
        .card-content {
          flex-grow: 1;
          overflow: hidden;
          min-width: 0; /* แก้ปัญหา Flexbox ดันทะลุ */
        }

        .card-content h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
          font-family: 'Prompt', 'Kanit', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-content p {
          margin: 0;
          font-size: 13px;
          color: #888;
          font-family: 'Prompt', 'Kanit', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }

        /* ไอคอนลูกศร */
        .card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          margin-left: 8px;
          opacity: 0.5;
        }
        
        :global(.menu-card:hover) .card-arrow {
           opacity: 1;
        }
      `}</style>
    </div>
  )
}