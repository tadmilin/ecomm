'use client'

import React, { useRef, useState, useEffect } from 'react'
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
  showCountdown?: boolean
  countdownEndDate?: string
}

export const FeaturedProductsComponent: React.FC<FeaturedProductsProps> = ({ 
  title,
  displayMode = 'manual',
  maxProducts = 8,
  selectedProducts,
  sortBy = 'createdAt',
  lang = 'th',
  showCountdown = true,
  countdownEndDate
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // แปลง selectedProducts เป็น Product objects
  const products = React.useMemo(() => {
    if (!selectedProducts || selectedProducts.length === 0) return []
    
    return selectedProducts
      .filter((item): item is Product => typeof item === 'object' && item !== null)
      .slice(0, maxProducts)
  }, [selectedProducts, maxProducts])

  // Countdown timer
  useEffect(() => {
    if (!showCountdown) return

    const targetDate = countdownEndDate 
      ? new Date(countdownEndDate) 
      : new Date(Date.now() + 24 * 60 * 60 * 1000) // Default 24 hours

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [showCountdown, countdownEndDate])

  // Check scroll position
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, [products])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

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
      <div className="container mx-auto px-4 main-container-custom">
        <div className="header-section">
          <div className="title-row">
            {title && <h2 className="section-title">{title}</h2>}
            {showCountdown && (
              <div className="countdown-timer">
                <div className="countdown-item">
                  <div className="countdown-value">{String(countdown.days).padStart(2, '0')}</div>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                  <div className="countdown-value">{String(countdown.hours).padStart(2, '0')}</div>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                  <div className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</div>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                  <div className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="products-container">
          {canScrollLeft && (
            <button className="scroll-btn scroll-btn-left" onClick={() => scroll('left')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          <div className="products-wrapper" ref={scrollContainerRef}>
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
                  {/* Flash Sale Badge */}
                  {hasDiscount && (
                    <div className="flash-sale-badge">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M25 8L18 20H22L17 32L28 18H24L25 8Z" fill="white"/>
                      </svg>
                      <span className="flash-text">FLASH<br/>SALE</span>
                    </div>
                  )}

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
                    <h3 className="product-title">{product.name}</h3>
                  </div>

                  {/* Price Section */}
                  <div className="price-section">
                    <div className="price-row">
                      {hasDiscount && originalPrice > currentPrice && (
                        <>
                          <div className="original-price">฿{formatPrice(originalPrice)}</div>
                          <div className="discount-badge">-{product.discount}%</div>
                        </>
                      )}
                    </div>
                    <div className="current-price">
                      ฿{formatPrice(currentPrice)} <span className="price-unit">/รายการ</span>
                    </div>
                  </div>
                </CMSLink>
              </div>
            )
          })}
        </div>

        {canScrollRight && (
          <button className="scroll-btn scroll-btn-right" onClick={() => scroll('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>

      <style jsx>{`
        .section-bg {
          width: 100%;
          background-color: transparent;
          padding: 10px 0;
          margin-bottom: 0;
        }

        .main-container-custom {
          width: 100%;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px; /* Slightly rounded corners */
          padding: 20px 24px 24px; /* Top padding slightly less, side/bottom standard */
          /* No shadow or very subtle to look flat like prompt if needed, but example has card look */
        }

        .header-section {
          margin-bottom: 24px;
        }

        .title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .section-title {
          font-family: 'Kanit', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #d32f2f;
          margin: 0;
        }

        .countdown-timer {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Kanit', sans-serif;
        }

        .countdown-item {
          background-color: #1a1a1a;
          border-radius: 4px;
          padding: 8px 12px;
          min-width: 50px;
          text-align: center;
        }

        .countdown-value {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }

        .countdown-separator {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          padding: 0 4px;
        }

        .products-container {
          position: relative;
        }

        .products-wrapper {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 16px 0;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .products-wrapper::-webkit-scrollbar {
          display: none;
        }

        .scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.95);
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          color: #333;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .scroll-btn:hover {
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          color: #d32f2f;
        }

        .scroll-btn-left {
          left: -24px;
        }

        .scroll-btn-right {
          right: -24px;
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
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          transform: translateY(-4px);
        }

        .product-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .flash-sale-badge {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ff6b00 0%, #ff8f00 100%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          clip-path: polygon(0 0, 100% 0, 100% 100%);
          padding: 8px 12px 0 0;
        }

        .flash-sale-badge svg {
          width: 24px;
          height: 24px;
          margin-bottom: -4px;
        }

        .flash-text {
          font-family: 'Kanit', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: white;
          text-align: center;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .product-image {
          width: 100%;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          overflow: hidden;
          position: relative;
          padding: 16px;
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
          padding: 12px 16px 8px;
        }

        .product-title {
          font-family: 'Kanit', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 40px;
        }

        .price-section {
          padding: 0 16px 16px;
        }

        .price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .original-price {
          font-family: 'Kanit', sans-serif;
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
        }

        .discount-badge {
          background-color: #d32f2f;
          color: white;
          font-family: 'Kanit', sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .current-price {
          font-family: 'Kanit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #d32f2f;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .price-unit {
          font-size: 11px;
          color: #666;
          font-weight: 400;
        }

        @media (max-width: 1024px) {
          .scroll-btn-left {
            left: 8px;
          }

          .scroll-btn-right {
            right: 8px;
          }

          .product-card {
            width: 260px;
          }
        }

        @media (max-width: 768px) {
          .section-bg {
            padding: 10px 0; /* Reduced outer padding on mobile */
          }

          .main-container-custom {
            padding: 16px 12px; /* Adjusted padding for mobile */
            border-radius: 0; /* Full width on mobile often looks better without radius, or small radius */
            border-radius: 8px; /* Keep consistent with desktop but maybe smaller padding */
          }

          .section-title {
            font-size: 22px;
          }

          .countdown-timer {
            gap: 3px;
          }

          .countdown-item {
            padding: 6px 10px;
            min-width: 45px;
            border-radius: 3px;
          }

          .countdown-value {
            font-size: 20px;
          }

          .countdown-separator {
            font-size: 20px;
            padding: 0 2px;
          }

          .products-wrapper {
            gap: 12px;
            padding: 12px 0;
          }

          .product-card {
            width: 220px;
          }

          .scroll-btn {
            width: 40px;
            height: 40px;
          }

          .scroll-btn-left {
            left: 4px;
          }

          .scroll-btn-right {
            right: 4px;
          }

          .scroll-btn svg {
            width: 20px;
            height: 20px;
          }

          .flash-sale-badge {
            width: 70px;
            height: 70px;
            padding: 6px 10px 0 0;
          }

          .flash-sale-badge svg {
            width: 20px;
            height: 20px;
          }

          .flash-text {
            font-size: 9px;
          }

          .product-image {
            padding: 12px;
          }

          .product-info {
            padding: 10px 12px 6px;
          }

          .product-title {
            font-size: 13px;
            min-height: 36px;
          }

          .price-section {
            padding: 0 12px 12px;
          }

          .current-price {
            font-size: 20px;
          }

          .discount-badge {
            font-size: 11px;
            padding: 2px 6px;
          }
        }

        @media (max-width: 640px) {
          .section-bg {
            padding: 24px 0;
          }

          .section-title {
            font-size: 20px;
          }

          .countdown-item {
            padding: 5px 8px;
            min-width: 38px;
          }

          .countdown-value {
            font-size: 16px;
          }

          .countdown-separator {
            font-size: 16px;
          }

          .products-wrapper {
            gap: 10px;
          }

          .product-card {
            width: 180px;
          }

          .scroll-btn {
            width: 36px;
            height: 36px;
          }

          .scroll-btn svg {
            width: 18px;
            height: 18px;
          }

          .flash-sale-badge {
            width: 60px;
            height: 60px;
            padding: 4px 8px 0 0;
          }

          .flash-sale-badge svg {
            width: 18px;
            height: 18px;
          }

          .flash-text {
            font-size: 8px;
          }

          .product-image {
            padding: 10px;
          }

          .product-info {
            padding: 8px 10px 4px;
          }

          .product-title {
            font-size: 12px;
            min-height: 32px;
          }

          .price-section {
            padding: 0 10px 10px;
          }

          .original-price {
            font-size: 12px;
          }

          .discount-badge {
            font-size: 10px;
            padding: 1px 5px;
          }

          .current-price {
            font-size: 18px;
          }

          .price-unit {
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .section-bg {
            padding: 20px 0;
          }

          .main-container-custom {
             /* Use inherited padding or small padding from above rule */
          }

          .title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .section-title {
            font-size: 18px;
          }

          .countdown-timer {
            gap: 2px;
          }

          .countdown-item {
            padding: 4px 6px;
            min-width: 32px;
          }

          .countdown-value {
            font-size: 14px;
          }

          .countdown-separator {
            font-size: 14px;
          }

          .products-wrapper {
            gap: 8px;
            padding: 10px 0;
          }

          .product-card {
            width: 160px;
          }

          .scroll-btn {
            width: 32px;
            height: 32px;
          }

          .scroll-btn-left {
            left: 2px;
          }

          .scroll-btn-right {
            right: 2px;
          }

          .scroll-btn svg {
            width: 16px;
            height: 16px;
          }

          .flash-sale-badge {
            width: 50px;
            height: 50px;
            padding: 4px 6px 0 0;
          }

          .flash-sale-badge svg {
            width: 14px;
            height: 14px;
            margin-bottom: -2px;
          }

          .flash-text {
            font-size: 7px;
            letter-spacing: 0.3px;
          }

          .product-image {
            padding: 8px;
          }

          .product-info {
            padding: 6px 8px 4px;
          }

          .product-title {
            font-size: 11px;
            min-height: 30px;
            -webkit-line-clamp: 2;
          }

          .price-section {
            padding: 0 8px 8px;
          }

          .price-row {
            gap: 6px;
            margin-bottom: 2px;
          }

          .original-price {
            font-size: 11px;
          }

          .discount-badge {
            font-size: 9px;
            padding: 1px 4px;
            border-radius: 10px;
          }

          .current-price {
            font-size: 16px;
          }

          .price-unit {
            font-size: 9px;
          }
        }

        @media (max-width: 360px) {
          .product-card {
            width: 145px;
          }

          .section-title {
            font-size: 16px;
          }

          .countdown-item {
            padding: 3px 5px;
            min-width: 28px;
          }

          .countdown-value {
            font-size: 12px;
          }

          .countdown-separator {
            font-size: 12px;
          }

          .flash-sale-badge {
            width: 45px;
            height: 45px;
          }

          .flash-sale-badge svg {
            width: 12px;
            height: 12px;
          }

          .flash-text {
            font-size: 6px;
          }

          .product-title {
            font-size: 10px;
            min-height: 28px;
          }

          .current-price {
            font-size: 14px;
          }

          .original-price {
            font-size: 10px;
          }

          .discount-badge {
            font-size: 8px;
          }
        }
      `}</style>
    </div>
  )
}
