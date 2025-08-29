import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

// export async function Header() {
//   const headerData: Header = await getCachedGlobal('header', 1)()

//   return <HeaderClient data={headerData} />
// }

// Temporary mock data for client-side build
export function Header() {
  const mockHeaderData: Header = {
    id: 'mock-header',
    navItems: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return <HeaderClient data={mockHeaderData} />
}
