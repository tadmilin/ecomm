import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LoginBlock } from '@/blocks/Login/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CategorySidebarComponent } from '@/blocks/CategorySidebar/Component'
import { FeaturedProductsBlock } from '@/blocks/FeaturedProducts'
import { BrandLogosBlock } from '@/blocks/BrandLogos'
import { CategoriesGridBlock } from '@/blocks/CategoriesGrid/Component'
import { StoreLocationBlock } from '@/blocks/StoreLocation/Component'
import { PromotionBannerBlock } from '@/blocks/PromotionBanner/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  login: LoginBlock,
  mediaBlock: MediaBlock,
  categorySidebar: CategorySidebarComponent,
  featuredProducts: FeaturedProductsBlock,
  brandLogos: BrandLogosBlock,
  categoriesGrid: CategoriesGridBlock,
  storeLocation: StoreLocationBlock,
  promotionBanner: PromotionBannerBlock,
} as const

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  lang?: string
}> = (props) => {
  const { blocks, lang } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} lang={lang} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
