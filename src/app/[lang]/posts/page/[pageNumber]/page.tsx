import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/getDictionary'

export const revalidate = 600

type Args = {
  params: Promise<{
    lang: string
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { lang, pageNumber } = await paramsPromise
  const dict = await getDictionary(lang)
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{dict.posts.title}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { lang, pageNumber } = await paramsPromise
  const dict = await getDictionary(lang)
  
  return {
    title: `${dict.posts.meta.title} - Page ${pageNumber || ''}`,
    description: dict.posts.meta.description,
    alternates: {
      languages: {
        'en': `/en/posts/page/${pageNumber}`,
        'th': `/th/posts/page/${pageNumber}`,
        'ja': `/ja/posts/page/${pageNumber}`,
      },
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { lang: string; pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      { lang: 'en', pageNumber: String(i) },
      { lang: 'th', pageNumber: String(i) },
      { lang: 'ja', pageNumber: String(i) }
    )
  }

  return pages
}
