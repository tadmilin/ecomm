import type { Field } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

interface MultilangRichTextOptions {
  name: string
  label: string
  required?: boolean
  admin?: {
    description?: string
    placeholder?: string
  }
}

export const createMultilangRichText = (options: MultilangRichTextOptions): Field => {
  const { name, label, required = false, admin } = options

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
        type: 'richText',
        label: 'ไทย (Thai)',
        required: required,
        editor: defaultLexical,
        admin: {
          description: admin?.placeholder || `กรอก${label.toLowerCase()}`,
        },
      },
      {
        name: 'en',
        type: 'richText',
        label: 'English',
        editor: defaultLexical,
        admin: {
          description: admin?.placeholder || `Enter ${label.toLowerCase()}`,
        },
      },
      {
        name: 'ja',
        type: 'richText',
        label: '日本語 (Japanese)',
        editor: defaultLexical,
        admin: {
          description: admin?.placeholder || `${label}を入力`,
        },
      },
      {
        name: 'zh',
        type: 'richText',
        label: '中文 (Chinese)',
        editor: defaultLexical,
        admin: {
          description: admin?.placeholder || `输入${label}`,
        },
      },
      {
        name: 'es',
        type: 'richText',
        label: 'Español (Spanish)',
        editor: defaultLexical,
        admin: {
          description: admin?.placeholder || `Ingrese ${label.toLowerCase()}`,
        },
      },
      {
        name: 'fr',
        type: 'richText',
        label: 'Français (French)',
        editor: defaultLexical,
        admin: {
          description: admin?.placeholder || `Entrez ${label.toLowerCase()}`,
        },
      },
    ],
  }
}
