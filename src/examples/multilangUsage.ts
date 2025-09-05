import { createMultilangText, createMultilangRichText, createMultilangSelect, createMultilangTextarea, createMultilangArray } from '@/fields/multilang'

// ตัวอย่างการใช้งาน Multilang Fields

// 1. Multilang Text Field
export const titleField = createMultilangText({
  name: 'title',
  label: 'หัวข้อ',
  required: true,
  admin: {
    description: 'หัวข้อของเนื้อหา',
    placeholder: 'กรอกหัวข้อ',
  },
  maxLength: 100,
  minLength: 5,
})

// 2. Multilang Rich Text Field
export const contentField = createMultilangRichText({
  name: 'content',
  label: 'เนื้อหา',
  required: true,
  admin: {
    description: 'เนื้อหาหลักของหน้า',
    placeholder: 'กรอกเนื้อหา',
  },
})

// 3. Multilang Select Field
export const categoryField = createMultilangSelect({
  name: 'category',
  label: 'หมวดหมู่',
  required: true,
  options: [
    { label: 'ข่าวสาร', value: 'news' },
    { label: 'บทความ', value: 'article' },
    { label: 'ผลิตภัณฑ์', value: 'product' },
    { label: 'บริการ', value: 'service' },
  ],
  admin: {
    description: 'เลือกหมวดหมู่ของเนื้อหา',
  },
})

// 4. Multilang Textarea Field
export const descriptionField = createMultilangTextarea({
  name: 'description',
  label: 'คำอธิบาย',
  required: false,
  admin: {
    description: 'คำอธิบายสั้นๆ ของเนื้อหา',
    placeholder: 'กรอกคำอธิบาย',
  },
  maxLength: 500,
  minLength: 10,
  rows: 3,
})

// 5. Multilang Array Field
export const featuresField = createMultilangArray({
  name: 'features',
  label: 'คุณสมบัติ',
  required: false,
  admin: {
    description: 'รายการคุณสมบัติของผลิตภัณฑ์',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'หัวข้อคุณสมบัติ',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'คำอธิบาย',
      required: false,
    },
    {
      name: 'icon',
      type: 'text',
      label: 'ไอคอน',
      required: false,
      admin: {
        description: 'ชื่อไอคอนจาก Lucide React',
      },
    },
  ],
  minRows: 1,
  maxRows: 10,
})

// ตัวอย่างการใช้งานใน Collection
export const examplePageFields = [
  titleField,
  contentField,
  categoryField,
  descriptionField,
  featuresField,
]
