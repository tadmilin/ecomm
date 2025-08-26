'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import UserMenu from '@/components/UserMenu'
import SignIn from '@/components/SignIn'
import { HeaderLanguageSwitcher } from '@/components/LanguageSwitcher'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const { data: session, status } = useSession()

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
      <HeaderLanguageSwitcher />
      {status === "loading" ? (
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      ) : session ? (
        <UserMenu />
      ) : (
        <SignIn />
      )}
    </nav>
  )
}
