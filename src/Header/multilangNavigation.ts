import type { Field } from 'payload'
import { createMultilangText } from '@/fields/multilang'

// Multilang Navigation Fields สำหรับ Header Global
export const headerMultilangNavigation: Field[] = [
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
          createMultilangText({
            name: 'siteDescription',
            label: 'คำอธิบายเว็บไซต์',
            required: false,
            admin: {
              description: 'คำอธิบายสั้นๆ ของเว็บไซต์',
              placeholder: 'กรอกคำอธิบายเว็บไซต์',
            },
            maxLength: 200,
            minLength: 10,
          }),
        ],
      },
      {
        label: 'การค้นหา',
        fields: [
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
        ],
      },
      {
        label: 'ปุ่มต่างๆ',
        fields: [
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
        ],
      },
      {
        label: 'เมนูมือถือ',
        fields: [
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
        ],
      },
    ],
  },
]
