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
    <div style={{ width: '100%', backgroundColor: '#f0f0f0', padding: '20px 0' }}>
      <div className="container">
        <div className="scroll-container">
          <style jsx>{`
            .scroll-container {
              display: flex;
              overflow-x: auto;
              gap: 12px;
              padding-bottom: 10px;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scroll-container::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="menu-card"
              >
                <style jsx>{`
                  .menu-card {
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 10px;
                    min-width: 280px;
                    max-width: 300px;
                    text-decoration: none;
                    color: #333;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    border: 1px solid transparent;
                  }
                  .menu-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                  }
                `}</style>

                {/* card-image */}
                <div className="card-image">
                  <style jsx>{`
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
                  `}</style>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      backgroundColor: '#f5f5f5'
                    }}>
                      📦
                    </div>
                  )}
                </div>

                {/* card-content */}
                <div className="card-content">
                  <style jsx>{`
                    .card-content {
                      flex-grow: 1;
                      overflow: hidden;
                    }
                    .card-content h3 {
                      margin: 0;
                      font-size: 16px;
                      font-weight: 600;
                      color: #000;
                      margin-bottom: 2px;
                      font-family: 'Kanit', sans-serif;
                    }
                    .card-content p {
                      margin: 0;
                      font-size: 13px;
                      color: #666;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      font-family: 'Kanit', sans-serif;
                    }
                  `}</style>
                  <h3>{category.title}</h3>
                  {category.description && (
                    <p>{category.description}</p>
                  )}
                </div>

                {/* card-arrow */}
                <div className="card-arrow">
                  <style jsx>{`
                    .card-arrow {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 24px;
                      height: 24px;
                    }
                  `}</style>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </CMSLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
