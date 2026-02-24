import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FloatingButtonsClient } from './FloatingButtonsClient'
import type { FloatingButton } from '@/payload-types'

export const FloatingButtons: React.FC = async () => {
  let data: FloatingButton | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    data = await payload.findGlobal({
      slug: 'floating-buttons',
      depth: 1, // populate icon media
    })
  } catch (err) {
    // ถ้า global ยังไม่มีข้อมูล ให้ render ว่าง
    return null
  }

  if (!data?.enabled || !data.buttons?.length) return null

  return <FloatingButtonsClient buttons={data.buttons} />
}
