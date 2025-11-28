import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { createMultilangText3 } from '@/fields/multilangText3'
import { createMultilangTextarea3 } from '@/fields/multilangTextarea3'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'sku', 'price', 'stock', 'status', 'updatedAt'],
    useAsTitle: 'name',
    group: 'E-commerce',
  },
  fields: [
    // Multilang fields (ไทย, อังกฤษ, จีน)
    createMultilangText3({
      name: 'multilangName',
      label: 'ชื่อสินค้า (Product Name)',
      required: true,
      admin: {
        description: 'ชื่อสินค้าในภาษาไทย, อังกฤษ, และจีน',
      },
      maxLength: 200,
    }),
    createMultilangTextarea3({
      name: 'multilangDescription',
      label: 'คำอธิบายสินค้า (Description)',
      required: false,
      admin: {
        description: 'คำอธิบายสินค้าในภาษาไทย, อังกฤษ, และจีน',
      },
      maxLength: 1000,
      rows: 4,
    }),

    // Original fields (สำหรับ fallback และ Excel import)
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name (Default)',
      admin: {
        description: 'ชื่อสินค้าหลัก (จะใช้เป็น fallback ถ้าไม่มีภาษาที่เลือก)',
      },
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      label: 'SKU',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (Default)',
      admin: {
        description: 'คำอธิบายหลัก (fallback)',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Price (THB)',
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      min: 0,
      label: 'Compare at Price',
    },
    {
      name: 'cost',
      type: 'number',
      min: 0,
      label: 'Cost per Item',
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 0,
      label: 'Stock Quantity',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product Images',
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categories',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight (kg)',
    },
    {
      name: 'dimensions',
      type: 'group',
      label: 'Dimensions',
      fields: [
        {
          name: 'length',
          type: 'number',
          label: 'Length (cm)',
        },
        {
          name: 'width',
          type: 'number',
          label: 'Width (cm)',
        },
        {
          name: 'height',
          type: 'number',
          label: 'Height (cm)',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Out of Stock',
          value: 'out_of_stock',
        },
        {
          label: 'Discontinued',
          value: 'discontinued',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Product',
      defaultValue: false,
    },
    {
      name: 'externalId',
      type: 'text',
      label: 'External ID',
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        }
        return data
      },
    ],
  },
}
