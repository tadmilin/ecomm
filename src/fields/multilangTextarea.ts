import type { Field } from 'payload'

interface MultilangTextareaOptions {
  name: string
  label: string
  required?: boolean
  admin?: {
    description?: string
    placeholder?: string
  }
  maxLength?: number
  minLength?: number
  rows?: number
}

export const createMultilangTextarea = (options: MultilangTextareaOptions): Field => {
  const { name, label, required = false, admin, maxLength, minLength, rows = 4 } = options

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
        type: 'textarea',
        label: 'ไทย (Thai)',
        required: required,
        admin: {
          placeholder: admin?.placeholder || `กรอก${label.toLowerCase()}`,
          rows,
        },
        maxLength,
        minLength,
      },
      {
        name: 'en',
        type: 'textarea',
        label: 'English',
        admin: {
          placeholder: admin?.placeholder || `Enter ${label.toLowerCase()}`,
          rows,
        },
        maxLength,
        minLength,
      },
      {
        name: 'ja',
        type: 'textarea',
        label: '日本語 (Japanese)',
        admin: {
          placeholder: admin?.placeholder || `${label}を入力`,
          rows,
        },
        maxLength,
        minLength,
      },
      {
        name: 'zh',
        type: 'textarea',
        label: '中文 (Chinese)',
        admin: {
          placeholder: admin?.placeholder || `输入${label}`,
          rows,
        },
        maxLength,
        minLength,
      },
      {
        name: 'es',
        type: 'textarea',
        label: 'Español (Spanish)',
        admin: {
          placeholder: admin?.placeholder || `Ingrese ${label.toLowerCase()}`,
          rows,
        },
        maxLength,
        minLength,
      },
      {
        name: 'fr',
        type: 'textarea',
        label: 'Français (French)',
        admin: {
          placeholder: admin?.placeholder || `Entrez ${label.toLowerCase()}`,
          rows,
        },
        maxLength,
        minLength,
      },
    ],
  }
}
