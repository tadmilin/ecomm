import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      maxRows: 1,
    },
    {
      name: 'mediaSlides',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Slide Title',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Slide Description',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3'] }),
              InlineToolbarFeature(),
              FixedToolbarFeature(),
            ],
          }),
        },
        link({
          appearances: ['default', 'outline'],
        }),
      ],
      label: 'รูปภาพสไลด์',
      minRows: 1,
      required: true,
    },
    {
      name: 'showCategorySidebar',
      type: 'checkbox',
      label: 'Show Category Sidebar (Desktop)',
      defaultValue: false,
      admin: {
        description: 'แสดงเมนูหมวดหมู่ด้านซ้าย (เฉพาะ Desktop)',
      },
    },
    {
      name: 'featuredCategories',
      type: 'array',
      label: 'Featured Categories (Below Hero)',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Category Image',
        },
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
        link({
          overrides: {
            label: 'Link',
            required: true,
          },
        }),
      ],
      admin: {
        description: 'แสดง featured categories ด้านล่าง hero slider',
      },
      minRows: 2,
      maxRows: 8,
    },
  ],
  label: false,
}
