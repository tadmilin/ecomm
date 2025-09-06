import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { homeStatic } from '@/endpoints/seed/home-static'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import React from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const page = await queryPageBySlug({ slug: 'home' })

  return generateMeta({ doc: page }) || {
    title: 'Payload Website Template',
    description: 'A modern website built with Payload CMS',
    alternates: {
      canonical: `/${lang}`,
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { isEnabled: draft } = await draftMode()

  let page = await queryPageBySlug({ slug: 'home' })

  // ใช้ข้อมูลจากฐานข้อมูลก่อน ถ้าไม่มีค่อยใช้ static
  if (!page) {
    // หาหน้าแรกที่ published
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: 'createdAt',
    })
    
    page = result.docs?.[0] || homeStatic as any
  }

  if (!page) {
    return (
      <div className="pt-24 pb-24">
        <div className="container">
          <h1>Page Not Found</h1>
          <p>Back to Home</p>
        </div>
      </div>
    )
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={`/${lang}`} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

// ไม่ใช้ cache เพื่อให้ข้อมูลอัพเดทตลอดเวลา
const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}
