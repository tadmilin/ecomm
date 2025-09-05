import type { Field } from 'payload'
import { createMultilangText, createMultilangRichText, createMultilangTextarea } from '@/fields/multilang'

// Multilang Fields สำหรับ Posts Collection
export const postsMultilangFields: Field[] = [
  // Title Field
  createMultilangText({
    name: 'title',
    label: 'หัวข้อบทความ',
    required: true,
    admin: {
      description: 'หัวข้อหลักของบทความ',
      placeholder: 'กรอกหัวข้อบทความ',
    },
    maxLength: 100,
    minLength: 5,
  }),

  // Excerpt Field
  createMultilangTextarea({
    name: 'excerpt',
    label: 'สรุปย่อ',
    required: false,
    admin: {
      description: 'สรุปย่อของบทความ (แสดงในรายการบทความ)',
      placeholder: 'กรอกสรุปย่อ',
    },
    maxLength: 300,
    minLength: 20,
    rows: 3,
  }),

  // Content Field (Rich Text)
  createMultilangRichText({
    name: 'content',
    label: 'เนื้อหาบทความ',
    required: true,
    admin: {
      description: 'เนื้อหาหลักของบทความ',
      placeholder: 'กรอกเนื้อหาบทความ',
    },
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

  // Hero Title Field
  createMultilangText({
    name: 'heroTitle',
    label: 'หัวข้อ Hero',
    required: false,
    admin: {
      description: 'หัวข้อสำหรับส่วน Hero ของบทความ',
      placeholder: 'กรอกหัวข้อ Hero',
    },
    maxLength: 80,
    minLength: 5,
  }),

  // Hero Subtitle Field
  createMultilangText({
    name: 'heroSubtitle',
    label: 'หัวข้อรอง Hero',
    required: false,
    admin: {
      description: 'หัวข้อรองสำหรับส่วน Hero',
      placeholder: 'กรอกหัวข้อรอง Hero',
    },
    maxLength: 120,
    minLength: 10,
  }),

  // Hero Description Field
  createMultilangTextarea({
    name: 'heroDescription',
    label: 'คำอธิบาย Hero',
    required: false,
    admin: {
      description: 'คำอธิบายสำหรับส่วน Hero',
      placeholder: 'กรอกคำอธิบาย Hero',
    },
    maxLength: 200,
    minLength: 20,
    rows: 3,
  }),

  // Reading Time Field
  createMultilangText({
    name: 'readingTime',
    label: 'เวลาอ่าน',
    required: false,
    admin: {
      description: 'เวลาที่ใช้ในการอ่านบทความ (เช่น "5 นาที", "5 minutes")',
      placeholder: 'กรอกเวลาอ่าน',
    },
    maxLength: 20,
    minLength: 3,
  }),

  // Tags Field
  createMultilangText({
    name: 'tags',
    label: 'แท็ก',
    required: false,
    admin: {
      description: 'แท็กของบทความ (คั่นด้วยจุลภาค)',
      placeholder: 'กรอกแท็ก',
    },
    maxLength: 200,
    minLength: 5,
  }),
]
