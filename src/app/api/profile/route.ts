import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { auth } from '../../../../auth'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config: configPromise })

    const user = await payload.findByID({
      collection: 'users',
      id: session.user.id,
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    // Return user data without password
    const { password: _password, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const payload = await getPayload({ config: configPromise })

    // Validate required fields
    if (!data.name || data.name.trim() === '') {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 })
    }

    if (!data.email || data.email.trim() === '') {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    // Update user
    const updatedUser = await payload.update({
      collection: 'users',
      id: session.user.id,
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
      },
    })

    // Return updated user data without password
    const { password: _password, ...userWithoutPassword } = updatedUser
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Profile updated successfully',
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 })
  }
}
