import React from 'react'

import type { Page, Media } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { HomeCategorySidebar } from '@/components/HomeCategorySidebar/Component'
import { FeaturedCategoriesComponent } from '@/blocks/FeaturedCategories/Component'

interface FeaturedCategory {
  id?: string
  image: string | Media
  title: string
  description?: string | null
  link: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?: any
    url?: string | null
    label: string
    appearance?: ('default' | 'outline') | null
  }
}

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

type HeroWithSidebar = Omit<Page['hero'], 'featuredCategories'> & {
  showCategorySidebar?: boolean
  lang?: string
  featuredCategories?: FeaturedCategory[]
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
      const { media, showCategorySidebar: _, featuredCategories: _featuredCats, lang: _lang, ...restProps } = props
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { showCategorySidebar: _, featuredCategories: _featuredCats, lang: _lang, ...restProps } = props
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

  // ลบ media prop ออกเมื่อใช้ highImpact hero เพื่อป้องกันการส่ง buffer object
  if (type === 'highImpact') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { media, featuredCategories: _featuredCats, lang: _lang, ...restProps } = props
    return (
      <>
        <HeroToRender {...restProps} />
        {featuredCategories && featuredCategories.length > 0 && (
          <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
        )}
      </>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { featuredCategories: _featuredCats, lang: _lang, ...restProps } = props
  return (
    <>
      <HeroToRender {...restProps} />
      {featuredCategories && featuredCategories.length > 0 && (
        <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
      )}
    </>
  )
}
