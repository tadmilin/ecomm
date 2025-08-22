import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const { email, name, image } = await request.json()
    
    const payload = await getPayload({ config: configPromise })
    
    // ตรวจสอบว่ามี user อยู่แล้วหรือไม่
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email
        }
      }
    })

    if (existingUser.docs.length > 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'User already exists',
        user: existingUser.docs[0]
      })
    }

    // สร้าง user ใหม่ใน Payload CMS
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email,
        name,
        role: 'user', // default role สำหรับ user ใหม่
      } as any
    })

    return NextResponse.json({ 
      success: true, 
      message: 'User created successfully',
      user: newUser
    })

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
