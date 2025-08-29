import type { Metadata } from 'next'

import React from 'react'
import { getDictionary } from '@/lib/getDictionary'


export const dynamic = 'force-dynamic'

export default async function ProfilePage({
params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  // TODO: Implement proper authentication
  // const session = await getServerSession(authOptions)
  // if (!session?.user) {
  //   redirect(`/${lang}/login`)
  // }

  // Mock user data for now
  const user = {
    email: 'user@example.com',
    role: 'user'
  }

  return (
    <div className="pt-24 pb-24">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{dict.profile.title}</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{dict.profile.personal_info}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {user.email}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return {
    title: dict.profile.meta.title,
    description: dict.profile.meta.description,
    alternates: {
      languages: {
        'en': '/en/profile',
        'th': '/th/profile',
        'ja': '/ja/profile',
      },
    },
  }
}
