import type { Block } from 'payload'

export const FeaturedProducts: Block = {
  slug: 'featuredProducts',
  interfaceName: 'FeaturedProductsBlock',
  labels: {
    singular: 'Featured Products Block',
    plural: 'Featured Products Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
    },
    {
      name: 'displayMode',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'auto',
      required: true,
      options: [
        {
          label: 'Auto - Featured Products',
          value: 'auto-featured',
        },
        {
          label: 'Auto - New Products',
          value: 'auto-new',
        },
        {
          label: 'Auto - Discounted Products',
          value: 'auto-discount',
        },
        {
          label: 'Manual Selection',
          value: 'manual',
        },
      ],
      admin: {
        description: 'เลือกว่าจะดึงสินค้าอัตโนมัติหรือเลือกเอง',
      },
    },
    {
      name: 'maxProducts',
      type: 'number',
      label: 'Maximum Products to Display',
      defaultValue: 8,
      min: 1,
      max: 20,
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode?.startsWith('auto'),
        description: 'จำนวนสินค้าสูงสุดที่จะแสดง (สำหรับโหมด Auto)',
      },
    },
    {
      name: 'selectedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Select Products',
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode === 'manual',
        description: 'เลือกสินค้าที่ต้องการแสดง',
      },
    },
    {
      name: 'sortBy',
      type: 'select',
      label: 'Sort By',
      defaultValue: 'createdAt',
      options: [
        {
          label: 'Newest First',
          value: 'createdAt',
        },
        {
          label: 'Price: Low to High',
          value: 'price-asc',
        },
        {
          label: 'Price: High to Low',
          value: 'price-desc',
        },
        {
          label: 'Name A-Z',
          value: 'name-asc',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode?.startsWith('auto'),
        description: 'เรียงลำดับสินค้า (สำหรับโหมด Auto)',
      },
    },
  ],
}
