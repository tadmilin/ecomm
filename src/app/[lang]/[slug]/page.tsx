import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from '@/app/[lang]/[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { TopBanner } from '@/components/TopBanner'

// Supported languages
const SUPPORTED_LANGS = ['en', 'th', 'cn'] as const
type SupportedLang = typeof SUPPORTED_LANGS[number]

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => doc.slug !== 'home')
    .flatMap(({ slug }) => 
      SUPPORTED_LANGS.map(lang => ({ lang, slug }))
    )

  return params
}

type Args = {
  params: Promise<{
    lang: string
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { lang, slug = 'home' } = await paramsPromise

  const url = `/${lang}/${slug}`

  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
    locale: lang,
  })

  // Fallback to static home page for initial setup
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout, topBanner } = page
  const isHomePage = slug === 'home'

  return (
    <article className="pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      
      {/* Top Banner - แสดงเฉพาะหน้าที่เปิดใช้งานใน Admin Panel */}
      {topBanner?.enabled && topBanner.image && (
        <TopBanner
          enabled={topBanner.enabled}
          image={topBanner.image}
          alt={topBanner.alt}
          link={topBanner.link}
          openInNewTab={topBanner.openInNewTab}
        />
      )}
      
      {isHomePage ? (
        <RenderHero 
          {...hero} 
          lang={lang} 
          showCategorySidebar={true} 
          featuredCategories={hero?.featuredCategories as any} 
        />
      ) : (
        <RenderHero 
          {...{ ...hero, showCategorySidebar: undefined, featuredCategories: undefined }} 
          lang={lang} 
        />
      )}
      <RenderBlocks blocks={layout} lang={lang} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { lang, slug = 'home' } = await paramsPromise

  const page = await queryPageBySlug({
    slug,
    locale: lang,
  })

  const metadata = generateMeta({ doc: page })

  return {
    ...metadata,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map(locale => [locale, `/${locale}/${slug}`])
      ),
    },
  }
}

const queryPageBySlug = cache(async ({ 
  slug, 
  locale = 'th' 
}: { 
  slug: string
  locale?: string 
}) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    locale: locale as SupportedLang,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    depth: 3,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
