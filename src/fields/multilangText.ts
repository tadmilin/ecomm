import type { Field } from 'payload'

interface MultilangTextOptions {
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

export const createMultilangText = (options: MultilangTextOptions): Field => {
  const { name, label, required = false, admin, maxLength, minLength } = options

  return {
    name,
    type: 'group',
    label,
    admin: {
      ...admin,
      condition: (data, siblingData, { user }) => {
        // ตรวจสอบว่า i18n เปิดใช้งานหรือไม่
        // ในที่นี้เราจะใช้ค่าเริ่มต้นเป็น true
        // ในภายหลังจะเชื่อมต่อกับ Global I18nSettings
        return true
      },
    },
    fields: [
      {
        name: 'th',
        type: 'text',
        label: 'ไทย (Thai)',
        required: required,
        admin: {
          placeholder: admin?.placeholder || `กรอก${label.toLowerCase()}`,
        },
        maxLength,
        minLength,
      },
      {
        name: 'en',
        type: 'text',
        label: 'English',
        admin: {
          placeholder: admin?.placeholder || `Enter ${label.toLowerCase()}`,
        },
        maxLength,
        minLength,
      },
      {
        name: 'ja',
        type: 'text',
        label: '日本語 (Japanese)',
        admin: {
          placeholder: admin?.placeholder || `${label}を入力`,
        },
        maxLength,
        minLength,
      },
      {
        name: 'zh',
        type: 'text',
        label: '中文 (Chinese)',
        admin: {
          placeholder: admin?.placeholder || `输入${label}`,
        },
        maxLength,
        minLength,
      },
      {
        name: 'es',
        type: 'text',
        label: 'Español (Spanish)',
        admin: {
          placeholder: admin?.placeholder || `Ingrese ${label.toLowerCase()}`,
        },
        maxLength,
        minLength,
      },
      {
        name: 'fr',
        type: 'text',
        label: 'Français (French)',
        admin: {
          placeholder: admin?.placeholder || `Entrez ${label.toLowerCase()}`,
        },
        maxLength,
        minLength,
      },
    ],
  }
}
