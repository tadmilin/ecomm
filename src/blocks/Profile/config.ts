import type { Block } from 'payload'

export const Profile: Block = {
  slug: 'profile',
  labels: {
    singular: 'Profile Block',
    plural: 'Profile Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'โปรไฟล์ของฉัน',
    },
    {
      name: 'allowEdit',
      type: 'checkbox',
      label: 'Allow Profile Editing',
      defaultValue: true,
      admin: {
        description: 'Allow users to edit their profile information',
      },
    },
    {
      name: 'showRole',
      type: 'checkbox',
      label: 'Show User Role',
      defaultValue: true,
      admin: {
        description: 'Display user role in profile',
      },
    },
  ],
}
