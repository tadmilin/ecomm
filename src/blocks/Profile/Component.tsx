'use client'
import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import type { ProfileBlock as ProfileBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'

interface User {
  id: string
  name?: string
  email: string
  image?: string
  role?: string
}

type Props = {
  className?: string
} & ProfileBlockProps

export const ProfileBlock: React.FC<Props> = (props) => {
  const { className, title = 'โปรไฟล์ของฉัน' } = props
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [message, setMessage] = useState('')

  // Load user profile data
  React.useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch('/api/profile')
          const data = await response.json()

          if (data.success) {
            setUser(data.user)
            setFormData({
              name: data.user.name || '',
              email: data.user.email || '',
            })
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      }
    }

    fetchProfile()
  }, [session?.user?.id])

  if (status === 'loading') {
    return (
      <section className={cn('py-16 md:py-24', className)}>
        <div className="container">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (!session?.user) {
    return (
      <section className={cn('py-16 md:py-24', className)}>
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h2>
            <p className="text-gray-600 mb-6">คุณต้องเข้าสู่ระบบเพื่อดูโปรไฟล์</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </section>
    )
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        setMessage('อัปเดตโปรไฟล์สำเร็จ!')
        setIsEditing(false)

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.error || 'เกิดข้อผิดพลาดในการอัปเดต')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage('เกิดข้อผิดพลาดในการอัปเดต')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{title}</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                disabled={isLoading}
              >
                {isEditing ? 'ยกเลิก' : 'แก้ไข'}
              </button>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`p-4 rounded-md mb-6 ${
                  message.includes('สำเร็จ')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex items-center mb-8">
              {(user?.image || session.user?.image) && (
                <div className="relative w-20 h-20 mr-6">
                  <Image
                    src={(user?.image || session.user?.image) as string}
                    alt={user?.name || session.user?.name || 'Profile'}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{user?.name || session.user.name}</h3>
                <p className="text-gray-600">{user?.email || session.user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Role:{' '}
                  {(user as { role?: string })?.role ||
                    (session.user as { role?: string })?.role ||
                    'user'}
                </p>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">ชื่อ</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">อีเมล</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 mt-1">อีเมลไม่สามารถเปลี่ยนแปลงได้</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setMessage('')
                    }}
                    disabled={isLoading}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">ชื่อ</label>
                  <p className="text-lg">{user?.name || session.user.name || 'ไม่ได้ระบุ'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">อีเมล</label>
                  <p className="text-lg">{user?.email || session.user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">สถานะ</label>
                  <p className="text-lg capitalize">
                    {(user as { role?: string })?.role ||
                      (session.user as { role?: string })?.role ||
                      'user'}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
