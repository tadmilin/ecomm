import type { Block } from 'payload'

export const CategorySidebar: Block = {
  slug: 'categorySidebar',
  interfaceName: 'CategorySidebarBlock',
  labels: {
    singular: 'Category Sidebar',
    plural: 'Category Sidebars',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Sidebar Title',
      defaultValue: 'หมวดหมู่สินค้า',
      localized: true,
    },
    {
      name: 'showOnDesktopOnly',
      type: 'checkbox',
      label: 'Show on Desktop Only',
      defaultValue: true,
    },
  ],
}
