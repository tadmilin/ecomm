import type { Category, Media, CategoriesGridBlock as CategoriesGridBlockProps } from '@/payload-types'
import type { Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'

export const CategoriesGridBlock: React.FC<
  CategoriesGridBlockProps & {
    id?: string
    lang?: string
  }
> = async (props) => {
  const { 
    id, 
    introContent, 
    showOnlyRootCategories = true, 
    showOnlyFeatured = false,
    limit = 12, 
    columns = '4',
    showDescription = false,
    imageStyle = 'square',
    lang = 'th'
  } = props

  const payload = await getPayload({ config: configPromise })

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
    limit: limit || 12,
    locale: lang as 'th' | 'en' | 'cn',
    sort: 'order',
    ...(hasConditions ? { where: whereConditions } : {}),
  })

  const categories = fetchedCategories.docs as Category[]

  // Column class mapping
  const columnClasses: Record<string, string> = {
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-2 sm:grid-cols-3',
    '4': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    '5': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    '6': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  }

  // Image style classes
  const imageStyleClasses: Record<string, string> = {
    square: 'aspect-square rounded-lg',
    circle: 'aspect-square rounded-full',
    rectangle: 'aspect-[4/3] rounded-lg',
  }

  const getTitle = (category: Category): string => {
    if (typeof category.title === 'string') {
      return category.title
    }
    return 'Category'
  }

  const getDescription = (category: Category): string | null => {
    if (typeof category.description === 'string') {
      return category.description
    }
    return null
  }

  const getImageUrl = (category: Category): string | null => {
    const image = category.image as Media | null
    if (image && typeof image === 'object' && image.url) {
      return image.url
    }
    return null
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-8">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      
      <div className="container">
        <div className={`grid gap-4 md:gap-6 ${columnClasses[columns || '4'] || columnClasses['4']}`}>
          {categories.map((category) => {
            const imageUrl = getImageUrl(category)
            const title = getTitle(category)
            const description = getDescription(category)
            const slug = category.slug || category.id

            return (
              <Link
                key={category.id}
                href={`/${lang}/categories/${slug}`}
                className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20"
              >
                {/* Image */}
                <div className={`relative overflow-hidden bg-gray-100 ${imageStyleClasses[imageStyle || 'square'] || imageStyleClasses['square']}`}>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <svg 
                        className="w-16 h-16" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-center">
                    {title}
                  </h3>
                  {showDescription && description && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2 text-center">
                      {description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
