import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product, Category, Media } from '@/payload-types'
import { getTranslatedText, type MultilangField } from '@/utilities/getTranslatedText'
import { formatPrice, hasPrice, hasDiscount } from '@/utilities/priceUtils'

export const dynamic = 'force-dynamic'
export const revalidate = 60

type Args = {
  params: Promise<{
    lang: string
  }>
}

// Category Tree Node
interface CategoryNode {
  category: Category
  children: CategoryNode[]
  products: Product[]
  totalProducts: number // รวมสินค้าใน children ด้วย
}

// ดึงชื่อ category ตามภาษา
function getCategoryTitle(category: Category, lang: string): string {
  if (category.title && typeof category.title === 'object') {
    return (category.title as Record<string, string>)[lang] || (category.title as any).th || (category.title as any).en || 'Category'
  }
  return typeof category.title === 'string' ? category.title : 'Category'
}

// สร้าง category tree
function buildCategoryTree(
  categories: Category[],
  productsByCategory: Map<string, Product[]>
): CategoryNode[] {
  const categoryMap = new Map<string, Category>()
  categories.forEach(cat => categoryMap.set(cat.id, cat))
  
  // หา root categories (ไม่มี parent)
  const rootCategories = categories.filter(cat => !cat.parent)
  
  // Recursive function to build tree
  function buildNode(category: Category): CategoryNode {
    const children = categories
      .filter(cat => {
        const parentId = typeof cat.parent === 'string' ? cat.parent : cat.parent?.id
        return parentId === category.id
      })
      .map(child => buildNode(child))
      .sort((a, b) => (a.category.order ?? 0) - (b.category.order ?? 0))
    
    const directProducts = productsByCategory.get(category.id) || []
    
    // คำนวณ total products รวม children
    const childrenProducts = children.reduce((sum, child) => sum + child.totalProducts, 0)
    
    return {
      category,
      children,
      products: directProducts,
      totalProducts: directProducts.length + childrenProducts,
    }
  }
  
  return rootCategories
    .map(cat => buildNode(cat))
    .filter(node => node.totalProducts > 0) // แสดงเฉพาะที่มีสินค้า
    .sort((a, b) => (a.category.order ?? 0) - (b.category.order ?? 0))
}

export default async function ProductsPage({ params: paramsPromise }: Args) {
  const { lang } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  // ดึงหมวดหมู่ทั้งหมด (ทุก level)
  const categoriesResult = await payload.find({
    collection: 'categories',
    depth: 2,
    limit: 500,
    sort: 'order',
  })

  // ดึงสินค้าทั้งหมดที่ active พร้อม category
  const productsResult = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 1000,
    where: {
      status: {
        equals: 'active',
      },
    },
    sort: '-createdAt',
  })

  // จัดกลุ่มสินค้าตาม category
  const productsByCategory = new Map<string, Product[]>()
  
  productsResult.docs.forEach((product) => {
    const typedProduct = product as unknown as Product
    if (typedProduct.category && Array.isArray(typedProduct.category)) {
      typedProduct.category.forEach((cat) => {
        const categoryId = typeof cat === 'string' ? cat : cat?.id
        if (categoryId) {
          if (!productsByCategory.has(categoryId)) {
            productsByCategory.set(categoryId, [])
          }
          productsByCategory.get(categoryId)!.push(typedProduct)
        }
      })
    }
  })

  // สร้าง category tree
  const categoryTree = buildCategoryTree(
    categoriesResult.docs as Category[],
    productsByCategory
  )

  // ข้อความตามภาษา
  const texts = {
    th: {
      title: 'สินค้าทั้งหมด',
      subtitle: 'เลือกซื้อสินค้าคุณภาพจากหมวดหมู่ต่างๆ',
      viewAll: 'ดูทั้งหมด',
      viewCategory: 'ดูหมวดหมู่',
      inStock: 'มีสินค้า',
      outOfStock: 'หมด',
      noProducts: 'ยังไม่มีสินค้าในขณะนี้',
      items: 'รายการ',
    },
    en: {
      title: 'All Products',
      subtitle: 'Browse quality products from various categories',
      viewAll: 'View All',
      viewCategory: 'View Category',
      inStock: 'In Stock',
      outOfStock: 'Out',
      noProducts: 'No products available at the moment',
      items: 'items',
    },
    zh: {
      title: '所有产品',
      subtitle: '浏览各类优质产品',
      viewAll: '查看全部',
      viewCategory: '查看分类',
      inStock: '有货',
      outOfStock: '缺货',
      noProducts: '暂无产品',
      items: '件商品',
    },
  }
  
  const t = texts[lang as keyof typeof texts] || texts.th

  if (categoryTree.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{t.title}</h1>
            <p className="text-gray-600">{t.noProducts}</p>
          </div>
        </div>
      </div>
    )
  }

  // Component: Product Card
  const ProductCard = ({ product }: { product: Product }) => {
    const firstImage = product.images && product.images.length > 0 ? product.images[0] : null
    const productImageUrl =
      firstImage &&
      typeof firstImage.image === 'object' &&
      'url' in firstImage.image &&
      firstImage.image.url
        ? firstImage.image.url
        : null

    const productName = getTranslatedText(
      product.multilangName as MultilangField,
      lang,
      product.name,
    )

    return (
      <Link
        href={`/${lang}/products/${product.slug}`}
        className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200"
      >
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          {productImageUrl ? (
            <Image
              src={productImageUrl}
              alt={firstImage?.alt || productName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {hasDiscount(product.price, product.compareAtPrice) && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
          {(product.stock ?? 888) <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {t.outOfStock}
              </span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
            {productName}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-base md:text-lg font-bold ${hasPrice(product.price) ? 'text-blue-600' : 'text-orange-500'}`}>
              {formatPrice(product.price, lang as 'th' | 'en' | 'zh')}
            </span>
            {hasDiscount(product.price, product.compareAtPrice) && (
              <span className="text-xs text-gray-400 line-through">
                ฿{product.compareAtPrice?.toLocaleString('th-TH')}
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Component: Sub-category Card (Level 2 & 3)
  const SubCategoryCard = ({ node, level }: { node: CategoryNode; level: number }) => {
    const categoryImage = node.category.image as Media | null
    const imageUrl = categoryImage && typeof categoryImage === 'object' && categoryImage.url 
      ? categoryImage.url 
      : null

    return (
      <Link
        href={`/${lang}/categories/${node.category.slug}`}
        className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
          ${level === 2 
            ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-100 hover:border-blue-200' 
            : 'bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200'
          }`}
      >
        {/* Image */}
        <div className={`flex-shrink-0 rounded-lg overflow-hidden bg-white
          ${level === 2 ? 'w-14 h-14' : 'w-12 h-12'}`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={getCategoryTitle(node.category, lang)}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-xl">{level === 2 ? '📁' : '📄'}</span>
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-gray-800 group-hover:text-blue-600 truncate
            ${level === 2 ? 'text-base' : 'text-sm'}`}
          >
            {getCategoryTitle(node.category, lang)}
          </h4>
          <p className="text-xs text-gray-500">
            {node.totalProducts} {t.items}
          </p>
        </div>
        
        {/* Arrow */}
        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    )
  }

  // Component: Category Section (Level 1 - Main Category)
  const CategorySection = ({ node }: { node: CategoryNode }) => {
    const categoryImage = node.category.image as Media | null
    const imageUrl = categoryImage && typeof categoryImage === 'object' && categoryImage.url 
      ? categoryImage.url 
      : null

    const hasChildren = node.children.length > 0
    const hasDirectProducts = node.products.length > 0

    return (
      <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Category Header - Clickable */}
        <Link href={`/${lang}/categories/${node.category.slug}`} className="block">
          <div className="relative group">
            {imageUrl ? (
              <div className="relative h-32 md:h-40 bg-gradient-to-r from-gray-800 to-gray-600">
                <Image
                  src={imageUrl}
                  alt={getCategoryTitle(node.category, lang)}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
                        <Image
                          src={imageUrl}
                          alt={getCategoryTitle(node.category, lang)}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-200 transition-colors">
                          {getCategoryTitle(node.category, lang)}
                        </h2>
                        <p className="text-white/80 text-sm md:text-base">
                          {node.totalProducts} {t.items}
                          {hasChildren && ` • ${node.children.length} ${lang === 'th' ? 'หมวดหมู่ย่อย' : 'subcategories'}`}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                        <span className="text-sm">{t.viewCategory}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-6 md:py-8 group-hover:from-blue-700 group-hover:to-blue-600 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {getCategoryTitle(node.category, lang)}
                    </h2>
                    <p className="text-white/80 text-sm md:text-base">
                      {node.totalProducts} {t.items}
                      {hasChildren && ` • ${node.children.length} ${lang === 'th' ? 'หมวดหมู่ย่อย' : 'subcategories'}`}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm">{t.viewCategory}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Sub-categories (Level 2) */}
          {hasChildren && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {lang === 'th' ? 'หมวดหมู่ย่อย' : lang === 'zh' ? '子分类' : 'Subcategories'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {node.children.map((child) => (
                  <div key={child.category.id}>
                    <SubCategoryCard node={child} level={2} />
                    
                    {/* Level 3 children */}
                    {child.children.length > 0 && (
                      <div className="ml-4 mt-2 space-y-2">
                        {child.children.slice(0, 3).map((grandchild) => (
                          <SubCategoryCard key={grandchild.category.id} node={grandchild} level={3} />
                        ))}
                        {child.children.length > 3 && (
                          <Link
                            href={`/${lang}/categories/${child.category.slug}`}
                            className="block text-center text-sm text-blue-600 hover:text-blue-800 py-2"
                          >
                            +{child.children.length - 3} {lang === 'th' ? 'หมวดหมู่เพิ่มเติม' : 'more'}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Products (if any) */}
          {hasDirectProducts && (
            <div>
              {hasChildren && (
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {lang === 'th' ? 'สินค้าในหมวดหมู่นี้' : lang === 'zh' ? '本分类商品' : 'Products in this category'}
                </h3>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {node.products.slice(0, 5).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {node.products.length > 5 && (
                <div className="mt-4 text-center">
                  <Link
                    href={`/${lang}/categories/${node.category.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {t.viewAll} ({node.products.length})
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* If only has children, no direct products - show preview of children's products */}
          {!hasDirectProducts && hasChildren && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {lang === 'th' ? 'ตัวอย่างสินค้า' : lang === 'zh' ? '商品预览' : 'Product Preview'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {node.children
                  .flatMap(child => [...child.products, ...child.children.flatMap(gc => gc.products)])
                  .slice(0, 5)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.title}</h1>
          <p className="text-blue-100 text-lg">{t.subtitle}</p>
          <p className="text-blue-200 text-sm mt-2">
            {categoryTree.length} {lang === 'th' ? 'หมวดหมู่หลัก' : 'main categories'} • {productsResult.totalDocs} {t.items}
          </p>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Category Tree */}
        <div className="space-y-8 md:space-y-12">
          {categoryTree.map((node) => (
            <CategorySection key={node.category.id} node={node} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { lang } = await paramsPromise
  
  const titles = {
    th: 'สินค้าทั้งหมด | วิวัฒน์พานิช',
    en: 'All Products | Wiwatphanich',
    zh: '所有产品 | 维瓦潘尼',
  }
  
  const descriptions = {
    th: 'เลือกซื้อสินค้าวัสดุก่อสร้างคุณภาพ ปูนซีเมนต์ เหล็ก หลังคา และอื่นๆ',
    en: 'Browse quality construction materials - cement, steel, roofing and more',
    zh: '浏览优质建筑材料 - 水泥、钢材、屋顶材料等',
  }
  
  return {
    title: titles[lang as keyof typeof titles] || titles.th,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.th,
  }
}
