import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { CategorySidebarComponent } from '@/blocks/CategorySidebar/Component'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

type HeroWithSidebar = Page['hero'] & {
  showCategorySidebar?: boolean
  lang?: string
}

export const RenderHero: React.FC<HeroWithSidebar> = (props) => {
  const { type, showCategorySidebar, lang = 'th' } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Render with Category Sidebar if enabled
  if (showCategorySidebar) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Category Sidebar - Left */}
          <CategorySidebarComponent
            title={lang === 'th' ? 'หมวดหมู่สินค้า' : lang === 'en' ? 'Categories' : '分类'}
            showOnDesktopOnly={true}
            lang={lang}
          />

          {/* Hero Content - Right */}
          <div className="flex-1 overflow-hidden rounded-lg shadow-sm">
            {type === 'highImpact' ? <HeroToRender {...props} /> : <HeroToRender {...props} />}
          </div>
        </div>
      </div>
    )
  }

  // ลบ media prop ออกเมื่อใช้ highImpact hero เพื่อป้องกันการส่ง buffer object
  if (type === 'highImpact') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { media, ...restProps } = props
    return <HeroToRender {...restProps} />
  }

  return <HeroToRender {...props} />
}
