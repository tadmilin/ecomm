import type { Field } from 'payload'

interface MultilangText3Options {
  name: string
  label: string
  required?: boolean
  admin?: {
    description?: string
    placeholder?: string
  }
  maxLength?: number
  minLength?: number
}

// Multilang Text สำหรับ 3 ภาษา: ไทย, อังกฤษ, จีน
export const createMultilangText3 = (options: MultilangText3Options): Field => {
  const { name, label, required = false, admin, maxLength, minLength } = options

  return {
    name,
    type: 'group',
    label,
    admin: {
      ...admin,
    },
    fields: [
      {
        name: 'th',
        type: 'text',
        label: 'ไทย (Thai)',
        required: required,
        admin: {
          placeholder: admin?.placeholder || `กรอก${label}`,
        },
        maxLength,
        minLength,
      },
      {
        name: 'en',
        type: 'text',
        label: 'English',
        required: false,
        admin: {
          placeholder: admin?.placeholder || `Enter ${label}`,
        },
        maxLength,
        minLength,
      },
      {
        name: 'zh',
        type: 'text',
        label: '中文 (Chinese)',
        required: false,
        admin: {
          placeholder: admin?.placeholder || `输入${label}`,
        },
        maxLength,
        minLength,
      },
    ],
  }
}
