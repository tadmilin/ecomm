import type { CollectionConfig } from 'payload'

// Language constants for better maintainability
const LANGUAGE_CODES = {
  THAI: 'th',
  ENGLISH: 'en',
  JAPANESE: 'ja',
} as const

const CURRENCIES = {
  THB: 'THB',
  USD: 'USD',
  JPY: 'JPY',
} as const

const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const

const TIME_FORMATS = {
  HOURS_12: '12h',
  HOURS_24: '24h',
} as const

export const Languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'nativeName', 'isActive', 'isDefault'],
    group: 'E-commerce',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'รหัสภาษา',
      admin: {
        description: `รหัสภาษา ISO 639-1 (เช่น: ${LANGUAGE_CODES.THAI}, ${LANGUAGE_CODES.ENGLISH}, ${LANGUAGE_CODES.JAPANESE})`,
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'ชื่อภาษา (ภาษาอังกฤษ)',
      admin: {
        description: 'ชื่อภาษาในภาษาอังกฤษ',
      },
    },
    {
      name: 'nativeName',
      type: 'text',
      required: true,
      label: 'ชื่อภาษาในภาษาต้นฉบับ',
      admin: {
        description: 'ชื่อภาษาในภาษาต้นฉบับ (เช่น: ไทย, English, 日本語)',
      },
    },
    {
      name: 'flag',
      type: 'upload',
      relationTo: 'media',
      label: 'ธงชาติ',
      admin: {
        description: 'รูปธงชาติของภาษา',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'เปิดใช้งาน',
      defaultValue: true,
      admin: {
        description: 'เปิดใช้งานภาษานี้ในระบบ',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      label: 'ภาษาเริ่มต้น',
      defaultValue: false,
      admin: {
        description: 'ตั้งเป็นภาษาเริ่มต้นของระบบ (เลือกได้เพียงภาษาเดียว)',
      },
    },
    {
      name: 'direction',
      type: 'select',
      label: 'ทิศทางการเขียน',
      options: [
        { label: 'ซ้ายไปขวา (LTR)', value: DIRECTIONS.LTR },
        { label: 'ขวาไปซ้าย (RTL)', value: DIRECTIONS.RTL },
      ],
      defaultValue: DIRECTIONS.LTR,
      admin: {
        description: 'ทิศทางการเขียนของภาษา',
      },
    },
    {
      name: 'dateFormat',
      type: 'text',
      label: 'รูปแบบวันที่',
      defaultValue: 'DD/MM/YYYY',
      admin: {
        description: 'รูปแบบการแสดงวันที่ (เช่น: DD/MM/YYYY, MM/DD/YYYY)',
      },
    },
    {
      name: 'timeFormat',
      type: 'select',
      label: 'รูปแบบเวลา',
      options: [
        { label: '12 ชั่วโมง', value: TIME_FORMATS.HOURS_12 },
        { label: '24 ชั่วโมง', value: TIME_FORMATS.HOURS_24 },
      ],
      defaultValue: TIME_FORMATS.HOURS_24,
      admin: {
        description: 'รูปแบบการแสดงเวลา',
      },
    },
            {
          name: 'currency',
          type: 'select',
          label: 'สกุลเงินหลัก',
                options: [
        { label: 'บาท (THB)', value: CURRENCIES.THB },
        { label: 'ดอลลาร์สหรัฐ (USD)', value: CURRENCIES.USD },
        { label: 'เยน (JPY)', value: CURRENCIES.JPY },
      ],
      defaultValue: CURRENCIES.THB,
          admin: {
            description: 'สกุลเงินหลักของภาษา',
          },
        },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'ลำดับการแสดงผล',
      defaultValue: 0,
      admin: {
        description: 'ลำดับการแสดงผลในเมนูภาษา (ตัวเลขน้อยแสดงก่อน)',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // ตรวจสอบว่ามีภาษาเริ่มต้นเพียงภาษาเดียว
        if (data.isDefault) {
          const existingDefault = await req.payload.find({
            collection: 'languages',
            where: {
              isDefault: { equals: true },
              id: { not_equals: data.id || 'new' },
            },
          })
          
          if (existingDefault.docs.length > 0) {
            // อัปเดตภาษาเริ่มต้นเดิมให้เป็น false
            for (const lang of existingDefault.docs) {
              await req.payload.update({
                collection: 'languages',
                id: lang.id,
                data: { isDefault: false },
              })
            }
          }
        }
        
        return data
      },
    ],
  },
}
