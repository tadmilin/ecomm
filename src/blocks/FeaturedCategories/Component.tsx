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
    <div style={{ width: '100%', backgroundColor: '#f5f5f5', padding: '32px 0' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          overflowX: 'auto',
          paddingBottom: '16px'
        }}>
          {categories.map((category, index) => {
            const image = category.image as Media
            const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

            return (
              <CMSLink
                key={category.id || index}
                {...category.link}
                className="featured-category-card"
              >
                <style jsx>{`
                  .featured-category-card {
                    flex-shrink: 0;
                    width: 360px;
                    height: 140px;
                    display: flex;
                    align-items: stretch;
                    gap: 0;
                    background-color: #ffffff;
                    border-radius: 12px;
                    border: 1px solid #e0e0e0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    padding: 0;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    overflow: hidden;
                  }
                  .featured-category-card:hover {
                    background-color: #e3f2fd;
                    border-color: #2196f3;
                    box-shadow: 0 4px 12px rgba(33,150,243,0.3);
                  }
                `}</style>

                {/* Image */}
                <div style={{
                  flexShrink: 0,
                  width: '140px',
                  height: '140px',
                  overflow: 'hidden',
                  backgroundColor: '#f9f9f9'
                }}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title || 'Category'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px'
                    }}>
                      📦
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '20px 24px',
                  minWidth: 0
                }}>
                  <h3 style={{
                    fontFamily: 'Kanit, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#1a1a1a',
                    lineHeight: '1.3',
                    marginBottom: '6px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {category.title}
                  </h3>
                  {category.description && (
                    <p style={{
                      fontFamily: 'Kanit, sans-serif',
                      fontSize: '14px',
                      color: '#666666',
                      lineHeight: '1.4',
                      margin: 0,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    } as React.CSSProperties}>
                      {category.description}
                    </p>
                  )}
                </div>
              </CMSLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
