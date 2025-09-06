import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'

type Args = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{
    q: string
  }>
}

export default async function SearchPage({ 
  params,
  searchParams: searchParamsPromise 
}: Args) {
  const { lang } = await params
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">{dict.search.title}</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search placeholder={dict.search.placeholder} />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">{dict.search.no_results}</div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  
  return {
    title: dict.search.meta.title,
    description: dict.search.meta.description,
    alternates: {
      canonical: `/${lang}/search`,
      languages: {
        'en': '/en/search',
        'th': '/th/search',
        'ja': '/ja/search',
      },
    },
  }
}
