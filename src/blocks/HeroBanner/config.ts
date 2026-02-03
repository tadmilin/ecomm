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
        description: 'แนะนำขนาด 2520x1080 พิกเซล (อัตราส่วน 21:9) - ใช้รูปเดียวสำหรับทุกขนาดหน้าจอ รูปจะแสดงเต็มโดยไม่ crop',
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
