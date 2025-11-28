import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { getTranslatedText } from '@/utilities/getTranslatedText'

export const dynamic = 'force-static'
export const revalidate = 600

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

            return (
              <Link
                key={category.id}
                href={`/${lang}/categories/${category.slug}`}
                className="group"
              >
                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h2>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {lang === 'th' && 'ดูสินค้าทั้งหมด →'}
                    {lang === 'en' && 'View all products →'}
                    {lang === 'cn' && '查看所有产品 →'}
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
