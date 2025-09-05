import type { Field } from 'payload'

interface MultilangArrayOptions {
  name: string
  label: string
  required?: boolean
  admin?: {
    description?: string
  }
  fields: Field[]
  minRows?: number
  maxRows?: number
}

export const createMultilangArray = (options: MultilangArrayOptions): Field => {
  const { name, label, required = false, admin, fields, minRows, maxRows } = options

  return {
    name,
    type: 'group',
    label,
    admin: {
      ...admin,
      condition: (data, siblingData, { user }) => {
        // ตรวจสอบว่า i18n เปิดใช้งานหรือไม่
        return true
      },
    },
    fields: [
      {
        name: 'th',
        type: 'array',
        label: 'ไทย (Thai)',
        required: required,
        fields,
        admin: {
          initCollapsed: true,
        },
        minRows,
        maxRows,
      },
      {
        name: 'en',
        type: 'array',
        label: 'English',
        fields,
        admin: {
          initCollapsed: true,
        },
        minRows,
        maxRows,
      },
      {
        name: 'ja',
        type: 'array',
        label: '日本語 (Japanese)',
        fields,
        admin: {
          initCollapsed: true,
        },
        minRows,
        maxRows,
      },
      {
        name: 'zh',
        type: 'array',
        label: '中文 (Chinese)',
        fields,
        admin: {
          initCollapsed: true,
        },
        minRows,
        maxRows,
      },
      {
        name: 'es',
        type: 'array',
        label: 'Español (Spanish)',
        fields,
        admin: {
          initCollapsed: true,
        },
        minRows,
        maxRows,
      },
      {
        name: 'fr',
        type: 'array',
        label: 'Français (French)',
        fields,
        admin: {
          initCollapsed: true,
        },
        minRows,
        maxRows,
      },
    ],
  }
}
