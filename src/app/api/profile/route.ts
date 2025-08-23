import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }
    
    const payload = await getPayload({ config: configPromise })
    
    // ค้นหา user ใน Users collection (รวม profile data)
    const user = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1
    })

    if (user.docs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user data ที่มี profile fields
    return NextResponse.json({ 
      success: true, 
      user: user.docs[0]
    })

  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { email, ...profileData } = await request.json()
    
    const payload = await getPayload({ config: configPromise })
    
    // ค้นหา user
    const user = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1
    })

    if (user.docs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // อัปเดต user พร้อม profile data
    const updatedUser = await payload.update({
      collection: 'users',
      id: user.docs[0].id,
      data: profileData as any
    })

    return NextResponse.json({ 
      success: true, 
      user: updatedUser
    })

  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
