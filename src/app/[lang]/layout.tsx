import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'th' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params

  return {
    title: 'Payload Website Template',
    description: 'A modern website built with Payload CMS',
    alternates: {
      canonical: `/${lang}`,
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

  return (
    <html lang={lang} dir="ltr">
      <body className={inter.className}>
        <div data-lang={lang}>
          {children}
        </div>
      </body>
    </html>
  )
}
