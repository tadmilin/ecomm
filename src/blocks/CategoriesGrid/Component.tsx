import type { Category, Media, CategoriesGridBlock as CategoriesGridBlockProps } from '@/payload-types'
import type { Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { CategoriesCarousel } from './CategoriesCarousel'

export const CategoriesGridBlock: React.FC<
  CategoriesGridBlockProps & {
    id?: string
    lang?: string
  }
> = async (props) => {
  const { 
    id, 
    introContent, 
    showOnlyRootCategories = false, 
    showOnlyFeatured = false,
    columns = '6',
    rows = '2',
    showDescription = false,
    imageStyle = 'square',
    lang = 'th'
  } = props

  const payload = await getPayload({ config: configPromise })

  // Calculate items per page for carousel (columns x rows)
  const columnsNum = parseInt(columns || '6', 10)
  const rowsNum = parseInt(rows || '2', 10)

  // Build query conditions
  const whereConditions: Where = {}
  
  if (showOnlyRootCategories) {
    whereConditions.parent = {
      exists: false,
    }
  }
  
  if (showOnlyFeatured) {
    whereConditions.featured = {
      equals: true,
    }
  }

  const hasConditions = Object.keys(whereConditions).length > 0

  const fetchedCategories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100, // Fetch all categories
    locale: lang as 'th' | 'en' | 'cn',
    sort: 'order',
    ...(hasConditions ? { where: whereConditions } : {}),
  })

  const categories = fetchedCategories.docs as Category[]

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="my-6" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-4">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      
      <div className="container mx-auto">
        <div className="bg-white rounded-lg p-4 md:p-6">
          <CategoriesCarousel
            categories={categories}
            columns={columns || '6'}
            rows={rows || '2'}
            showDescription={showDescription || false}
            imageStyle={imageStyle || 'square'}
            lang={lang}
          />
        </div>
      </div>
    </div>
  )
}
