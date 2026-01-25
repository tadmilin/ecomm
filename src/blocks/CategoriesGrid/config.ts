import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CategoriesGrid: Block = {
  slug: 'categoriesGrid',
  interfaceName: 'CategoriesGridBlock',
  labels: {
    singular: 'Categories Grid',
    plural: 'Categories Grids',
  },
  fields: [
    {
      name: 'introContent',
      type: 'richText',
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
      label: 'เนื้อหาส่วนหัว',
      admin: {
        description: 'ข้อความแนะนำด้านบน (ถ้ามี)',
      },
    },
    {
      name: 'showOnlyRootCategories',
      type: 'checkbox',
      defaultValue: true,
      label: 'แสดงเฉพาะหมวดหมู่หลัก',
      admin: {
        description: 'ถ้าติ๊ก จะแสดงเฉพาะหมวดหมู่ที่ไม่มี parent (หมวดหมู่ระดับ 0)',
      },
    },
    {
      name: 'showOnlyFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'แสดงเฉพาะหมวดหมู่แนะนำ',
      admin: {
        description: 'ถ้าติ๊ก จะแสดงเฉพาะหมวดหมู่ที่ถูกทำเครื่องหมาย "แนะนำ"',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 50,
      label: 'จำนวนที่แสดง',
      admin: {
        description: 'จำนวนหมวดหมู่สูงสุดที่จะแสดง',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 คอลัมน์', value: '2' },
        { label: '3 คอลัมน์', value: '3' },
        { label: '4 คอลัมน์', value: '4' },
        { label: '5 คอลัมน์', value: '5' },
        { label: '6 คอลัมน์', value: '6' },
      ],
      label: 'จำนวนคอลัมน์',
      admin: {
        description: 'จำนวนคอลัมน์ที่แสดงบน Desktop',
      },
    },
    {
      name: 'showDescription',
      type: 'checkbox',
      defaultValue: false,
      label: 'แสดงคำอธิบาย',
      admin: {
        description: 'แสดงคำอธิบายหมวดหมู่ใต้ชื่อ',
      },
    },
    {
      name: 'imageStyle',
      type: 'select',
      defaultValue: 'square',
      options: [
        { label: 'สี่เหลี่ยมจัตุรัส', value: 'square' },
        { label: 'วงกลม', value: 'circle' },
        { label: 'สี่เหลี่ยมผืนผ้า', value: 'rectangle' },
      ],
      label: 'รูปแบบรูปภาพ',
    },
  ],
}
