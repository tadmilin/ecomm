import type { Field } from 'payload'
import { createMultilangText } from '@/fields/multilang'

// Multilang Link Field สำหรับ Footer Navigation Items
export const createFooterMultilangLink = (): Field => {
  return {
    name: 'multilangLink',
    type: 'group',
    label: 'ลิงก์หลายภาษา',
    admin: {
    },
    fields: [
      {
        name: 'type',
        type: 'select',
        label: 'ประเภทลิงก์',
        required: true,
        defaultValue: 'custom',
        options: [
          {
            label: 'ลิงก์กำหนดเอง',
            value: 'custom',
          },
          {
            label: 'ลิงก์อ้างอิง',
            value: 'reference',
          },
        ],
      },
      {
        name: 'url',
        type: 'text',
        label: 'URL',
        required: true,
        admin: {
          condition: (data, siblingData) => {
            return siblingData?.type === 'custom'
          },
        },
      },
      {
        name: 'reference',
        type: 'relationship',
        label: 'อ้างอิง',
        relationTo: ['pages', 'posts', 'categories'],
        required: true,
        admin: {
          condition: (data, siblingData) => {
            return siblingData?.type === 'reference'
          },
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'เปิดในแท็บใหม่',
        defaultValue: false,
      },
      // Multilang Label
      createMultilangText({
        name: 'label',
        label: 'ข้อความลิงก์',
        required: true,
        admin: {
          description: 'ข้อความที่แสดงในลิงก์',
          placeholder: 'กรอกข้อความลิงก์',
        },
        maxLength: 50,
        minLength: 2,
      }),
    ],
  }
}
