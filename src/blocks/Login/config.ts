import type { Block } from 'payload'

export const Login: Block = {
  slug: 'login',
  labels: {
    singular: 'Login Block',
    plural: 'Login Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'เข้าสู่ระบบ',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน',
    },
  ],
}
