import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { headerI18nFields } from './i18nFields'
import { headerMultilangNavigation } from './multilangNavigation'
import { createMultilangLink } from './multilangLink'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    // i18n Settings Fields
    ...headerI18nFields,
    
    // Multilang Navigation
    ...headerMultilangNavigation,
    
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
          RowLabel: '@/Header/RowLabel#RowLabel',
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
        createMultilangLink(),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
        condition: (data, siblingData) => {
          return siblingData?.enableTranslations === true
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
