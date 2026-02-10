import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslatedText } from '@/utilities/getTranslatedText'
import Link from 'next/link'
import { AddToCartButton } from '@/components/AddToCartButton'
import type { Product, Category } from '@/payload-types'
import { formatPrice, hasPrice, hasDiscount } from '@/utilities/priceUtils'

// ISR: cache หน้า product detail 60 วินาที แทน force-dynamic
export const revalidate = 60
export const dynamicParams = true // อนุญาตให้ render product ที่ไม่ได้ pre-build

type Args = {
  params: Promise<{
    lang: string
    slug: string
  }>
}

// Pre-build ทุก product × 3 ภาษา ตอน build (ลด cold-start)
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 1000,
    pagination: false,
    where: { status: { equals: 'active' } },
  })

  return products.docs.flatMap((product) => [
    { lang: 'th', slug: product.slug },
    { lang: 'en', slug: product.slug },
    { lang: 'cn', slug: product.slug },
  ])
}

// ฟังก์ชันสร้าง breadcrumb path จาก category hierarchy
function buildCategoryPath(category: Category, lang: string): Array<{ title: string; slug: string }> {
  const path: Array<{ title: string; slug: string }> = []
  
  // ฟังก์ชันดึงชื่อตามภาษา
  const getTitle = (cat: Category): string => {
    if (cat.title && typeof cat.title === 'object') {
      return (cat.title as Record<string, string>)[lang] || (cat.title as any).th || (cat.title as any).en || 'Category'
    }
    return typeof cat.title === 'string' ? cat.title : 'Category'
  }
  
  // Recursive function to build path from root to current
  function buildPath(cat: Category) {
    if (cat.parent && typeof cat.parent === 'object') {
      buildPath(cat.parent as Category)
    }
    path.push({
      title: getTitle(cat),
      slug: cat.slug || ''
    })
  }
  
  buildPath(category)
  return path
}

export default async function ProductDetailPage({ params }: Args) {
  const { lang, slug } = await params
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 3, // เพิ่ม depth เพื่อดึง category hierarchy
    limit: 1,
  })

  const product = products.docs[0]

  if (!product) {
    notFound()
  }

  // Get translated text
  const getName = () => {
    if (product.multilangName) {
      const cleaned = {
        th: product.multilangName.th || undefined,
        en: product.multilangName.en || undefined,
        zh: product.multilangName.zh || undefined,
      }
      return getTranslatedText(cleaned, lang, product.name || 'Untitled Product')
    }
    return product.name || 'Untitled Product'
  }

  const getDescription = () => {
    if (product.multilangDescription) {
      const cleaned = {
        th: product.multilangDescription.th || undefined,
        en: product.multilangDescription.en || undefined,
        zh: product.multilangDescription.zh || undefined,
      }
      return getTranslatedText(cleaned, lang, product.description || '')
    }
    return product.description || ''
  }

  const productName = getName()
  const productDescription = getDescription()

  // สร้าง category breadcrumb
  const categoryBreadcrumbs: Array<{ title: string; slug: string }> = []
  if (product.category && Array.isArray(product.category) && product.category.length > 0) {
    const firstCategory = product.category[0]
    if (typeof firstCategory === 'object' && firstCategory !== null) {
      const categoryPath = buildCategoryPath(firstCategory as Category, lang)
      categoryBreadcrumbs.push(...categoryPath)
    }
  }

  const texts = {
    th: { home: 'หน้าแรก', categories: 'หมวดหมู่' },
    en: { home: 'Home', categories: 'Categories' },
    zh: { home: '首页', categories: '分类' },
  }
  const t = texts[lang as keyof typeof texts] || texts.th

  return (
    <div className="container py-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb with Category Hierarchy */}
        <nav className="mb-8 text-sm flex items-center flex-wrap gap-2">
          <Link href={`/${lang}`} className="text-blue-600 hover:underline">
            {t.home}
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={`/${lang}/products`} className="text-blue-600 hover:underline">
            {t.categories}
          </Link>
          
          {/* Category Hierarchy */}
          {categoryBreadcrumbs.map((cat, index) => (
            <React.Fragment key={cat.slug}>
              <span className="text-gray-400">/</span>
              <Link 
                href={`/${lang}/categories/${cat.slug}`}
                className="text-blue-600 hover:underline"
              >
                {cat.title}
              </Link>
            </React.Fragment>
          ))}
          
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {product.images && product.images.length > 0 ? (
              <div className="space-y-4">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {typeof product.images[0].image === 'object' && product.images[0].image?.url && (
                    <Image
                      src={product.images[0].image.url}
                      alt={product.images[0].alt || productName}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.slice(1, 5).map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                      >
                        {typeof img.image === 'object' && img.image?.url && (
                          <Image
                            src={img.image.url}
                            alt={img.alt || `${productName} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-6xl">📦</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{productName}</h1>

            {/* SKU */}
            {product.sku && (
              <p className="text-sm text-gray-500 mb-4">
                {lang === 'th' ? 'รหัสสินค้า' : lang === 'en' ? 'SKU' : '产品编号'}: {product.sku}
              </p>
            )}

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className={`text-3xl font-bold ${hasPrice(product.price) ? 'text-blue-600' : 'text-orange-500'}`}>
                  {formatPrice(product.price, lang as 'th' | 'en' | 'zh')}
                </span>
                {hasDiscount(product.price, product.compareAtPrice) && (
                  <span className="text-xl text-gray-400 line-through">
                    ฿{product.compareAtPrice?.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              {product.status === 'active' && (product.stock || 888) > 0 ? (
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {lang === 'th' ? '✓ มีสินค้า' : lang === 'en' ? '✓ In Stock' : '✓ 有货'}
                  {(product.stock || 888) > 0 && ` (${product.stock || 888})`}
                </span>
              ) : (
                <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  {lang === 'th' ? '✗ สินค้าหมด' : lang === 'en' ? '✗ Out of Stock' : '✗ 缺货'}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="mb-8">
              <AddToCartButton
                product={product as Product}
                className="w-full md:w-auto px-8 py-3 text-base"
              />
            </div>

            {/* Variants */}
            {product.hasVariants &&
              product.variants &&
              Array.isArray(product.variants) &&
              product.variants.length > 0 && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    {lang === 'th'
                      ? 'ตัวเลือกสินค้า'
                      : lang === 'en'
                        ? 'Product Options'
                        : '产品选项'}
                  </h3>
                  <div className="space-y-4">
                    {product.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          {variant.image &&
                            typeof variant.image === 'object' &&
                            variant.image?.url && (
                              <div className="relative w-16 h-16 rounded overflow-hidden">
                                <Image
                                  src={variant.image.url}
                                  alt={variant.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          <div>
                            <p className="font-medium">{variant.name}</p>
                            <div className="text-sm text-gray-500 space-x-2">
                              {variant.options?.size && <span>ขนาด: {variant.options.size}</span>}
                              {variant.options?.color && <span>สี: {variant.options.color}</span>}
                              {variant.options?.type && <span>{variant.options.type}</span>}
                            </div>
                            {variant.sku && (
                              <p className="text-xs text-gray-400 mt-1">SKU: {variant.sku}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {variant.discountPrice ? (
                            <div>
                              <p className="text-lg font-bold text-red-600">
                                ฿{variant.discountPrice.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-400 line-through">
                                ฿{(variant.price || product.price || 0).toLocaleString()}
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg font-bold">
                              {(variant.price || product.price) 
                                ? `฿${(variant.price || product.price || 0).toLocaleString()}`
                                : formatPrice(null, lang as 'th' | 'en' | 'zh')
                              }
                            </p>
                          )}
                          {variant.status === 'active' && variant.stock && variant.stock > 0 ? (
                            <p className="text-xs text-green-600 mt-1">
                              {lang === 'th' ? 'มีสินค้า' : lang === 'en' ? 'Available' : '有货'} (
                              {variant.stock})
                            </p>
                          ) : (
                            <p className="text-xs text-red-600 mt-1">
                              {lang === 'th' ? 'หมด' : lang === 'en' ? 'Sold Out' : '售罄'}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Description */}
            {productDescription && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">
                  {lang === 'th' ? 'รายละเอียดสินค้า' : lang === 'en' ? 'Description' : '产品详情'}
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">{productDescription}</p>
              </div>
            )}

            {/* Specifications */}
            {(product.weight || product.dimensions) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">
                  {lang === 'th' ? 'ข้อมูลจำเพาะ' : lang === 'en' ? 'Specifications' : '规格'}
                </h3>
                <div className="space-y-2 text-sm">
                  {product.weight && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">
                        {lang === 'th' ? 'น้ำหนัก' : lang === 'en' ? 'Weight' : '重量'}:
                      </span>
                      <span className="font-medium">{product.weight} kg</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <>
                      {product.dimensions.length && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">
                            {lang === 'th' ? 'ความยาว' : lang === 'en' ? 'Length' : '长度'}:
                          </span>
                          <span className="font-medium">{product.dimensions.length} cm</span>
                        </div>
                      )}
                      {product.dimensions.width && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">
                            {lang === 'th' ? 'ความกว้าง' : lang === 'en' ? 'Width' : '宽度'}:
                          </span>
                          <span className="font-medium">{product.dimensions.width} cm</span>
                        </div>
                      )}
                      {product.dimensions.height && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">
                            {lang === 'th' ? 'ความสูง' : lang === 'en' ? 'Height' : '高度'}:
                          </span>
                          <span className="font-medium">{product.dimensions.height} cm</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Categories */}
            {product.category && Array.isArray(product.category) && product.category.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2 text-gray-600">
                  {lang === 'th' ? 'หมวดหมู่' : lang === 'en' ? 'Categories' : '类别'}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.category.map((cat, index) => {
                    const catTitle =
                      typeof cat === 'object' && cat !== null
                        ? typeof cat.title === 'string'
                          ? cat.title
                          : cat.title && getTranslatedText(cat.title, lang, 'Category')
                        : 'Category'
                    const catSlug = typeof cat === 'object' && cat !== null ? cat.slug : null
                    const catId = typeof cat === 'object' && cat !== null ? cat.id : `cat-${index}`

                    return catSlug ? (
                      <Link
                        key={catId}
                        href={`/${lang}/categories/${catSlug}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        {catTitle}
                      </Link>
                    ) : (
                      <span key={catId} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {catTitle}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const product = products.docs[0]

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const getName = () => {
    if (product.multilangName) {
      const cleaned = {
        th: product.multilangName.th || undefined,
        en: product.multilangName.en || undefined,
        zh: product.multilangName.zh || undefined,
      }
      return getTranslatedText(cleaned, lang, product.name || 'Product')
    }
    return product.name || 'Product'
  }

  return {
    title: getName(),
    description: product.description || '',
  }
}
