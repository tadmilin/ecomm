import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  // Debug: ตรวจสอบข้อมูลที่ดึงมาจาก Admin Panel
  console.log('Header data from Admin Panel:', JSON.stringify(headerData, null, 2))

  return <HeaderClient data={headerData} />
}