import type { CollectionConfig } from 'payload'

export const Translations: CollectionConfig = {
  slug: 'translations',
  admin: {
    useAsTitle: 'key',
    defaultColumns: ['key', 'language', 'namespace', 'isActive', 'updatedAt'],
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
      name: 'key',
      type: 'text',
      required: true,
      label: 'คีย์คำแปล',
      admin: {
        description: 'คีย์สำหรับการแปล (เช่น: product.title, button.add_to_cart)',
      },
    },
    {
      name: 'language',
      type: 'relationship',
      relationTo: 'languages',
      required: true,
      label: 'ภาษา',
      admin: {
        description: 'ภาษาของคำแปลนี้',
      },
    },
    {
      name: 'namespace',
      type: 'select',
      required: true,
      label: 'กลุ่มคำแปล',
      options: [
        { label: 'ทั่วไป', value: 'common' },
        { label: 'สินค้า', value: 'products' },
        { label: 'การสั่งซื้อ', value: 'orders' },
        { label: 'การชำระเงิน', value: 'payments' },
        { label: 'การจัดส่ง', value: 'shipping' },
        { label: 'ผู้ใช้', value: 'users' },
        { label: 'ร้านค้า', value: 'stores' },
        { label: 'หมวดหมู่', value: 'categories' },
        { label: 'ข้อผิดพลาด', value: 'errors' },
        { label: 'การแจ้งเตือน', value: 'notifications' },
        { label: 'เมนู', value: 'menu' },
        { label: 'ฟอร์ม', value: 'forms' },
        { label: 'ปุ่ม', value: 'buttons' },
        { label: 'ข้อความ', value: 'messages' },
      ],
      defaultValue: 'common',
      admin: {
        description: 'กลุ่มหรือหมวดหมู่ของคำแปล',
      },
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      label: 'คำแปล',
      admin: {
        description: 'ข้อความที่แปลแล้ว',
      },
    },
    {
      name: 'context',
      type: 'textarea',
      label: 'บริบท',
      admin: {
        description: 'คำอธิบายบริบทการใช้คำแปลนี้ (ช่วยในการแปลที่ถูกต้อง)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'เปิดใช้งาน',
      defaultValue: true,
      admin: {
        description: 'เปิดใช้งานคำแปลนี้',
      },
    },
    {
      name: 'autoTranslated',
      type: 'checkbox',
      label: 'แปลอัตโนมัติ',
      defaultValue: false,
      admin: {
        description: 'คำแปลนี้ถูกแปลโดยระบบอัตโนมัติ (ควรตรวจสอบ)',
      },
    },
    {
      name: 'needsReview',
      type: 'checkbox',
      label: 'ต้องการตรวจสอบ',
      defaultValue: false,
      admin: {
        description: 'คำแปลนี้ต้องการการตรวจสอบจากผู้เชี่ยวชาญ',
      },
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'ตรวจสอบโดย',
      admin: {
        description: 'ผู้ใช้ที่ตรวจสอบคำแปลนี้',
        condition: (data) => data.needsReview === false,
      },
    },
    {
      name: 'reviewedAt',
      type: 'date',
      label: 'วันที่ตรวจสอบ',
      admin: {
        description: 'วันที่ตรวจสอบคำแปล',
        condition: (data) => data.needsReview === false,
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'ลำดับการแสดงผล',
      defaultValue: 0,
      admin: {
        description: 'ลำดับการแสดงผลในรายการ (ตัวเลขน้อยแสดงก่อน)',
      },
    },
  ],
  timestamps: true,
  // No indexes for now - will be added when payload-types is regenerated
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // เมื่อตรวจสอบแล้ว ให้อัปเดตข้อมูลการตรวจสอบ
        if (data.needsReview === false && operation === 'update') {
          data.reviewedBy = req.user?.id
          data.reviewedAt = new Date()
        }
        
        return data
      },
    ],
  },
}
