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
      <div className="scroll-container">
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
                  <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CMSLink>
          )
        })}
      </div>

      <style jsx>{`
        .section-wrapper {
          width: 100%;
          background-color: #f0f0f0;
          padding: 20px 0;
        }

        .scroll-container {
          display: flex;
          overflow-x: auto;
          gap: 16px;
          padding-bottom: 5px;
          
          /* Mobile: ให้มีระยะห่างขอบซ้ายขวาเวลาเลื่อน */
          padding-left: 16px;
          padding-right: 16px;
          
          /* ซ่อน Scrollbar */
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        /* --- STYLES สำหรับหน้าจอมือถือ (Default) --- */
        :global(.menu-card) {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 10px;
          
          /* Mobile: บังคับความกว้าง เพื่อให้เลื่อนได้ */
          min-width: 280px; 
          max-width: 300px;
          flex-shrink: 0;
          
          text-decoration: none;
          color: #333;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid transparent;
        }

        /* --- STYLES สำหรับหน้าจอ PC (Desktop) --- */
        /* เมื่อหน้าจอกว้างกว่า 1024px ให้เปลี่ยนจากเลื่อน เป็นตารางเต็มจอ */
        @media (min-width: 1024px) {
          .section-wrapper {
             /* ปรับ Padding ให้ตรงกับ Container หลักของเว็บคุณ */
             padding-left: 24px;
             padding-right: 24px;
          }

          .scroll-container {
            /* เปลี่ยนเป็น Grid เพื่อแบ่งช่องเท่ากัน */
            display: grid;
            /* สั่งให้แบ่งเป็น 4 คอลัมน์เท่ากันเป๊ะ (1fr = 1 fraction) */
            grid-template-columns: repeat(4, 1fr); 
            overflow-x: visible; /* ปิดการเลื่อน */
            padding-left: 0;
            padding-right: 0;
            width: 100%; /* กว้างเต็มพื้นที่ */
          }

          :global(.menu-card) {
            /* ยกเลิกการจำกัดขนาดของมือถือ */
            min-width: 0; 
            max-width: none;
            width: 100%; /* ให้ยืดเต็มช่อง Grid ของตัวเอง */
          }
        }

        :global(.menu-card:hover) {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .card-image {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 12px;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder-icon {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          background-color: #f5f5f5;
        }

        .card-content {
          flex-grow: 1;
          overflow: hidden;
          /* เพิ่ม min-width: 0 เพื่อแก้ปัญหา Flexbox ดันทะลุเมื่อข้อความยาว */
          min-width: 0; 
        }

        .card-content h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #000;
          margin-bottom: 2px;
          font-family: 'Kanit', sans-serif;
          
          /* ตัดคำถ้ายาวเกิน */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-content p {
          margin: 0;
          font-size: 13px;
          color: #666;
          font-family: 'Kanit', sans-serif;
          
          /* ตัดคำถ้ายาวเกิน */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          margin-left: 8px; /* เว้นระยะจากข้อความนิดหน่อย */
        }
      `}</style>
    </div>
  )
}