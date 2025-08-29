import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getDictionary } from '@/lib/getDictionary'
import { languages } from '@/i18n/settings'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} dir={lang === 'th' ? 'ltr' : 'ltr'}>
      <body className={inter.className}>
        <div data-lang={lang}>
          {children}
        </div>
      </body>
    </html>
  )
}
