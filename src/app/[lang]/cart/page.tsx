'use client'

import React from 'react'
import { useCart } from '@/providers/CartProvider'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getTranslatedText } from '@/utilities/getTranslatedText'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const params = useParams()
  const lang = (params?.lang as string) || 'th'

  if (items.length === 0) {
    return (
      <div className="container py-28">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">ตะกร้าสินค้า</h1>
          <p className="text-gray-600 mb-8">ตะกร้าของคุณว่างเปล่า</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ซื้อสินค้าต่อ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-28">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">ตะกร้าสินค้า</h1>
          <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-700 underline">
            ล้างตะกร้า
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => {
            const firstImage =
              item.product.images && item.product.images.length > 0 ? item.product.images[0] : null
            const imageUrl =
              firstImage &&
              typeof firstImage.image === 'object' &&
              'url' in firstImage.image &&
              firstImage.image.url
                ? firstImage.image.url
                : null

            // ดึงข้อความตามภาษา
            const multilangName = item.product.multilangName
            const cleanedName = multilangName
              ? {
                  th: multilangName.th || undefined,
                  en: multilangName.en || undefined,
                  zh: multilangName.zh || undefined,
                }
              : undefined
            const productName = cleanedName
              ? getTranslatedText(cleanedName, lang, item.product.name)
              : item.product.name

            return (
              <div key={item.product.id} className="border rounded-lg p-4 flex gap-4">
                {imageUrl && (
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={productName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{productName}</h3>
                  <p className="text-sm text-gray-600 mb-2">SKU: {item.product.sku}</p>
                  <p className="text-lg font-bold text-blue-600">
                    ฿{item.product.price.toLocaleString('th-TH')}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-sm text-red-600 hover:text-red-700 underline"
                  >
                    ลบ
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold">
                    ฿{(item.product.price * item.quantity).toLocaleString('th-TH')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t pt-6">
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex justify-between text-lg">
              <span>จำนวนสินค้าทั้งหมด:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold">
              <span>ราคารวม:</span>
              <span className="text-blue-600">฿{totalPrice.toLocaleString('th-TH')}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              href="/products"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50"
            >
              ซื้อสินค้าต่อ
            </Link>
            <button
              onClick={() => {
                alert(`ราคารวม: ฿${totalPrice.toLocaleString('th-TH')}\nจำนวนสินค้า: ${totalItems}`)
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              คำนวณราคารวม
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
