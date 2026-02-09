/**
 * Price Display Utility
 * ใช้สำหรับแสดงราคาสินค้า - ถ้าไม่มีราคาจะแสดง "ราคาพิเศษ"
 */

export type SupportedLang = 'th' | 'en' | 'zh'

export interface PriceDisplayOptions {
  price: number | null | undefined
  compareAtPrice?: number | null
  lang?: SupportedLang
}

/**
 * Format price for display
 * @returns formatted price string or "ราคาพิเศษ" / "Special Price" / "特价"
 */
export function formatPrice(price: number | null | undefined, lang: SupportedLang = 'th'): string {
  if (price === null || price === undefined || price === 0) {
    switch (lang) {
      case 'en':
        return 'Special Price'
      case 'zh':
        return '特价'
      default:
        return 'ราคาพิเศษ'
    }
  }
  return `฿${price.toLocaleString('th-TH')}`
}

/**
 * Check if product has a valid price
 */
export function hasPrice(price: number | null | undefined): boolean {
  return price !== null && price !== undefined && price > 0
}

/**
 * Check if product has discount (compareAtPrice > price)
 */
export function hasDiscount(price: number | null | undefined, compareAtPrice: number | null | undefined): boolean {
  if (!hasPrice(price) || !compareAtPrice) return false
  return compareAtPrice > (price as number)
}

/**
 * Get contact text for products without price
 */
export function getContactText(lang: SupportedLang = 'th'): string {
  switch (lang) {
    case 'en':
      return 'Contact for Price'
    case 'zh':
      return '询价'
    default:
      return 'สอบถามราคา'
  }
}
