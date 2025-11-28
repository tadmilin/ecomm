import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const languages = ['en', 'th', 'cn']
const fallbackLng = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = fallbackLng

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // และข้ามไฟล์สาธารณะและไฟล์ทั่วไปบางรายการ
    '/((?!_next|api|admin|favicon\\.ico|favicon\\.svg|robots\\.txt|sitemap\\.xml).*)',
    // Optional: add public files directory if you have one
    // '/((?!_next|api|admin|public).*)',
  ],
}
