import type { Block } from 'payload'

export const PromotionBanner: Block = {
  slug: 'promotionBanner',
  interfaceName: 'PromotionBannerBlock',
  labels: {
    singular: 'Promotion Banner',
    plural: 'Promotion Banners',
  },
  fields: [
    {
      name: 'banners',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Banners',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'รูปภาพ Banner',
          admin: {
            description: 'แนะนำขนาด 1920x600 พิกเซล หรือ 16:5 ratio',
          },
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
          label: 'รูปภาพ Banner (Mobile)',
          admin: {
            description: 'รูปสำหรับมือถือ (optional) แนะนำขนาด 800x800 พิกเซล',
          },
        },
        {
          name: 'alt',
          type: 'text',
          localized: true,
          label: 'Alt Text',
          admin: {
            description: 'คำอธิบายรูปภาพสำหรับ SEO',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
          admin: {
            description: 'URL ที่จะไปเมื่อคลิก banner (เช่น /products/sale)',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          label: 'เปิดในแท็บใหม่',
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      defaultValue: true,
      label: 'เลื่อนอัตโนมัติ',
      admin: {
        description: 'เปิดให้ banner เลื่อนเองทุก 5 วินาที',
      },
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      defaultValue: true,
      label: 'แสดงปุ่มเลื่อนซ้าย-ขวา',
    },
    {
      name: 'showDots',
      type: 'checkbox',
      defaultValue: true,
      label: 'แสดง Dots Indicator',
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16/9',
      options: [
        { label: '16:9 (Standard - แนะนำ)', value: '16/9' },
        { label: '21:9 (Ultrawide)', value: '21/9' },
        { label: '4:3 (แบบเก่า)', value: '4/3' },
        { label: '2:1 (Wide)', value: '2/1' },
      ],
      label: 'สัดส่วนรูปภาพ',
      admin: {
        description: 'อัตราส่วนความกว้าง:สูงของ banner',
      },
    },
    {
      name: 'rounded',
      type: 'checkbox',
      defaultValue: true,
      label: 'มุมโค้งมน',
    },
  ],
}
