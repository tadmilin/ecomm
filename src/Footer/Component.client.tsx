'use client'

import Link from 'next/link'
import React from 'react'

import type { Footer } from '../payload-types'

import { CMSLink } from '../components/Link'
import { Logo } from '../components/Logo/Logo'

interface FooterClientProps {
  data: Footer
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const navItems = data?.navItems || []
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>

      <div className="container py-4 border-t border-gray-700">
        <div className="text-center text-sm text-gray-400">
          © {currentYear} สงวนลิขสิทธิ์
        </div>
      </div>
    </footer>
  )
}
