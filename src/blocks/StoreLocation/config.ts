import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const StoreLocation: Block = {
  slug: 'storeLocation',
  interfaceName: 'StoreLocationBlock',
  labels: {
    singular: 'Store Location',
    plural: 'Store Locations',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'หัวข้อ',
      defaultValue: 'เดินทางมาที่ร้าน',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'ที่อยู่',
      admin: {
        description: 'ที่อยู่ร้านค้าแบบเต็ม',
        rows: 3,
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'เบอร์โทรศัพท์',
      admin: {
        description: 'เช่น 02-xxx-xxxx หรือ 08x-xxx-xxxx',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'อีเมล',
    },
    {
      name: 'workingHours',
      type: 'array',
      label: 'เวลาทำการ',
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          localized: true,
          label: 'วัน',
          admin: {
            description: 'เช่น จันทร์-ศุกร์, เสาร์-อาทิตย์',
          },
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
          label: 'เวลา',
          admin: {
            description: 'เช่น 08:00 - 17:00',
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      required: true,
      label: 'Google Maps URL',
      admin: {
        description: 'ลิงก์ Google Maps แบบเต็ม (https://maps.google.com/...)',
      },
    },
    {
      name: 'googleMapsEmbed',
      type: 'textarea',
      required: true,
      label: 'Google Maps Embed Code',
      admin: {
        description: 'โค้ด iframe embed จาก Google Maps (คลิกขวาบนแผนที่ > Share > Embed a map)',
        rows: 4,
      },
    },
    {
      name: 'latitude',
      type: 'number',
      label: 'ละติจูด (Latitude)',
      admin: {
        description: 'สำหรับแสดงพิกัด (ถ้ามี)',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'ลองจิจูด (Longitude)',
      admin: {
        description: 'สำหรับแสดงพิกัด (ถ้ามี)',
      },
    },
    {
      name: 'directions',
      type: 'array',
      label: 'คำแนะนำการเดินทาง',
      fields: [
        {
          name: 'method',
          type: 'select',
          required: true,
          options: [
            { label: 'รถยนต์ส่วนตัว', value: 'car' },
            { label: 'รถไฟฟ้า BTS/MRT', value: 'train' },
            { label: 'รถโดยสารประจำทาง', value: 'bus' },
            { label: 'แท็กซี่/Grab', value: 'taxi' },
            { label: 'อื่นๆ', value: 'other' },
          ],
          label: 'วิธีการเดินทาง',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'หัวข้อ',
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          label: 'คำอธิบาย',
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'showCoordinates',
      type: 'checkbox',
      defaultValue: false,
      label: 'แสดงพิกัดละติจูด/ลองจิจูด',
    },
  ],
}
