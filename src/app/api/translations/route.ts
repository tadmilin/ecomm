import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')
    const namespace = searchParams.get('namespace') || 'common'

    if (!language) {
      return NextResponse.json(
        { success: false, error: 'Language parameter is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    // ค้นหาคำแปล
    const translations = await payload.find({
      collection: 'translations',
      where: {
        language: { equals: language },
        namespace: { equals: namespace },
        isActive: { equals: true },
      },
    })

    // แปลงเป็น object สำหรับใช้งาน
    const translationObject = translations.docs.reduce((acc, trans) => {
      acc[trans.key] = trans.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json({
      success: true,
      translations: translationObject,
      language,
      namespace,
    })

  } catch (error) {
    console.error('Error fetching translations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch translations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // ตรวจสอบ request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON format in request body',
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
        },
        { status: 400 }
      )
    }

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Request body must be a valid object' 
        },
        { status: 400 }
      )
    }

    // สร้างคำแปลใหม่
    const newTranslation = await payload.create({
      collection: 'translations',
      data: body,
    })

    return NextResponse.json({
      success: true,
      translation: newTranslation,
    })

  } catch (error) {
    console.error('Error creating translation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create translation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
