import type { Field } from 'payload'

interface MultilangSelectOptions {
  name: string
  label: string
  options: Array<{
    label: string
    value: string
  }>
  required?: boolean
  admin?: {
    description?: string
  }
}

export const createMultilangSelect = (options: MultilangSelectOptions): Field => {
  const { name, label, options: selectOptions, required = false, admin } = options

  return {
    name,
    type: 'group',
    label,
    admin: {
    },
    fields: [
      {
        name: 'th',
        type: 'select',
        label: 'ไทย (Thai)',
        required: required,
        options: selectOptions,
        admin: {
          placeholder: 'เลือกตัวเลือก',
        },
      },
      {
        name: 'en',
        type: 'select',
        label: 'English',
        options: selectOptions,
        admin: {
          placeholder: 'Select option',
        },
      },
      {
        name: 'ja',
        type: 'select',
        label: '日本語 (Japanese)',
        options: selectOptions,
        admin: {
          placeholder: 'オプションを選択',
        },
      },
      {
        name: 'zh',
        type: 'select',
        label: '中文 (Chinese)',
        options: selectOptions,
        admin: {
          placeholder: '选择选项',
        },
      },
      {
        name: 'es',
        type: 'select',
        label: 'Español (Spanish)',
        options: selectOptions,
        admin: {
          placeholder: 'Seleccionar opción',
        },
      },
      {
        name: 'fr',
        type: 'select',
        label: 'Français (French)',
        options: selectOptions,
        admin: {
          placeholder: 'Sélectionner une option',
        },
      },
    ],
  }
}
