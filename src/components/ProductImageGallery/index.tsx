'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductMedia } from '@/payload-types'

interface ImageItem {
  image: string | ProductMedia
  alt?: string | null
  id?: string | null
}

interface ProductImageGalleryProps {
  images: ImageItem[]
  productName: string
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-6xl">📦</span>
      </div>
    )
  }

  const selectedImage = images[selectedIndex]
  const imageUrl =
    typeof selectedImage.image === 'object' && selectedImage.image?.url
      ? selectedImage.image.url
      : typeof selectedImage.image === 'string'
        ? selectedImage.image
        : undefined
  const imageAlt =
    selectedImage.alt ||
    (typeof selectedImage.image === 'object' && selectedImage.image?.alt
      ? selectedImage.image.alt
      : undefined) ||
    productName

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-6xl">📦</span>
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Always show if there are images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
          {images.map((img, index) => {
            const thumbUrl =
              typeof img.image === 'object' && img.image?.url
                ? img.image.url
                : typeof img.image === 'string'
                  ? img.image
                  : undefined
            const thumbAlt =
              img.alt ||
              (typeof img.image === 'object' && img.image?.alt ? img.image.alt : undefined) ||
              `${productName} ${index + 1}`

            return (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden transition-all ${
                  selectedIndex === index
                    ? 'ring-4 ring-blue-500 scale-105'
                    : 'ring-2 ring-gray-200 hover:ring-gray-300 opacity-70 hover:opacity-100'
                }`}
              >
                {thumbUrl ? (
                  <Image
                    src={thumbUrl}
                    alt={thumbAlt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">📦</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
