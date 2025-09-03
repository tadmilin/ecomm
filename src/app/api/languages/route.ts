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
    
    // Log request details
    console.log('=== Language Creation Request ===')
    console.log('Headers:', Object.fromEntries(request.headers.entries()))
    console.log('Method:', request.method)
    console.log('URL:', request.url)
    
    // ตรวจสอบ Content-Type
    const contentType = request.headers.get('content-type') || ''
    console.log('Content-Type:', contentType)
    
    let body
    
    if (contentType.includes('multipart/form-data')) {
      // Handle multipart/form-data
      console.log('Processing multipart/form-data')
      
      try {
        const formData = await request.formData()
        const payloadData = formData.get('_payload')
        
        if (payloadData && typeof payloadData === 'string') {
          body = JSON.parse(payloadData)
          console.log('Parsed form data:', body)
        } else {
          throw new Error('No _payload field found in form data')
        }
        
      } catch (formError) {
        console.error('Form data parsing error:', formError)
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid form data format',
            details: formError instanceof Error ? formError.message : 'Unknown form parsing error'
          },
          { status: 400 }
        )
      }
      
    } else {
      // Handle JSON data
      console.log('Processing JSON data')
      
      try {
        const rawBody = await request.text()
        console.log('Raw body:', rawBody)
        console.log('Raw body length:', rawBody.length)
        
        if (rawBody.trim()) {
          body = JSON.parse(rawBody)
        } else {
          body = {}
        }
        
        console.log('Parsed JSON body:', body)
        
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
    }

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!body || typeof body !== 'object') {
      console.error('Invalid body type:', typeof body, body)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Request body must be a valid object',
          receivedType: typeof body,
          receivedValue: body
        },
        { status: 400 }
      )
    }

    // ตรวจสอบ required fields
    const requiredFields = ['code', 'name', 'nativeName']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          missingFields,
          receivedData: body
        },
        { status: 400 }
      )
    }

    console.log('Creating language with data:', body)

    // สร้างภาษาใหม่
    const newLanguage = await payload.create({
      collection: 'languages',
      data: body,
    })

    console.log('Language created successfully:', newLanguage)

    return NextResponse.json({
      success: true,
      language: newLanguage,
    })

  } catch (error) {
    console.error('Error creating language:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create language',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorType: error?.constructor?.name
      },
      { status: 500 }
    )
  }
}
