import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslatedText } from '@/utilities/getTranslatedText'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // Revalidate every 60 seconds

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

  // Build breadcrumb path dynamically by traversing parents
  const buildBreadcrumbs = async (cat: any): Promise<Array<{ slug: string; title: string }>> => {
    const crumbs: Array<{ slug: string; title: string }> = []
    let current = cat

    while (current.parent) {
      try {
        const parentId = typeof current.parent === 'string' ? current.parent : current.parent.id
        const parent = await payload.findByID({
          collection: 'categories',
          id: parentId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          locale: lang as any,
        })

        const parentTitle =
          typeof parent.title === 'string'
            ? parent.title
            : getTranslatedText(parent.title, lang, 'Category')

        crumbs.unshift({
          slug: parent.slug || '',
          title: parentTitle,
        })

        current = parent
      } catch {
        break
      }
    }

    return crumbs
  }

  const breadcrumbs = await buildBreadcrumbs(category)

  // Get sub-categories
  const subCategoriesResult = await payload.find({
    collection: 'categories',
    where: {
      parent: {
        equals: category.id,
      },
    },
    limit: 100,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: lang as any,
    sort: 'order',
  })

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

  const categoryDescription = category.description || ''

  const categoryImageUrl =
    category.image && typeof category.image === 'object' && category.image.url
      ? category.image.url
      : null

  // Debug breadcrumbs
  console.log('Category breadcrumbs:', category.breadcrumbs)

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

          {/* Show parent breadcrumbs - now using fresh slugs */}
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <span className="mx-2">/</span>
              <Link
                href={`/${lang}/categories/${crumb.slug}`}
                className="text-blue-600 hover:underline"
              >
                {crumb.title}
              </Link>
            </span>
          ))}

          <span className="mx-2">/</span>
          <span className="text-muted-foreground">{categoryTitle}</span>
        </nav>

        {/* Category Header with Image */}
        <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
          {categoryImageUrl && (
            <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
              <Image
                src={categoryImageUrl}
                alt={categoryTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">{categoryTitle}</h1>
            {categoryDescription && (
              <p className="text-lg text-muted-foreground mb-4">{categoryDescription}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {productsResult.totalDocs} {lang === 'th' && 'สินค้า'}
              {lang === 'en' && 'products'}
              {lang === 'cn' && '产品'}
            </p>
          </div>
        </div>

        {/* Sub-Categories Grid */}
        {subCategoriesResult.docs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              {lang === 'th' && 'หมวดหมู่ย่อย'}
              {lang === 'en' && 'Sub-Categories'}
              {lang === 'cn' && '子类别'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {subCategoriesResult.docs.map((subCat) => {
                const subTitle =
                  typeof subCat.title === 'string'
                    ? subCat.title
                    : getTranslatedText(subCat.title, lang, 'Category')
                const subImageUrl =
                  subCat.image && typeof subCat.image === 'object' && subCat.image.url
                    ? subCat.image.url
                    : null

                return (
                  <Link
                    key={subCat.id}
                    href={`/${lang}/categories/${subCat.slug}`}
                    className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    {subImageUrl ? (
                      <div className="relative aspect-square bg-gray-100">
                        <Image
                          src={subImageUrl}
                          alt={subTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl">📁</span>
                      </div>
                    )}
                    <div className="p-3 md:p-4">
                      <h3 className="text-sm md:text-base font-semibold group-hover:text-blue-600 transition-colors line-clamp-2 text-center">
                        {subTitle}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {productsResult.docs.length > 0 ? (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              {lang === 'th' && 'สินค้าในหมวดหมู่นี้'}
              {lang === 'en' && 'Products in this category'}
              {lang === 'cn' && '此类别中的产品'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {productsResult.docs.map((product) => {
                const productName = getTranslatedText(
                  product.multilangName
                    ? {
                        th: product.multilangName.th || '',
                        en: product.multilangName.en || '',
                        zh: product.multilangName.zh || '',
                      }
                    : null,
                  lang,
                  product.name || 'Untitled Product',
                )
                const productDesc = getTranslatedText(
                  product.multilangDescription
                    ? {
                        th: product.multilangDescription.th || '',
                        en: product.multilangDescription.en || '',
                        zh: product.multilangDescription.zh || '',
                      }
                    : null,
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
                    href={`/${lang}/products/${product.slug}`}
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
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs md:text-sm">
                          {lang === 'th' && 'ไม่มีรูปภาพ'}
                          {lang === 'en' && 'No Image'}
                          {lang === 'cn' && '无图片'}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-2 md:p-3 lg:p-4">
                      <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {productName}
                      </h3>
                      {productDesc && (
                        <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2 hidden md:block">
                          {productDesc}
                        </p>
                      )}
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="text-sm md:text-base lg:text-lg font-bold text-blue-600">
                          ฿{product.price?.toLocaleString()}
                        </span>
                        {product.stock !== undefined && product.stock !== null && (
                          <span
                            className={`text-xs md:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
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
          </div>
        ) : subCategoriesResult.docs.length === 0 ? (
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
        ) : null}
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
