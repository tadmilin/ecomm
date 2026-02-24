'use client'

import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

export const FloatingButtonRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string; tooltip?: string; enabled?: boolean }>()
  
  const display = data?.label || `ปุ่มที่ ${(rowNumber ?? 0) + 1}`
  const tooltip = data?.tooltip ? ` — ${data.tooltip}` : ''
  const status = data?.enabled === false ? ' (ปิดอยู่)' : ''

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span>{display}{tooltip}</span>
      {status && (
        <span style={{ fontSize: '11px', color: '#888', fontStyle: 'italic' }}>
          {status}
        </span>
      )}
    </span>
  )
}
