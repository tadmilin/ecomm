import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { FeaturedProductsComponent } from './Component'
import type { FeaturedProductsBlock as FeaturedProductsBlockType } from '@/payload-types'

export const FeaturedProductsBlock: React.FC<
  FeaturedProductsBlockType & {
    lang?: string
  }
> = async (props) => {
  const { 
    title, 
    displayMode = 'manual', 
    maxProducts = 8, 
    selectedProducts,
    sortBy = 'createdAt',
    lang 
  } = props

  let productsToDisplay = selectedProducts || []

  // ถ้าเป็นโหมด Auto ให้ดึงข้อมูลจาก database
  if (displayMode?.startsWith('auto')) {
    try {
      const payload = await getPayload({ config })
      
      // กำหนด where condition ตามโหมด
      let whereCondition: any = {
        status: { equals: 'active' }
      }

      if (displayMode === 'auto-featured') {
        whereCondition.featured = { equals: true }
      } else if (displayMode === 'auto-new') {
        whereCondition.isNew = { equals: true }
      } else if (displayMode === 'auto-discount') {
        whereCondition.discount = { greater_than: 0 }
      }

      // กำหนด sort
      let sort: string = '-createdAt'
      if (sortBy === 'price-asc') {
        sort = 'price'
      } else if (sortBy === 'price-desc') {
        sort = '-price'
      } else if (sortBy === 'name-asc') {
        sort = 'name'
      }

      const { docs } = await payload.find({
        collection: 'products',
        where: whereCondition,
        limit: maxProducts ?? 8,
        sort,
        depth: 2, // เพื่อ populate images และ relationships อื่นๆ
      })

      productsToDisplay = docs
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return (
    <FeaturedProductsComponent
      title={title ?? undefined}
      displayMode={displayMode}
      maxProducts={maxProducts ?? undefined}
      selectedProducts={productsToDisplay}
      sortBy={sortBy ?? undefined}
      lang={lang}
    />
  )
}
