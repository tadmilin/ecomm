import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { footerI18nFields } from './i18nFields'
import { footerMultilangTabs } from './multilangTabs'
import { createFooterMultilangLink } from './multilangLink'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // i18n Settings Fields
    ...footerI18nFields,
    
    // Multilang Tabs
    ...footerMultilangTabs,
    
    // Original Navigation Items (fallback when i18n is disabled)
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
        condition: (data, siblingData) => {
          return siblingData?.enableTranslations !== true
        },
      },
    },
    
    // Multilang Navigation Items
    {
      name: 'multilangNavItems',
      type: 'array',
      label: 'รายการเมนูหลายภาษา',
      fields: [
        createFooterMultilangLink(),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
        condition: (data, siblingData) => {
          return siblingData?.enableTranslations === true
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
