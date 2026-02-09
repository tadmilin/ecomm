import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Product Media Collection - Optimized for Product Images
 * Only 2 sizes: mobile (600px) + desktop (1200px) to save R2 storage
 */
export const ProductMedia: CollectionConfig = {
  slug: 'product-media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'E-commerce',
    description: 'Product images (optimized: 2 sizes only)',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/product-media'),
    adminThumbnail: 'mobile',
    focalPoint: true,
    imageSizes: [
      {
        name: 'mobile',
        width: 600,
        height: undefined, // Auto maintain aspect ratio
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'desktop',
        width: 1200,
        height: undefined,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
    ],
  },
}
