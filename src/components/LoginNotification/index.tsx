'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

const LoginNotificationContent: React.FC = () => {
  const { data: session, status } = useSession()
  const [showNotification, setShowNotification] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // ตรวจสอบว่ามีการ redirect จากการ login หรือไม่
    const loginSuccess = searchParams.get('login')

    if (session?.user && loginSuccess === 'success') {
      setShowNotification(true)

      // ลบ query parameters ออกจาก URL
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete('login')
      router.replace(currentUrl.pathname + currentUrl.search)

      // ซ่อนการแจ้งเตือนหลังจาก 5 วินาที
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [session, searchParams, router])

  if (!showNotification || status !== 'authenticated' || !session?.user) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">เข้าสู่ระบบสำเร็จ!</p>
            <p className="text-sm">ยินดีต้อนรับ, {session.user.name || session.user.email}</p>
          </div>
          <div className="ml-auto pl-3">
            <button
              onClick={() => setShowNotification(false)}
              className="inline-flex text-green-400 hover:text-green-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LoginNotification: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <LoginNotificationContent />
    </Suspense>
  )
}
