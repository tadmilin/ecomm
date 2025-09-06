import type { Metadata } from 'next'
import React from 'react'
import SignIn from '@/components/SignIn'

export default async function LoginPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <div className="pt-24 pb-24">
      <div className="container">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Login
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Sign in to your account
            </p>
            
            <SignIn buttonText="Sign in with Google" />
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
  
  return {
    title: 'Login',
    description: 'Sign in to your account',
    alternates: {
      canonical: `/${lang}/login`,
    },
  }
}
