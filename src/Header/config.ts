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
              label: 'โลโก้แบบข้อความ',
              value: 'text',
            },
            {
              label: 'โลโก้แบบรูปภาพ',
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
          label: 'ข้อความโลโก้',
          required: false,
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: 'รูปภาพโลโก้',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'ข้อความ Alt',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
      ],
      label: 'การตั้งค่าโลโก้',
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
