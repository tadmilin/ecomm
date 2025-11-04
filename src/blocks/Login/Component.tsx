import React from 'react'

import type { LoginBlock as LoginBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { signIn } from '../../../auth'

type Props = {
  className?: string
} & LoginBlockProps

export const LoginBlock: React.FC<Props> = (props) => {
  const {
    className,
    title = 'เข้าสู่ระบบ',
    subtitle = 'กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน',
    showRememberMe = true,
    showForgotPassword = true,
    showRegisterLink = true,
    registerText = 'ยังไม่มีบัญชี? สมัครสมาชิก',
    showGoogleSignIn = true,
  } = props

  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">{title}</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    อีเมล
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="อีเมล"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    รหัสผ่าน
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="รหัสผ่าน"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {showRememberMe && (
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      จดจำการเข้าสู่ระบบ
                    </label>
                  </div>
                )}

                {showForgotPassword && (
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      ลืมรหัสผ่าน?
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  เข้าสู่ระบบ
                </button>

                {showGoogleSignIn && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">หรือ</span>
                      </div>
                    </div>

                    <form
                      action={async () => {
                        'use server'
                        await signIn('google')
                      }}
                    >
                      <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        เข้าสู่ระบบด้วย Google
                      </button>
                    </form>
                  </>
                )}
              </div>

              {showRegisterLink && (
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">{registerText}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
