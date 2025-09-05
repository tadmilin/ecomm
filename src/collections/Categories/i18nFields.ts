import type { Field } from 'payload'

// i18n Settings Fields สำหรับ Categories Collection
export const categoriesI18nFields: Field[] = [
  {
    name: 'enableTranslations',
    type: 'checkbox',
    label: 'เปิดใช้งานการแปลภาษา',
    defaultValue: true,
    admin: {
      description: 'เปิด/ปิดการแปลภาษาสำหรับหมวดหมู่นี้',
      position: 'sidebar',
    },
  },
  {
    name: 'supportedLanguages',
    type: 'select',
    label: 'ภาษาที่รองรับ',
    hasMany: true,
    maxRows: 5,
    required: true,
    defaultValue: ['th', 'en'],
    options: [
      {
        label: 'ไทย (Thai)',
        value: 'th',
      },
      {
        label: 'English',
        value: 'en',
      },
      {
        label: '日本語 (Japanese)',
        value: 'ja',
      },
      {
        label: '中文 (Chinese)',
        value: 'zh',
      },
      {
        label: 'Español (Spanish)',
        value: 'es',
      },
      {
        label: 'Français (French)',
        value: 'fr',
      },
    ],
    admin: {
      description: 'เลือกภาษาที่ต้องการรองรับสำหรับหมวดหมู่นี้ (สูงสุด 5 ภาษา)',
      position: 'sidebar',
      condition: (data, siblingData) => {
        return siblingData?.enableTranslations === true
      },
    },
  },
  {
    name: 'defaultLanguage',
    type: 'select',
    label: 'ภาษาเริ่มต้น',
    required: true,
    defaultValue: 'th',
    options: [
      {
        label: 'ไทย (Thai)',
        value: 'th',
      },
      {
        label: 'English',
        value: 'en',
      },
      {
        label: '日本語 (Japanese)',
        value: 'ja',
      },
      {
        label: '中文 (Chinese)',
        value: 'zh',
      },
      {
        label: 'Español (Spanish)',
        value: 'es',
      },
      {
        label: 'Français (French)',
        value: 'fr',
      },
    ],
    admin: {
      description: 'ภาษาที่แสดงเมื่อเข้าเว็บไซต์ครั้งแรก',
      position: 'sidebar',
      condition: (data, siblingData) => {
        return siblingData?.enableTranslations === true
      },
    },
  },
]
