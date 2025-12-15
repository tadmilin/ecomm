import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { HomeCategorySidebar } from '@/components/HomeCategorySidebar/Component'
import { FeaturedCategoriesComponent } from '@/blocks/FeaturedCategories/Component'

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
  const { type, showCategorySidebar, lang, featuredCategories } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // If showCategorySidebar is true, render with sidebar layout
  if (showCategorySidebar && lang) {
    // ลบ media prop ออกเมื่อใช้ highImpact hero เพื่อป้องกันการส่ง buffer object
    if (type === 'highImpact') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { media, showCategorySidebar: _, ...restProps } = props
      return (
        <>
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-4 items-start">
              <HomeCategorySidebar lang={lang} />
              <div className="flex-1 min-w-0">
                <HeroToRender {...restProps} />
              </div>
            </div>
          </div>
          {featuredCategories && featuredCategories.length > 0 && (
            <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
          )}
        </>
      )
    }

    return (
      <>
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 items-start">
            <HomeCategorySidebar lang={lang} />
            <div className="flex-1 min-w-0">
              <HeroToRender {...props} />
            </div>
          </div>
        </div>
        {featuredCategories && featuredCategories.length > 0 && (
          <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
        )}
      </>
    )
  }

  // ลบ media prop ออกเมื่อใช้ highImpact hero เพื่อป้องกันการส่ง buffer object
  if (type === 'highImpact') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { media, ...restProps } = props
    return (
      <>
        <HeroToRender {...restProps} />
        {featuredCategories && featuredCategories.length > 0 && (
          <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
        )}
      </>
    )
  }

  return (
    <>
      <HeroToRender {...props} />
      {featuredCategories && featuredCategories.length > 0 && (
        <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
      )}
    </>
  )
}
