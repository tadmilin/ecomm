import type { GlobalConfig } from 'payload'

export const I18nSettings: GlobalConfig = {
  slug: 'i18n-settings',
  admin: {
    group: 'Configuration',
    description: 'การตั้งค่าระบบแปลภาษา',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'enableTranslations',
      type: 'checkbox',
      label: 'เปิดใช้งานการแปลภาษา',
      defaultValue: true,
      admin: {
        description: 'เปิด/ปิดระบบแปลภาษาทั้งหมด',
      },
    },
      {
    name: 'supportedLanguages',
    type: 'select',
    label: 'ภาษาที่รองรับ',
    hasMany: true,
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
        description: 'เลือกภาษาที่ต้องการรองรับ (สูงสุด 5 ภาษา)',
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
        condition: (data, siblingData) => {
          return siblingData?.enableTranslations === true
        },
      },
    },
    {
      name: 'languageDisplaySettings',
      type: 'group',
      label: 'การตั้งค่าการแสดงผลภาษา',
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.enableTranslations === true
        },
      },
      fields: [
        {
          name: 'showLanguageSwitcher',
          type: 'checkbox',
          label: 'แสดงปุ่มเปลี่ยนภาษา',
          defaultValue: true,
          admin: {
            description: 'แสดงปุ่มเปลี่ยนภาษาใน Header',
          },
        },
        {
          name: 'showFlags',
          type: 'checkbox',
          label: 'แสดงธงชาติ',
          defaultValue: true,
          admin: {
            description: 'แสดงธงชาติในปุ่มเปลี่ยนภาษา',
          },
        },
        {
          name: 'showNativeNames',
          type: 'checkbox',
          label: 'แสดงชื่อภาษาดั้งเดิม',
          defaultValue: true,
          admin: {
            description: 'แสดงชื่อภาษาดั้งเดิม (เช่น ไทย, English)',
          },
        },
        {
          name: 'languageSwitcherPosition',
          type: 'select',
          label: 'ตำแหน่งปุ่มเปลี่ยนภาษา',
          defaultValue: 'header',
          options: [
            {
              label: 'Header (ด้านบน)',
              value: 'header',
            },
            {
              label: 'Footer (ด้านล่าง)',
              value: 'footer',
            },
            {
              label: 'ทั้ง Header และ Footer',
              value: 'both',
            },
          ],
        },
      ],
    },
    {
      name: 'translationSettings',
      type: 'group',
      label: 'การตั้งค่าการแปล',
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.enableTranslations === true
        },
      },
      fields: [
        {
          name: 'autoTranslate',
          type: 'checkbox',
          label: 'แปลอัตโนมัติ',
          defaultValue: false,
          admin: {
            description: 'ใช้ AI แปลอัตโนมัติเมื่อสร้างเนื้อหาใหม่',
          },
        },
        {
          name: 'translationProvider',
          type: 'select',
          label: 'ผู้ให้บริการแปล',
          defaultValue: 'manual',
          options: [
            {
              label: 'แปลด้วยตนเอง',
              value: 'manual',
            },
            {
              label: 'Google Translate',
              value: 'google',
            },
            {
              label: 'Microsoft Translator',
              value: 'microsoft',
            },
          ],
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.autoTranslate === true
            },
          },
        },
        {
          name: 'fallbackLanguage',
          type: 'select',
          label: 'ภาษาสำรอง',
          defaultValue: 'en',
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
            description: 'ภาษาที่จะแสดงเมื่อไม่มีคำแปลในภาษาที่เลือก',
          },
        },
      ],
    },
  ],
}
