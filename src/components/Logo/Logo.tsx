import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logo?: {
    type?: 'image' | 'text' | null
    image?: string | Media | null
    text?: string | null
    alt?: string | null
  }
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logo } = props

  const _loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // แสดง logo ตามข้อมูลจาก Global/Header
  if (logo?.type === 'image' && logo.image) {
    // ดึง URL จาก object ที่มี structure ของ Media
    let imageUrl = ''
    if (typeof logo.image === 'string') {
      imageUrl = logo.image
    } else if (logo.image && typeof logo.image === 'object') {
      imageUrl = (logo.image as { url?: string }).url || ''
    }

    if (!imageUrl) return null

    return (
      <Image
        src={imageUrl}
        alt={logo.alt || 'โลโก้'}
        width={150}
        height={34}
        className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
        priority={priority === 'high'}
      />
    )
  } else if (logo?.type === 'text' && logo.text) {
    return <span className={clsx('text-2xl font-bold text-white', className)}>{logo.text}</span>
  }

  // ถ้าไม่มีข้อมูล ให้แสดงข้อความเริ่มต้น
  return <span className={clsx('text-2xl font-bold text-white', className)}>ร้านค้า</span>
}
