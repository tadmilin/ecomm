import type { Field } from 'payload'
import { createMultilangText, createMultilangRichText, createMultilangTextarea } from '@/fields/multilang'

// Multilang Fields สำหรับ Pages Collection
export const pagesMultilangFields: Field[] = [
  // Title Field
  createMultilangText({
    name: 'title',
    label: 'หัวข้อหน้า',
    required: true,
    admin: {
      description: 'หัวข้อหลักของหน้า',
      placeholder: 'กรอกหัวข้อหน้า',
    },
    maxLength: 100,
    minLength: 5,
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

  // Short Description Field
  createMultilangTextarea({
    name: 'shortDescription',
    label: 'คำอธิบายสั้น',
    required: false,
    admin: {
      description: 'คำอธิบายสั้นๆ ของหน้า',
      placeholder: 'กรอกคำอธิบายสั้น',
    },
    maxLength: 300,
    minLength: 10,
    rows: 2,
  }),

  // Content Field (Rich Text)
  createMultilangRichText({
    name: 'content',
    label: 'เนื้อหาหลัก',
    required: false,
    admin: {
      description: 'เนื้อหาหลักของหน้า',
      placeholder: 'กรอกเนื้อหาหลัก',
    },
  }),

  // Hero Title Field
  createMultilangText({
    name: 'heroTitle',
    label: 'หัวข้อ Hero',
    required: false,
    admin: {
      description: 'หัวข้อสำหรับส่วน Hero',
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

  // CTA Button Text Field
  createMultilangText({
    name: 'ctaButtonText',
    label: 'ข้อความปุ่ม CTA',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่ม Call-to-Action',
      placeholder: 'กรอกข้อความปุ่ม',
    },
    maxLength: 30,
    minLength: 3,
  }),

  // Footer Text Field
  createMultilangTextarea({
    name: 'footerText',
    label: 'ข้อความ Footer',
    required: false,
    admin: {
      description: 'ข้อความสำหรับส่วน Footer',
      placeholder: 'กรอกข้อความ Footer',
    },
    maxLength: 500,
    minLength: 10,
    rows: 4,
  }),
]
