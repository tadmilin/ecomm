import type { Metadata } from 'next'
import { getDictionary } from '@/lib/getDictionary'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { homeStatic } from '@/endpoints/seed/home-static'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const page = await queryPageBySlug({ slug: 'home' })

  return generateMeta({ doc: page }) || {
    title: dict.common.meta?.title || 'Payload Website Template',
    description: dict.common.meta?.description || 'A modern website built with Payload CMS',
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'th': '/th',
        'ja': '/ja',
      },
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
  const dict = await getDictionary(lang)

  let page = await queryPageBySlug({ slug: 'home' })

  // Remove this code once your website is seeded
  if (!page) {
    page = homeStatic as any
  }

  if (!page) {
    return (
      <div className="pt-24 pb-24">
        <div className="container">
          <h1>{dict.common.not_found}</h1>
          <p>{dict.common.back_to_home}</p>
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

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
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
})
