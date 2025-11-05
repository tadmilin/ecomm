import type { Metadata } from 'next'
import React from 'react'
import { ProfilePageComponent } from './ProfilePageComponent'

export default function ProfilePage() {
  return (
    <main>
      <ProfilePageComponent />
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Profile - จัดการโปรไฟล์',
  description: 'จัดการข้อมูลส่วนตัวของคุณ',
}
