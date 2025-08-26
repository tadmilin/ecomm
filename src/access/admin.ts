import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isAdmin = (args: AccessArgs<User>) => boolean

export const admin: isAdmin = ({ req: { user } }) => {
  // ตรวจสอบว่าผู้ใช้มี role เป็น admin หรือไม่
  return (user as User)?.role === 'admin'
}
