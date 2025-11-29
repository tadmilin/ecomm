import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslatedText } from '@/utilities/getTranslatedText'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Args = {
  params: Promise<{
    lang: string
  }>
}

export default async function CategoriesPage({ params }: Args) {
  const { lang } = await params
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: lang as any,
  })

  return (
    <div className="container py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {lang === 'th' && 'หมวดหมู่สินค้า'}
          {lang === 'en' && 'Product Categories'}
          {lang === 'cn' && '产品类别'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.docs.map((category) => {
            const title =
              typeof category.title === 'string'
                ? category.title
                : getTranslatedText(category.title, lang, 'Untitled Category')

            const description =
              typeof category.description === 'string'
                ? category.description
                : category.description
                  ? getTranslatedText(category.description, lang, '')
                  : ''

            const imageUrl =
              category.image && typeof category.image === 'object' && category.image.url
                ? category.image.url
                : null

            return (
              <Link
                key={category.id}
                href={`/${lang}/categories/${category.slug}`}
                className="group"
              >
                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                  {/* Category Image */}
                  {imageUrl ? (
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl">📁</span>
                    </div>
                  )}

                  {/* Category Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {title}
                      </h2>
                      {description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {description}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {lang === 'th' && 'ดูสินค้าทั้งหมด →'}
                      {lang === 'en' && 'View all products →'}
                      {lang === 'cn' && '查看所有产品 →'}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {categories.docs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {lang === 'th' && 'ยังไม่มีหมวดหมู่สินค้า'}
            {lang === 'en' && 'No categories found'}
            {lang === 'cn' && '未找到类别'}
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === 'th' ? 'หมวดหมู่สินค้า' : lang === 'en' ? 'Product Categories' : '产品类别',
    description:
      lang === 'th'
        ? 'เลือกดูสินค้าตามหมวดหมู่'
        : lang === 'en'
          ? 'Browse products by category'
          : '按类别浏览产品',
  }
}
