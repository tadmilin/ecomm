import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslatedText } from '@/utilities/getTranslatedText'
import type { Product, Category } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    lang: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    limit: 1000,
    pagination: false,
  })

  return categories.docs.flatMap((category) => [
    { lang: 'th', slug: category.slug },
    { lang: 'en', slug: category.slug },
    { lang: 'cn', slug: category.slug },
  ])
}

export default async function CategoryDetailPage({ params }: Args) {
  const { lang, slug } = await params
  const payload = await getPayload({ config: configPromise })

  // Get category
  const categoryResult = await payload.find({
    collection: 'categories',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: lang as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categoryResult.docs[0]

  if (!category) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {lang === 'th' && 'ไม่พบหมวดหมู่'}
            {lang === 'en' && 'Category not found'}
            {lang === 'cn' && '未找到类别'}
          </h1>
          <Link href={`/${lang}/categories`} className="text-blue-600 hover:underline">
            {lang === 'th' && '← กลับไปหน้าหมวดหมู่'}
            {lang === 'en' && '← Back to categories'}
            {lang === 'cn' && '← 返回类别'}
          </Link>
        </div>
      </div>
    )
  }

  // Get products in this category
  const productsResult = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: category.id,
      },
    },
    limit: 100,
    depth: 1,
  })

  const categoryTitle =
    typeof category.title === 'string'
      ? category.title
      : getTranslatedText(category.title, lang, 'Untitled Category')

  return (
    <div className="container py-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href={`/${lang}`} className="text-blue-600 hover:underline">
            {lang === 'th' && 'หน้าแรก'}
            {lang === 'en' && 'Home'}
            {lang === 'cn' && '首页'}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${lang}/categories`} className="text-blue-600 hover:underline">
            {lang === 'th' && 'หมวดหมู่'}
            {lang === 'en' && 'Categories'}
            {lang === 'cn' && '类别'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-muted-foreground">{categoryTitle}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            {productsResult.totalDocs} {lang === 'th' && 'สินค้า'}
            {lang === 'en' && 'products'}
            {lang === 'cn' && '产品'}
          </p>
        </div>

        {/* Products Grid */}
        {productsResult.docs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsResult.docs.map((product) => {
              const productName = getTranslatedText(
                product.multilangName,
                lang,
                product.name || 'Untitled Product',
              )
              const productDesc = getTranslatedText(
                product.multilangDescription,
                lang,
                product.description || '',
              )

              const firstImage =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : null
              const imageUrl =
                firstImage && typeof firstImage.image === 'object' && firstImage.image?.url
                  ? firstImage.image.url
                  : null

              return (
                <Link
                  key={product.id}
                  href={`/${lang}/products/${product.id}`}
                  className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {lang === 'th' && 'ไม่มีรูปภาพ'}
                        {lang === 'en' && 'No Image'}
                        {lang === 'cn' && '无图片'}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {productName}
                    </h3>
                    {productDesc && (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {productDesc}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        ฿{product.price?.toLocaleString()}
                      </span>
                      {product.stock !== undefined && product.stock !== null && (
                        <span
                          className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {product.stock > 0
                            ? lang === 'th'
                              ? 'มีสินค้า'
                              : lang === 'en'
                                ? 'In Stock'
                                : '有货'
                            : lang === 'th'
                              ? 'สินค้าหมด'
                              : lang === 'en'
                                ? 'Out of Stock'
                                : '缺货'}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground mb-4">
              {lang === 'th' && 'ยังไม่มีสินค้าในหมวดหมู่นี้'}
              {lang === 'en' && 'No products in this category yet'}
              {lang === 'cn' && '此类别中尚无产品'}
            </p>
            <Link
              href={`/${lang}/categories`}
              className="text-blue-600 hover:underline inline-block"
            >
              {lang === 'th' && '← ดูหมวดหมู่อื่น'}
              {lang === 'en' && '← Browse other categories'}
              {lang === 'cn' && '← 浏览其他类别'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params
  const payload = await getPayload({ config: configPromise })

  const categoryResult = await payload.find({
    collection: 'categories',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: lang as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categoryResult.docs[0]

  if (!category) {
    return {
      title: 'Category not found',
    }
  }

  const categoryTitle =
    typeof category.title === 'string'
      ? category.title
      : getTranslatedText(category.title, lang, 'Untitled Category')

  return {
    title: categoryTitle,
    description:
      lang === 'th'
        ? `สินค้าในหมวดหมู่ ${categoryTitle}`
        : lang === 'en'
          ? `Products in ${categoryTitle}`
          : `${categoryTitle} 中的产品`,
  }
}
