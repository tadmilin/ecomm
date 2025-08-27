import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // ค้นหาภาษาที่รองรับทั้งหมด
    const languages = await payload.find({
      collection: 'languages',
      where: {
        isActive: { equals: true },
      },
      sort: 'sortOrder',
    })

    return NextResponse.json({
      success: true,
      languages: languages.docs,
      total: languages.totalDocs,
    })

  } catch (error) {
    console.error('Error fetching languages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch languages' },
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

    // สร้างภาษาใหม่
    const newLanguage = await payload.create({
      collection: 'languages',
      data: body,
    })

    return NextResponse.json({
      success: true,
      language: newLanguage,
    })

  } catch (error) {
    console.error('Error creating language:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create language',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
