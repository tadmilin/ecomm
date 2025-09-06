import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'text',
          options: [
            {
              label: 'Text Logo',
              value: 'text',
            },
            {
              label: 'Image Logo',
              value: 'image',
            },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'text',
          type: 'text',
          label: 'Logo Text',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Logo Image',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
      ],
      label: 'Logo Settings',
    },
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
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}