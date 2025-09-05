import type { Field } from 'payload'
import { createMultilangText, createMultilangTextarea } from '@/fields/multilang'

// Multilang Tabs สำหรับ Categories Collection
export const categoriesMultilangTabs: Field[] = [
  {
    type: 'tabs',
    label: 'การแปลภาษา',
    admin: {
      condition: (data, siblingData) => {
        return siblingData?.enableTranslations === true
      },
    },
    tabs: [
      {
        label: 'ข้อมูลหลัก',
        fields: [
          createMultilangText({
            name: 'multilangTitle',
            label: 'ชื่อหมวดหมู่',
            required: true,
            admin: {
              description: 'ชื่อหลักของหมวดหมู่',
              placeholder: 'กรอกชื่อหมวดหมู่',
            },
            maxLength: 50,
            minLength: 2,
          }),
          createMultilangText({
            name: 'shortName',
            label: 'ชื่อย่อ',
            required: false,
            admin: {
              description: 'ชื่อย่อของหมวดหมู่ (สำหรับแสดงในเมนู)',
              placeholder: 'กรอกชื่อย่อ',
            },
            maxLength: 20,
            minLength: 2,
          }),
          createMultilangTextarea({
            name: 'description',
            label: 'คำอธิบายหมวดหมู่',
            required: false,
            admin: {
              description: 'คำอธิบายของหมวดหมู่',
              placeholder: 'กรอกคำอธิบายหมวดหมู่',
            },
            maxLength: 200,
            minLength: 10,
            rows: 3,
          }),
        ],
      },
      {
        label: 'SEO',
        fields: [
          createMultilangText({
            name: 'metaTitle',
            label: 'Meta Title',
            required: false,
            admin: {
              description: 'หัวข้อสำหรับ SEO (แสดงในผลการค้นหา)',
              placeholder: 'กรอก Meta Title',
            },
            maxLength: 60,
            minLength: 10,
          }),
          createMultilangTextarea({
            name: 'metaDescription',
            label: 'Meta Description',
            required: false,
            admin: {
              description: 'คำอธิบายสำหรับ SEO (แสดงในผลการค้นหา)',
              placeholder: 'กรอก Meta Description',
            },
            maxLength: 160,
            minLength: 20,
            rows: 3,
          }),
          createMultilangText({
            name: 'metaKeywords',
            label: 'Meta Keywords',
            required: false,
            admin: {
              description: 'คำสำคัญสำหรับ SEO (คั่นด้วยจุลภาค)',
              placeholder: 'กรอก Meta Keywords',
            },
            maxLength: 200,
            minLength: 5,
          }),
        ],
      },
      {
        label: 'การแสดงผล',
        fields: [
          createMultilangText({
            name: 'icon',
            label: 'ไอคอน',
            required: false,
            admin: {
              description: 'ชื่อไอคอนจาก Lucide React',
              placeholder: 'กรอกชื่อไอคอน',
            },
            maxLength: 30,
            minLength: 3,
          }),
        ],
      },
    ],
  },
]
