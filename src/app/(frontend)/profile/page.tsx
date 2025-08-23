'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'TH'
    },
    preferences: {
      newsletter: false,
      language: 'th'
    }
  })

  useEffect(() => {
    if (session?.user?.email) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile?email=${session?.user?.email}`)
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setFormData({
          fullName: data.user?.fullName || '',
          phone: data.user?.phone || '',
          address: {
            street: data.user?.address?.street || '',
            city: data.user?.address?.city || '',
            postalCode: data.user?.address?.postalCode || '',
            country: data.user?.address?.country || 'TH'
          },
          preferences: {
            newsletter: data.user?.preferences?.newsletter || false,
            language: data.user?.preferences?.language || 'th'
          }
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          ...formData
        }),
      })

      if (response.ok) {
        alert('บันทึกข้อมูลสำเร็จ!')
        fetchProfile()
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>กำลังโหลด...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>กรุณาล็อกอิน</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          โปรไฟล์ของฉัน
        </h1>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลจาก Google</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">ชื่อ (จาก Google)</label>
              <div className="mt-1 text-gray-900">{session.user?.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">อีเมล</label>
              <div className="mt-1 text-gray-900">{session.user?.email}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">ข้อมูลเพิ่มเติม</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ชื่อ-นามสกุล */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อ-นามสกุล *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* เบอร์โทร */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ที่อยู่ */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ที่อยู่
              </label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => setFormData({
                  ...formData, 
                  address: {...formData.address, street: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เมือง/จังหวัด
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => setFormData({
                  ...formData, 
                  address: {...formData.address, city: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสไปรษณีย์
              </label>
              <input
                type="text"
                value={formData.address.postalCode}
                onChange={(e) => setFormData({
                  ...formData, 
                  address: {...formData.address, postalCode: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* การตั้งค่า */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.preferences.newsletter}
                  onChange={(e) => setFormData({
                    ...formData, 
                    preferences: {...formData.preferences, newsletter: e.target.checked}
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                  รับข่าวสารและโปรโมชั่น
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
