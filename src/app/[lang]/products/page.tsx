import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/AddToCartButton'
import type { Product } from '@/payload-types'
import { getTranslatedText, type MultilangField } from '@/utilities/getTranslatedText'

export const dynamic = 'force-dynamic'
export const revalidate = 60

type Args = {
  params: Promise<{
    lang: string
  }>
}

export default async function ProductsPage({ params: paramsPromise }: Args) {
  const { lang } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 12,
    where: {
      status: {
        equals: 'active',
      },
    },
    sort: '-createdAt',
  })

  if (!products.docs || products.docs.length === 0) {
    return (
      <div className="container py-28">
        <div className="prose max-w-none">
          <h1>Products</h1>
          <p>No products available yet. Import your products using the admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-28">
      <div className="prose max-w-none mb-8">
        <h1>Products</h1>
        <p>
          Browse our collection of {products.totalDocs} products. Use the admin panel to import more
          products from Excel.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {products.docs.map((product) => {
          const typedProduct = product as unknown as Product
          const firstImage =
            typedProduct.images && typedProduct.images.length > 0 ? typedProduct.images[0] : null
          const imageUrl =
            firstImage &&
            typeof firstImage.image === 'object' &&
            'url' in firstImage.image &&
            firstImage.image.url
              ? firstImage.image.url
              : null

          // ดึงข้อความตามภาษา
          const productName = getTranslatedText(
            typedProduct.multilangName as MultilangField,
            lang,
            typedProduct.name,
          )
          const productDescription = getTranslatedText(
            typedProduct.multilangDescription as MultilangField,
            lang,
            typedProduct.description || '',
          )

          return (
            <div
              key={typedProduct.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/${lang}/products/${typedProduct.slug}`}>
                {imageUrl && (
                  <div className="aspect-square bg-gray-100 relative">
                    <Image
                      src={imageUrl}
                      alt={firstImage?.alt || productName}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                )}
              </Link>
              <div className="p-2 md:p-3 lg:p-4 space-y-2 md:space-y-3">
                <Link href={`/${lang}/products/${typedProduct.slug}`}>
                  <div>
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                      {productName}
                    </h3>
                    {productDescription && (
                      <p className="text-xs text-gray-600 line-clamp-1 hidden lg:block">
                        {productDescription}
                      </p>
                    )}
                  </div>
                </Link>

                <div className="flex items-center justify-between flex-wrap gap-1">
                  <div>
                    <p className="text-sm md:text-base lg:text-xl font-bold">
                      ฿{typedProduct.price.toLocaleString('th-TH')}
                    </p>
                    {typedProduct.compareAtPrice &&
                      typedProduct.compareAtPrice > typedProduct.price && (
                        <p className="text-xs md:text-sm text-gray-500 line-through">
                          ฿{typedProduct.compareAtPrice.toLocaleString('th-TH')}
                        </p>
                      )}
                  </div>
                  <div className="text-xs md:text-sm">
                    {typedProduct.stock > 0 ? (
                      <span className="text-green-600 hidden md:inline">
                        {typedProduct.stock} left
                      </span>
                    ) : (
                      <span className="text-red-600">Out</span>
                    )}
                  </div>
                </div>

                <AddToCartButton product={typedProduct} className="w-full text-xs md:text-sm" />

                <div className="flex items-center gap-1 md:gap-2 text-xs text-gray-500 flex-wrap">
                  <span className="bg-gray-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded truncate max-w-full">
                    {typedProduct.sku}
                  </span>
                  {typedProduct.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap">
                      ⭐
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Import More Products</h2>
        <div className="prose prose-sm">
          <p>To import products from Excel:</p>
          <ol>
            <li>
              Install dependencies: <code>npm install xlsx</code>
            </li>
            <li>
              Prepare Excel file following the template in{' '}
              <code>scripts/products-template.csv</code>
            </li>
            <li>
              Run import: <code>node scripts/import-products.js --file your-products.xlsx</code>
            </li>
          </ol>
          <p>
            See <code>scripts/IMPORT_GUIDE.md</code> for detailed instructions.
          </p>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { lang: _lang } = await paramsPromise
  return {
    title: 'Products | E-commerce',
    description: 'Browse our product collection',
  }
}
