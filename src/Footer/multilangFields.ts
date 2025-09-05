import type { Field } from 'payload'
import { createMultilangText, createMultilangTextarea } from '@/fields/multilang'

// Multilang Fields สำหรับ Footer Global
export const footerMultilangFields: Field[] = [
  // Company Information
  createMultilangText({
    name: 'companyName',
    label: 'ชื่อบริษัท',
    required: false,
    admin: {
      description: 'ชื่อบริษัทที่แสดงใน Footer',
      placeholder: 'กรอกชื่อบริษัท',
    },
    maxLength: 100,
    minLength: 3,
  }),

  createMultilangTextarea({
    name: 'companyDescription',
    label: 'คำอธิบายบริษัท',
    required: false,
    admin: {
      description: 'คำอธิบายสั้นๆ ของบริษัท',
      placeholder: 'กรอกคำอธิบายบริษัท',
    },
    maxLength: 300,
    minLength: 10,
    rows: 3,
  }),

  // Contact Information
  createMultilangText({
    name: 'address',
    label: 'ที่อยู่',
    required: false,
    admin: {
      description: 'ที่อยู่ของบริษัท',
      placeholder: 'กรอกที่อยู่',
    },
    maxLength: 200,
    minLength: 10,
  }),

  createMultilangText({
    name: 'phone',
    label: 'เบอร์โทรศัพท์',
    required: false,
    admin: {
      description: 'เบอร์โทรศัพท์ติดต่อ',
      placeholder: 'กรอกเบอร์โทรศัพท์',
    },
    maxLength: 20,
    minLength: 8,
  }),

  createMultilangText({
    name: 'email',
    label: 'อีเมล',
    required: false,
    admin: {
      description: 'อีเมลติดต่อ',
      placeholder: 'กรอกอีเมล',
    },
    maxLength: 100,
    minLength: 5,
  }),

  createMultilangText({
    name: 'website',
    label: 'เว็บไซต์',
    required: false,
    admin: {
      description: 'เว็บไซต์ของบริษัท',
      placeholder: 'กรอกเว็บไซต์',
    },
    maxLength: 100,
    minLength: 5,
  }),

  // Social Media
  createMultilangText({
    name: 'facebookUrl',
    label: 'Facebook URL',
    required: false,
    admin: {
      description: 'ลิงก์ Facebook',
      placeholder: 'กรอก Facebook URL',
    },
    maxLength: 200,
    minLength: 10,
  }),

  createMultilangText({
    name: 'twitterUrl',
    label: 'Twitter URL',
    required: false,
    admin: {
      description: 'ลิงก์ Twitter',
      placeholder: 'กรอก Twitter URL',
    },
    maxLength: 200,
    minLength: 10,
  }),

  createMultilangText({
    name: 'instagramUrl',
    label: 'Instagram URL',
    required: false,
    admin: {
      description: 'ลิงก์ Instagram',
      placeholder: 'กรอก Instagram URL',
    },
    maxLength: 200,
    minLength: 10,
  }),

  createMultilangText({
    name: 'linkedinUrl',
    label: 'LinkedIn URL',
    required: false,
    admin: {
      description: 'ลิงก์ LinkedIn',
      placeholder: 'กรอก LinkedIn URL',
    },
    maxLength: 200,
    minLength: 10,
  }),

  createMultilangText({
    name: 'youtubeUrl',
    label: 'YouTube URL',
    required: false,
    admin: {
      description: 'ลิงก์ YouTube',
      placeholder: 'กรอก YouTube URL',
    },
    maxLength: 200,
    minLength: 10,
  }),

  // Copyright and Legal
  createMultilangText({
    name: 'copyrightText',
    label: 'ข้อความลิขสิทธิ์',
    required: false,
    admin: {
      description: 'ข้อความลิขสิทธิ์ที่แสดงใน Footer',
      placeholder: 'กรอกข้อความลิขสิทธิ์',
    },
    maxLength: 200,
    minLength: 10,
  }),

  createMultilangText({
    name: 'privacyPolicyText',
    label: 'ข้อความนโยบายความเป็นส่วนตัว',
    required: false,
    admin: {
      description: 'ข้อความสำหรับลิงก์นโยบายความเป็นส่วนตัว',
      placeholder: 'กรอกข้อความนโยบายความเป็นส่วนตัว',
    },
    maxLength: 50,
    minLength: 5,
  }),

  createMultilangText({
    name: 'termsOfServiceText',
    label: 'ข้อความเงื่อนไขการใช้งาน',
    required: false,
    admin: {
      description: 'ข้อความสำหรับลิงก์เงื่อนไขการใช้งาน',
      placeholder: 'กรอกข้อความเงื่อนไขการใช้งาน',
    },
    maxLength: 50,
    minLength: 5,
  }),

  createMultilangText({
    name: 'cookiesPolicyText',
    label: 'ข้อความนโยบายคุกกี้',
    required: false,
    admin: {
      description: 'ข้อความสำหรับลิงก์นโยบายคุกกี้',
      placeholder: 'กรอกข้อความนโยบายคุกกี้',
    },
    maxLength: 50,
    minLength: 5,
  }),

  // Newsletter
  createMultilangText({
    name: 'newsletterTitle',
    label: 'หัวข้อจดหมายข่าว',
    required: false,
    admin: {
      description: 'หัวข้อสำหรับส่วนจดหมายข่าว',
      placeholder: 'กรอกหัวข้อจดหมายข่าว',
    },
    maxLength: 100,
    minLength: 5,
  }),

  createMultilangTextarea({
    name: 'newsletterDescription',
    label: 'คำอธิบายจดหมายข่าว',
    required: false,
    admin: {
      description: 'คำอธิบายสำหรับส่วนจดหมายข่าว',
      placeholder: 'กรอกคำอธิบายจดหมายข่าว',
    },
    maxLength: 200,
    minLength: 10,
    rows: 2,
  }),

  createMultilangText({
    name: 'newsletterButtonText',
    label: 'ข้อความปุ่มสมัครจดหมายข่าว',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่มสมัครจดหมายข่าว',
      placeholder: 'กรอกข้อความปุ่มสมัครจดหมายข่าว',
    },
    maxLength: 30,
    minLength: 3,
  }),

  createMultilangText({
    name: 'newsletterPlaceholder',
    label: 'ข้อความในช่องอีเมลจดหมายข่าว',
    required: false,
    admin: {
      description: 'ข้อความที่แสดงในช่องอีเมลจดหมายข่าว',
      placeholder: 'กรอกข้อความในช่องอีเมลจดหมายข่าว',
    },
    maxLength: 50,
    minLength: 5,
  }),

  // Additional Information
  createMultilangText({
    name: 'businessHours',
    label: 'เวลาทำการ',
    required: false,
    admin: {
      description: 'เวลาทำการของบริษัท',
      placeholder: 'กรอกเวลาทำการ',
    },
    maxLength: 100,
    minLength: 5,
  }),

  createMultilangText({
    name: 'taxId',
    label: 'เลขประจำตัวผู้เสียภาษี',
    required: false,
    admin: {
      description: 'เลขประจำตัวผู้เสียภาษีของบริษัท',
      placeholder: 'กรอกเลขประจำตัวผู้เสียภาษี',
    },
    maxLength: 20,
    minLength: 8,
  }),

  createMultilangText({
    name: 'registrationNumber',
    label: 'เลขทะเบียนบริษัท',
    required: false,
    admin: {
      description: 'เลขทะเบียนบริษัท',
      placeholder: 'กรอกเลขทะเบียนบริษัท',
    },
    maxLength: 20,
    minLength: 8,
  }),
]
