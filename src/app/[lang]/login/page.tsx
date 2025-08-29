import type { Metadata } from 'next'
import React from 'react'
import { getDictionary } from '@/lib/getDictionary'
import SignIn from '@/components/SignIn'

export default async function LoginPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className="pt-24 pb-24">
      <div className="container">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            {dict.auth.login.title}
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {dict.auth.login.description}
            </p>
            
            <SignIn buttonText={dict.auth.signin_with_google} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return {
    title: dict.auth.login.title,
    description: dict.auth.login.description,
    alternates: {
      languages: {
        'en': '/en/login',
        'th': '/th/login',
        'ja': '/ja/login',
      },
    },
  }
}
