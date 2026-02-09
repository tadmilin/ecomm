import type { Field } from 'payload'

interface MultilangTextarea3Options {
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

// Multilang Textarea สำหรับ 3 ภาษา: ไทย, อังกฤษ, จีน
export const createMultilangTextarea3 = (options: MultilangTextarea3Options): Field => {
  const { name, label, required = false, admin, maxLength, minLength, rows = 4 } = options

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
        type: 'textarea',
        label: 'ไทย (Thai)',
        required: required,
        admin: {
          placeholder: admin?.placeholder || `กรอก${label}`,
          rows,
        },
        maxLength,
        minLength,
      },
      {
        name: 'en',
        type: 'textarea',
        label: 'English',
        required: false,
        admin: {
          placeholder: admin?.placeholder || `Enter ${label}`,
          rows,
        },
        maxLength,
        minLength,
      },
      {
        name: 'zh',
        type: 'textarea',
        label: '中文 (Chinese)',
        required: false,
        admin: {
          placeholder: admin?.placeholder || `输入${label}`,
          rows,
        },
        maxLength,
        minLength,
      },
    ],
  }
}
