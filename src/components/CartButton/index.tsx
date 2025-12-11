'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/providers/CartProvider'

export function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:underline"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span>ตะกร้า</span>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
