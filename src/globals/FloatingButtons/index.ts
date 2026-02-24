import type { GlobalConfig } from 'payload'

export const FloatingButtons: GlobalConfig = {
  slug: 'floating-buttons',
  admin: {
    group: 'Configuration',
    description: 'ปุ่มลอยมุมขวาล่างของเว็บไซต์ (โทร, LINE, ฯลฯ)',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'เปิดใช้งานปุ่มลอย',
      defaultValue: true,
      admin: {
        description: 'เปิด/ปิดการแสดงผลปุ่มลอยทั้งหมด',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'รายการปุ่ม',
      minRows: 0,
      maxRows: 6,
      admin: {
        description: 'เพิ่มปุ่มลอยได้สูงสุด 6 ปุ่ม (เรียงจากล่างขึ้นบน)',
        initCollapsed: false,
        components: {
          RowLabel: '@/globals/FloatingButtons/RowLabel#FloatingButtonRowLabel',
        },
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'เปิดใช้งานปุ่มนี้',
          defaultValue: true,
          admin: {
            description: 'เปิด/ปิดปุ่มนี้โดยไม่ต้องลบ',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'ชื่อปุ่ม (Aria Label)',
              required: true,
              admin: {
                width: '50%',
                description: 'ใช้สำหรับ accessibility เช่น "โทรหาเรา", "LINE"',
                placeholder: 'เช่น โทรหาเรา',
              },
            },
            {
              name: 'tooltip',
              type: 'text',
              label: 'ข้อความ Tooltip',
              admin: {
                width: '50%',
                description: 'ข้อความที่แสดงเมื่อ hover เช่น "082-552-5665"',
                placeholder: 'เช่น 082-552-5665',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'link',
              type: 'text',
              label: 'URL / ลิงก์',
              required: true,
              admin: {
                width: '70%',
                description: 'เช่น tel:0825525665 หรือ https://line.me/ti/p/~btvhome',
                placeholder: 'tel:0XXXXXXXXX หรือ https://...',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'เปิดแท็บใหม่',
              defaultValue: false,
              admin: {
                width: '30%',
              },
            },
          ],
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'ไอคอน (รูปภาพ)',
          admin: {
            description: 'อัพโหลดไอคอน PNG/SVG/WebP แนะนำขนาด 64×64px ขึ้นไป',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'สีพื้นหลังปุ่ม',
              defaultValue: '#25D366',
              admin: {
                width: '50%',
                description: 'รหัสสี HEX เช่น #25D366 (เขียว LINE), #0080FF (น้ำเงิน), #FF0000 (แดง)',
                placeholder: '#25D366',
              },
            },
            {
              name: 'iconColor',
              type: 'text',
              label: 'สี Fallback Icon',
              defaultValue: '#FFFFFF',
              admin: {
                width: '50%',
                description: 'สีของไอคอน SVG fallback (ถ้าไม่มีรูปอัพโหลด)',
                placeholder: '#FFFFFF',
              },
            },
          ],
        },
      ],
    },
  ],
}
