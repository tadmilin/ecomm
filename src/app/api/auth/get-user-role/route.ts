import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { validateInternalRequest } from '@/lib/api-security'

export async function GET(request: NextRequest) {
  try {
    // ตรวจสอบ Internal API Secret ก่อน
    if (!validateInternalRequest(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid API Secret' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // ค้นหา user ใน Payload CMS
    const user = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    if (user.docs.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: user.docs[0],
    })
  } catch (error) {
    console.error('Error fetching user role:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user role' },
      { status: 500 },
    )
  }
}
