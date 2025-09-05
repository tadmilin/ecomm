import type { Field } from 'payload'
import { createMultilangText, createMultilangTextarea } from '@/fields/multilang'

// Multilang Fields สำหรับ Categories Collection
export const categoriesMultilangFields: Field[] = [
  // Title Field
  createMultilangText({
    name: 'title',
    label: 'ชื่อหมวดหมู่',
    required: true,
    admin: {
      description: 'ชื่อหลักของหมวดหมู่',
      placeholder: 'กรอกชื่อหมวดหมู่',
    },
    maxLength: 50,
    minLength: 2,
  }),

  // Description Field
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

  // Meta Title Field
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

  // Meta Description Field
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

  // Meta Keywords Field
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

  // Short Name Field
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

  // Icon Field
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
]
