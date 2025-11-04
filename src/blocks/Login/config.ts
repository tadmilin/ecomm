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
    {
      name: 'showRememberMe',
      type: 'checkbox',
      label: 'Show Remember Me',
      defaultValue: true,
    },
    {
      name: 'showForgotPassword',
      type: 'checkbox',
      label: 'Show Forgot Password',
      defaultValue: true,
    },
    {
      name: 'showRegisterLink',
      type: 'checkbox',
      label: 'Show Register Link',
      defaultValue: true,
    },
    {
      name: 'registerText',
      type: 'text',
      label: 'Register Link Text',
      defaultValue: 'ยังไม่มีบัญชี? สมัครสมาชิก',
    },
    {
      name: 'showGoogleSignIn',
      type: 'checkbox',
      label: 'Show Google Sign In',
      defaultValue: true,
    },
  ],
}
