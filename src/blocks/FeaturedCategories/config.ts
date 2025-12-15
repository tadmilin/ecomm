import type { Block } from 'payload'

export const FeaturedCategories: Block = {
  slug: 'featuredCategories',
  interfaceName: 'FeaturedCategoriesBlock',
  labels: {
    singular: 'Featured Categories',
    plural: 'Featured Categories',
  },
  fields: [
    {
      name: 'categories',
      type: 'array',
      label: 'Category Items',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'reference',
              options: [
                {
                  label: 'Internal link',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: ['pages', 'categories'],
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'Custom URL',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
          ],
        },
      ],
    },
  ],
}
