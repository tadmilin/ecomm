import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { categoriesI18nFields } from './Categories/i18nFields'
import { categoriesMultilangTabs } from './Categories/multilangTabs'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    // i18n Settings Fields
    ...categoriesI18nFields,
    
    // Original title field (fallback)
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.enableTranslations !== true
        },
      },
    },
    
    // Multilang Tabs
    ...categoriesMultilangTabs,
    
    // Slug field
    ...slugField(),
  ],
}
