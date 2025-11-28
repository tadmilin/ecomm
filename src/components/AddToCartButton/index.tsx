'use client'

import React, { useState } from 'react'
import { useCart } from '@/providers/CartProvider'
import type { Product } from '@/payload-types'

type Props = {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className = '' }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const isOutOfStock = product.stock <= 0

  return (
    <button
      onClick={handleClick}
      disabled={isOutOfStock || added}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isOutOfStock
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : added
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
      } ${className}`}
    >
      {isOutOfStock ? 'Out of Stock' : added ? 'Added ✓' : 'Add to Cart'}
    </button>
  )
}
