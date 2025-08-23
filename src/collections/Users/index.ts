import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'fullName', 'phone', 'role'],
    useAsTitle: 'fullName',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      admin: {
        description: 'Admin สามารถจัดการได้ทุกอย่าง, User ใช้งานได้แค่หน้าบ้าน',
      },
    },
    // Profile fields
    {
      name: 'fullName',
      type: 'text',
      label: 'ชื่อ-นามสกุล',
      admin: {
        description: 'ชื่อเต็มของผู้ใช้',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'เบอร์โทรศัพท์',
    },
    {
      name: 'address',
      type: 'group',
      label: 'ที่อยู่',
      fields: [
        {
          name: 'street',
          type: 'text',
          label: 'ที่อยู่'
        },
        {
          name: 'city',
          type: 'text',
          label: 'เมือง/จังหวัด'
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'รหัสไปรษณีย์'
        },
        {
          name: 'country',
          type: 'select',
          label: 'ประเทศ',
          options: [
            { label: 'ประเทศไทย', value: 'TH' },
            { label: 'สหรัฐอเมริกา', value: 'US' },
          ],
          defaultValue: 'TH'
        }
      ]
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'รูปโปรไฟล์'
    },
    {
      name: 'preferences',
      type: 'group',
      label: 'การตั้งค่า',
      fields: [
        {
          name: 'newsletter',
          type: 'checkbox',
          label: 'รับข่าวสารและโปรโมชั่น',
          defaultValue: false
        },
        {
          name: 'language',
          type: 'select',
          label: 'ภาษา',
          options: [
            { label: 'ไทย', value: 'th' },
            { label: 'English', value: 'en' }
          ],
          defaultValue: 'th'
        }
      ]
    }
  ],
  timestamps: true,
}
