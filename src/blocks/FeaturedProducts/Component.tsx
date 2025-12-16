'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'
import type { Media, Product } from '@/payload-types'

interface FeaturedProductsProps {
  title?: string
  displayMode?: 'auto-featured' | 'auto-new' | 'auto-discount' | 'manual'
  maxProducts?: number
  selectedProducts?: (string | Product)[]
  sortBy?: 'createdAt' | 'price-asc' | 'price-desc' | 'name-asc'
  lang?: string
}

export const FeaturedProductsComponent: React.FC<FeaturedProductsProps> = ({ 
  title,
  displayMode = 'manual',
  maxProducts = 8,
  selectedProducts,
  sortBy = 'createdAt',
  lang = 'th' 
}) => {
  // แปลง selectedProducts เป็น Product objects
  const products = React.useMemo(() => {
    if (!selectedProducts || selectedProducts.length === 0) return []
    
    return selectedProducts
      .filter((item): item is Product => typeof item === 'object' && item !== null)
      .slice(0, maxProducts)
  }, [selectedProducts, maxProducts])

  if (!products || products.length === 0) {
    return (
      <div className="section-bg">
        <div className="main-container">
          <p style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            {displayMode?.startsWith('auto') 
              ? 'ไม่พบสินค้าที่ตรงเงื่อนไข กรุณาเพิ่มสินค้าใน Products collection'
              : 'กรุณาเลือกสินค้าที่ต้องการแสดง'}
          </p>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price)
  }

  return (
    <div className="section-bg">
      <div className="main-container">
        {title && <h2 className="section-title">{title}</h2>}
        
        <div className="products-wrapper">
          {products.map((product, index) => {
            // ดึงรูปภาพแรกจาก images array
            const firstImage = product.images && product.images.length > 0 
              ? product.images[0].image 
              : null
            const image = firstImage as Media | null
            const imageUrl = image?.url || ''

            // คำนวณราคา
            const originalPrice = product.compareAtPrice || product.price
            const currentPrice = product.price
            const hasDiscount = product.discount && product.discount > 0
            
            // ดึง badges
            const badges = product.badges?.map(b => b.badge).filter(Boolean) || []

            return (
              <div key={product.id || index} className="product-card">
                <CMSLink
                  type="custom"
                  url={`/products/${product.slug}`}
                  label={product.name || ''}
                  className="product-link"
                >
                  {/* Badges */}
                  <div className="badges-container">
                    {hasDiscount && (
                      <div className="badge-discount">-{product.discount}%</div>
                    )}
                    {product.isNew && (
                      <div className="badge-new">NEW</div>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="product-image">
                    {image ? (
                      <MediaComponent
                        resource={image}
                        imgClassName="product-img"
                      />
                    ) : (
                      <div className="placeholder-icon">📦</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    {product.brand && (
                      <div className="product-brand">{product.brand}</div>
                    )}
                    <h3 className="product-title">{product.name}</h3>
                    {product.productCode && (
                      <p className="product-code">รหัสสินค้า: {product.productCode}</p>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="price-section">
                    {hasDiscount && originalPrice > currentPrice && (
                      <div className="original-price">฿{formatPrice(originalPrice)}</div>
                    )}
                    <div className="current-price">
                      {formatPrice(currentPrice)}
                      <span className="price-unit">/EACH</span>
                    </div>
                  </div>

                  {/* Special Badges */}
                  {badges.length > 0 && (
                    <div className="special-badges">
                      {badges.map((badge, idx) => (
                        <div key={idx} className="special-badge">{badge}</div>
                      ))}
                    </div>
                  )}
                </CMSLink>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="btn-favorite" aria-label="Add to favorites">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                  <button className="btn-compare" aria-label="Compare product">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .section-bg {
          width: 100%;
          background-color: #ffffff;
          padding: 40px 0;
        }

        .main-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding-left: 16px;
          padding-right: 16px;
        }

        .section-title {
          font-family: 'Kanit', sans-serif;
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 24px;
        }

        .products-wrapper {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 16px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .products-wrapper::-webkit-scrollbar {
          display: none;
        }

        .product-card {
          position: relative;
          flex-shrink: 0;
          width: 280px;
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        .product-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .badges-container {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .badge-discount {
          background-color: #c62828;
          color: white;
          font-family: 'Kanit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .badge-new {
          background-color: #ff9800;
          color: white;
          font-family: 'Kanit', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 4px;
          text-align: center;
        }

        .product-image {
          width: 100%;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f9;
          overflow: hidden;
          position: relative;
        }

        .product-image :global(.product-img) {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image :global(.product-img) {
          transform: scale(1.05);
        }

        .placeholder-icon {
          font-size: 64px;
        }

        .product-info {
          padding: 16px;
        }

        .product-brand {
          font-family: 'Kanit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .product-title {
          font-family: 'Kanit', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          line-height: 1.4;
          margin: 0 0 8px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 40px;
        }

        .product-code {
          font-family: 'Kanit', sans-serif;
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .price-section {
          padding: 0 16px 16px;
        }

        .original-price {
          font-family: 'Kanit', sans-serif;
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
          margin-bottom: 4px;
        }

        .current-price {
          font-family: 'Kanit', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #c62828;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .price-unit {
          font-size: 12px;
          color: #666;
          font-weight: 400;
        }

        .special-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 0 16px 16px;
        }

        .special-badge {
          font-family: 'Kanit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          background-color: #4caf50;
          color: white;
        }

        .action-buttons {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }

        .btn-favorite,
        .btn-compare {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #666;
        }

        .btn-favorite:hover,
        .btn-compare:hover {
          background-color: #ffffff;
          color: #c62828;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        @media (max-width: 768px) {
          .product-card {
            width: 240px;
          }

          .paspect-ratio: 1 / 1{
            height: 200px;
          }

          .section-title {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  )
}
