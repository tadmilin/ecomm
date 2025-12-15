import type { CollectionConfig } from 'payload'
import type { Category } from '@/payload-types'

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
    defaultColumns: ['title', 'parent', 'slug', 'order'],
    listSearchableFields: ['title', 'slug'],
  },
  fields: [
    // Parent Category (สำหรับ sub-category)
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: 'หมวดหมู่แม่',
      admin: {
        description:
          'เลือกหมวดหมู่แม่ ถ้าต้องการให้เป็นหมวดหมู่ย่อย (เช่น "ปูนก่อ" อยู่ภายใต้ "ปูนซีเมนต์")',
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        // ป้องกันเลือกตัวเองเป็น parent
        return {
          id: {
            not_equals: id,
          },
        }
      },
    },

    // Title field
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
      label: 'ลำดับการแสดงผล',
      admin: {
        description: 'ตัวเลขน้อยแสดงก่อน (0 = แสดงก่อน, 999 = แสดงทีหลัง)',
        position: 'sidebar',
      },
    },

    // Level (auto-calculated)
    {
      name: 'level',
      type: 'number',
      required: false,
      defaultValue: 0,
      label: 'ระดับ',
      admin: {
        description: '0 = หมวดหมู่หลัก, 1 = หมวดหมู่ย่อย ระดับ 1, 2 = หมวดหมู่ย่อย ระดับ 2',
        readOnly: true,
        position: 'sidebar',
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

    
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumbs',
      admin: {
        description: 'ลิงก์สำหรับ breadcrumb navigation (จะถูกสร้างอัตโนมัติจาก parent)',
        readOnly: true,
        position: 'sidebar',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Label',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Auto-calculate level based on parent
        if (data.parent) {
          try {
            const parent = await req.payload.findByID({
              collection: 'categories',
              id: typeof data.parent === 'string' ? data.parent : data.parent.id,
            })

            type CategoryWithLevel = Category & { level?: number }
            data.level = ((parent as CategoryWithLevel).level || 0) + 1
          } catch (_error) {
            data.level = 1
          }
        } else {
          data.level = 0
        }

        // Auto-generate breadcrumbs
        if (data.parent) {
          try {
            const parent = await req.payload.findByID({
              collection: 'categories',
              id: typeof data.parent === 'string' ? data.parent : data.parent.id,
              locale: req.locale,
            })

            type CategoryWithExtras = Category & {
              breadcrumbs?: Array<{ url: string; label: string }>
              slug?: string
              title?: string | { th?: string; en?: string; cn?: string }
            }
            const parentWithExtras = parent as CategoryWithExtras
            const breadcrumbs = parentWithExtras.breadcrumbs || []
            const titleText =
              typeof parentWithExtras.title === 'string'
                ? parentWithExtras.title
                : (parentWithExtras.title as { th?: string; en?: string; cn?: string })?.th || 'Category'

            breadcrumbs.push({
              url: `/categories/${parentWithExtras.slug}`,
              label: titleText,
            })
            data.breadcrumbs = breadcrumbs
          } catch (_error) {
            data.breadcrumbs = []
          }
        } else {
          data.breadcrumbs = []
        }

        return data
      },
    ],
  },
}
