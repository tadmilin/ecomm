import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

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
    // Original title field
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'ชื่อหมวดหมู่',
    },

    // Slug field
    ...slugField(),

    // Category image
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'รูปหมวดหมู่',
      admin: {
        description: 'รูปภาพประกอบหมวดหมู่สินค้า (แนะนำขนาด 400x400 พิกเซล)',
      },
    },

    // Description
    {
      name: 'description',
      type: 'textarea',
      required: false,
      localized: true,
      label: 'คำอธิบาย',
      admin: {
        description: 'คำอธิบายเกี่ยวกับหมวดหมู่นี้',
        rows: 4,
      },
    },

    // Display order
    {
      name: 'order',
      type: 'number',
      required: false,
      defaultValue: 0,
      label: 'สำดับการแสดงผล',
      admin: {
        description: 'ตัวเลขน้อยแสดงก่อน (0 = แสดงก่อน, 999 = แสดงทีหลัง)',
      },
    },

    // Number of columns to display
    {
      name: 'columns',
      type: 'number',
      required: false,
      defaultValue: 6,
      min: 1,
      max: 12,
      label: 'จำนวนคอลัมน์',
      admin: {
        description: 'จำนวนคอลัมน์ที่จะแสดงสินค้าในหมวดหมู่นี้ (1-12)',
      },
    },

    // Featured category
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'แนะนำ',
      admin: {
        description: 'แสดงหมวดหมู่นี้ในหน้าแรก',
      },
    },

    // Breadcrumbs
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumbs',
      admin: {
        description: 'ลิงก์สำหรับ breadcrumb navigation',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          admin: {
            placeholder: '/doorwindow',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Label',
          admin: {
            placeholder: 'ประตู หน้าต่าง',
          },
        },
      ],
    },
  ],
}
