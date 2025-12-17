import type { Block } from 'payload'

export const BrandLogos: Block = {
  slug: 'brandLogos',
  interfaceName: 'BrandLogosBlock',
  labels: {
    singular: 'Brand Logos',
    plural: 'Brand Logos Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional title for the brand logos section',
      },
    },
    {
      name: 'slidesToShow',
      type: 'number',
      label: 'Logos to Show',
      defaultValue: 5,
      min: 1,
      max: 8,
      admin: {
        description: 'Number of logos to show at once on desktop',
      },
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Brand Logos',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
        {
          name: 'brandName',
          type: 'text',
          label: 'Brand Name',
          admin: {
            description: 'Name of the brand (used for alt text if not set in media)',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Brand Link',
          admin: {
            description: 'Optional URL to link when clicking the logo',
          },
        },
      ],
    },
  ],
}
