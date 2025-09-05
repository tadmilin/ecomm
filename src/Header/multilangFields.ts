import type { Field } from 'payload'
import { createMultilangText, createMultilangTextarea } from '@/fields/multilang'

// Multilang Fields สำหรับ Header Global
export const headerMultilangFields: Field[] = [
  // Logo Alt Text Field
  createMultilangText({
    name: 'logoAltText',
    label: 'ข้อความ Alt ของโลโก้',
    required: false,
    admin: {
      description: 'ข้อความ Alt สำหรับโลโก้ (สำหรับการเข้าถึง)',
      placeholder: 'กรอกข้อความ Alt ของโลโก้',
    },
    maxLength: 100,
    minLength: 5,
  }),

  // Site Title Field
  createMultilangText({
    name: 'siteTitle',
    label: 'ชื่อเว็บไซต์',
    required: false,
    admin: {
      description: 'ชื่อเว็บไซต์ที่แสดงใน Header',
      placeholder: 'กรอกชื่อเว็บไซต์',
    },
    maxLength: 50,
    minLength: 3,
  }),

  // Site Description Field
  createMultilangTextarea({
    name: 'siteDescription',
    label: 'คำอธิบายเว็บไซต์',
    required: false,
    admin: {
      description: 'คำอธิบายสั้นๆ ของเว็บไซต์',
      placeholder: 'กรอกคำอธิบายเว็บไซต์',
    },
    maxLength: 200,
    minLength: 10,
    rows: 2,
  }),

  // Search Placeholder Field
  createMultilangText({
    name: 'searchPlaceholder',
    label: 'ข้อความในช่องค้นหา',
    required: false,
    admin: {
      description: 'ข้อความที่แสดงในช่องค้นหา',
      placeholder: 'กรอกข้อความในช่องค้นหา',
    },
    maxLength: 50,
    minLength: 5,
  }),

  // CTA Button Text Field
  createMultilangText({
    name: 'ctaButtonText',
    label: 'ข้อความปุ่ม CTA',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่ม Call-to-Action',
      placeholder: 'กรอกข้อความปุ่ม CTA',
    },
    maxLength: 30,
    minLength: 3,
  }),

  // CTA Button URL Field
  createMultilangText({
    name: 'ctaButtonUrl',
    label: 'URL ปุ่ม CTA',
    required: false,
    admin: {
      description: 'URL สำหรับปุ่ม Call-to-Action',
      placeholder: 'กรอก URL ปุ่ม CTA',
    },
    maxLength: 200,
    minLength: 5,
  }),

  // Login Button Text Field
  createMultilangText({
    name: 'loginButtonText',
    label: 'ข้อความปุ่มเข้าสู่ระบบ',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่มเข้าสู่ระบบ',
      placeholder: 'กรอกข้อความปุ่มเข้าสู่ระบบ',
    },
    maxLength: 30,
    minLength: 3,
  }),

  // Register Button Text Field
  createMultilangText({
    name: 'registerButtonText',
    label: 'ข้อความปุ่มสมัครสมาชิก',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่มสมัครสมาชิก',
      placeholder: 'กรอกข้อความปุ่มสมัครสมาชิก',
    },
    maxLength: 30,
    minLength: 3,
  }),

  // Profile Button Text Field
  createMultilangText({
    name: 'profileButtonText',
    label: 'ข้อความปุ่มโปรไฟล์',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่มโปรไฟล์',
      placeholder: 'กรอกข้อความปุ่มโปรไฟล์',
    },
    maxLength: 30,
    minLength: 3,
  }),

  // Logout Button Text Field
  createMultilangText({
    name: 'logoutButtonText',
    label: 'ข้อความปุ่มออกจากระบบ',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่มออกจากระบบ',
      placeholder: 'กรอกข้อความปุ่มออกจากระบบ',
    },
    maxLength: 30,
    minLength: 3,
  }),

  // Mobile Menu Toggle Text Field
  createMultilangText({
    name: 'mobileMenuToggleText',
    label: 'ข้อความปุ่มเปิดเมนูมือถือ',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่มเปิดเมนูมือถือ',
      placeholder: 'กรอกข้อความปุ่มเปิดเมนูมือถือ',
    },
    maxLength: 30,
    minLength: 3,
  }),

  // Close Menu Text Field
  createMultilangText({
    name: 'closeMenuText',
    label: 'ข้อความปุ่มปิดเมนู',
    required: false,
    admin: {
      description: 'ข้อความสำหรับปุ่มปิดเมนู',
      placeholder: 'กรอกข้อความปุ่มปิดเมนู',
    },
    maxLength: 30,
    minLength: 3,
  }),
]
