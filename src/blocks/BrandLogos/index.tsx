import React from 'react'
import type { BrandLogosBlock as BrandLogosBlockType } from '@/payload-types'

import { BrandLogosComponent } from './Component'

export const BrandLogosBlock: React.FC<
  BrandLogosBlockType & {
    lang?: string
  }
> = (props) => {
  const { logos, title, slidesToShow } = props

  if (!logos || logos.length === 0) return null

  return (
    <BrandLogosComponent 
      logos={logos} 
      title={title} 
      slidesToShow={slidesToShow}
    />
  )
}
