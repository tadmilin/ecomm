import React from 'react'

import type { Page, Media } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { ResponsiveSidebarWrapper } from '@/heros/ResponsiveSidebarWrapper'
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
  enableFeaturedCategories?: boolean | null
}

export const RenderHero: React.FC<HeroWithSidebar> = (props) => {
  const { type, showCategorySidebar, lang, featuredCategories, enableFeaturedCategories } = props || {}

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
          <ResponsiveSidebarWrapper lang={lang}>
            <HeroToRender {...restProps} />
          </ResponsiveSidebarWrapper>
          {enableFeaturedCategories && featuredCategories && featuredCategories.length > 0 && (
            <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
          )}
        </>
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { showCategorySidebar: _, featuredCategories: _featuredCats, lang: _lang, ...restProps } = props
    return (
      <>
        <ResponsiveSidebarWrapper lang={lang}>
          <HeroToRender {...restProps} />
        </ResponsiveSidebarWrapper>
        {enableFeaturedCategories && featuredCategories && featuredCategories.length > 0 && (
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
        {enableFeaturedCategories && featuredCategories && featuredCategories.length > 0 && (
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
      {enableFeaturedCategories && featuredCategories && featuredCategories.length > 0 && (
        <FeaturedCategoriesComponent categories={featuredCategories} lang={lang} />
      )}
    </>
  )
}
