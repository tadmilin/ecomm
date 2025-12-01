'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType; lang: string }> = ({ data, lang }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-6 items-center text-base font-medium">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} lang={lang} appearance="link" />
      })}
    </nav>
  )
}
