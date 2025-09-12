'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  // Debug: ตรวจสอบ navItems ที่ได้รับ
  console.log('Nav items:', navItems)

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        console.log(`Nav item ${i}:`, link)
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}