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
      localized: true,
      defaultValue: 'เข้าสู่ระบบ',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      localized: true,
      defaultValue: 'กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน',
    },
    // Hidden fields for backward compatibility
    {
      name: 'showRememberMe',
      type: 'checkbox',
      label: 'Show Remember Me',
      defaultValue: false,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'showForgotPassword',
      type: 'checkbox',
      label: 'Show Forgot Password',
      defaultValue: false,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'showRegisterLink',
      type: 'checkbox',
      label: 'Show Register Link',
      defaultValue: false,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'registerText',
      type: 'text',
      label: 'Register Link Text',
      defaultValue: '',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'showGoogleSignIn',
      type: 'checkbox',
      label: 'Show Google Sign In',
      defaultValue: true,
      admin: {
        hidden: true,
      },
    },
  ],
}
