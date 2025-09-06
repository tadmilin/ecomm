import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logo?: {
    type?: 'image' | 'text' | null
    image?: string | { url?: string } | null
    text?: string | null
    alt?: string | null
  }
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logo } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // แสดง logo ตามข้อมูลจาก Global/Header เท่านั้น
  if (logo?.type === 'image' && logo.image) {
    const imageUrl = typeof logo.image === 'string' ? logo.image : logo.image?.url || ''
    return (
      <img
        src={imageUrl}
        alt={logo.alt || 'Logo'}
        className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
      />
    )
  } else if (logo?.type === 'text' && logo.text) {
    return (
      <span className={clsx('text-2xl font-bold text-primary', className)}>
        {logo.text}
      </span>
    )
  }

  // ถ้าไม่มีข้อมูลจาก Global/Header ให้แสดงข้อความว่าง
  return null
}
