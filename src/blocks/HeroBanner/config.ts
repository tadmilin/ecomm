import type { Block } from 'payload'

export const HeroBanner: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'รูปภาพ Banner',
      admin: {
        description: 'แนะนำขนาด 1920x400 พิกเซล หรือ 16:3.3 ratio (สำหรับ desktop) - รูปจะแสดงเต็มความกว้างหน้าจอ',
      },
    },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'รูปภาพ Banner (Mobile)',
      admin: {
        description: 'แนะนำขนาด 800x300 พิกเซล หรือ 8:3 ratio - สำหรับมือถือ (ถ้าไม่ใส่จะใช้รูป desktop)',
      },
    },
    {
      name: 'alt',
      type: 'text',
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
        description: 'URL ที่จะไปเมื่อคลิก banner (ถ้าต้องการ)',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
      label: 'เปิดในแท็บใหม่',
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'เล็ก (200px)', value: 'small' },
        { label: 'กลาง (300px)', value: 'medium' },
        { label: 'ใหญ่ (400px)', value: 'large' },
        { label: 'ใหญ่มาก (500px)', value: 'xlarge' },
      ],
      label: 'ความสูง Banner',
      admin: {
        description: 'ความสูงของ banner บน desktop',
      },
    },
  ],
}
