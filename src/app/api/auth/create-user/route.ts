import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface CreateUserRequest {
  email: string
  name: string
  image?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json()
    const { email, name, image: _image } = body

    // Basic validation
    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Email and name are required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    // ตรวจสอบว่ามี user อยู่แล้วหรือไม่
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingUser.docs.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'User already exists',
        user: existingUser.docs[0],
      })
    }

    // สร้าง user ใหม่ใน Payload CMS
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email,
        name,
        role: 'user' as const, // default role สำหรับ user ใหม่
        password: Math.random().toString(36).substring(2, 15), // random password สำหรับ OAuth users
      },
    })

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    })
  } catch (error) {
    console.error('Error creating user:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create user',
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
