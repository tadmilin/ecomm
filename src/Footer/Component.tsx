import React from 'react'

import type { Footer } from '../payload-types'
import { getCachedGlobal } from '../utilities/getGlobals'
import { FooterClient } from './Component.client'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const headerData = await getCachedGlobal('header', 1)()
  
  return <FooterClient data={footerData} headerData={headerData} />
}
