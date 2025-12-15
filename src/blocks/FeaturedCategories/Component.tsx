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
    <div style={{ width: '100%', backgroundColor: '#ffffff', padding: '40px 0 48px' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          overflowX: 'auto',
          paddingBottom: '8px'
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
                    width: 340px;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    gap: 0;
                    background-color: #ffffff;
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
                    padding: 0;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    overflow: hidden;
                  }
                  .featured-category-card:hover {
                    background-color: #f8f9fa;
                    border-color: #2196f3;
                    box-shadow: 0 4px 12px rgba(33,150,243,0.2);
                    transform: translateY(-2px);
                  }
                `}</style>

                {/* Image */}
                <div style={{
                  flexShrink: 0,
                  width: '100px',
                  height: '100px',
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5'
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
                      fontSize: '36px'
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
                  padding: '16px 20px',
                  minWidth: 0
                }}>
                  <h3 style={{
                    fontFamily: 'Kanit, sans-serif',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: '#1a1a1a',
                    lineHeight: '1.3',
                    marginBottom: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {category.title}
                  </h3>
                  {category.description && (
                    <p style={{
                      fontFamily: 'Kanit, sans-serif',
                      fontSize: '13px',
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
