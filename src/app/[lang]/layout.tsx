import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { FloatingButtons } from '@/components/FloatingButtons'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LoginNotification } from '@/components/LoginNotification'
import { TopBanner } from '@/components/TopBanner'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode, headers } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { isEnabled } = await draftMode()
  const { lang } = await params

  // Get current pathname to determine which page's TopBanner to show
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('referer') || ''
  
  // Extract slug from pathname (e.g., /th/about -> about, /th -> home)
  const pathParts = pathname.split('/').filter(Boolean)
  const slug = pathParts.length > 1 ? pathParts[pathParts.length - 1] : 'home'

  // Query current page for topBanner
  let topBanner = null
  try {
    const payload = await getPayload({ config: configPromise })
    const page = await payload.find({
      collection: 'pages',
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    topBanner = page.docs?.[0]?.topBanner
  } catch (error) {
    console.error('Error fetching page for TopBanner:', error)
  }

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={lang}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* Top Banner - ด้านบนสุดของเว็บ เหนือ Header */}
          {topBanner?.enabled && topBanner.image && (
            <TopBanner
              enabled={topBanner.enabled}
              image={topBanner.image}
              alt={topBanner.alt}
              link={topBanner.link}
              openInNewTab={topBanner.openInNewTab}
            />
          )}
          
          <div style={{ display: 'none' }}>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
          </div>

          <Header lang={lang} />
          <LoginNotification />
          {children}
          <Footer />
          <FloatingButtons />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
