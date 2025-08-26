import type { Payload } from 'payload'

// Language constants for consistency
const LANGUAGE_CONFIG = {
  THAI: {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'THB',
    sortOrder: 1,
  },
  ENGLISH: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    sortOrder: 2,
  },
  JAPANESE: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: '24h',
    currency: 'JPY',
    sortOrder: 3,
  },
} as const

export const seedLanguages = async (payload: Payload) => {
  console.log('🌍 Seeding languages...')

  try {
    // ตรวจสอบว่ามีภาษาอยู่แล้วหรือไม่
    const existingLanguages = await payload.find({
      collection: 'languages' as any,
      limit: 1,
    })

    if (existingLanguages.totalDocs > 0) {
      console.log('✅ Languages already exist, skipping...')
      return
    }

    // สร้างภาษาไทย
    const thaiLanguage = await payload.create({
      collection: 'languages' as any,
      data: {
        ...LANGUAGE_CONFIG.THAI,
        isActive: true,
        isDefault: true,
      },
    })

    // สร้างภาษาอังกฤษ
    const englishLanguage = await payload.create({
      collection: 'languages' as any,
      data: {
        ...LANGUAGE_CONFIG.ENGLISH,
        isActive: true,
        isDefault: false,
      },
    })

    // สร้างภาษาญี่ปุ่น
    const japaneseLanguage = await payload.create({
      collection: 'languages' as any,
      data: {
        ...LANGUAGE_CONFIG.JAPANESE,
        isActive: true,
        isDefault: false,
      },
    })

    console.log('✅ Languages seeded successfully:')
    console.log(`   - ไทย (${thaiLanguage.id})`)
    console.log(`   - English (${englishLanguage.id})`)
    console.log(`   - 日本語 (${japaneseLanguage.id})`)

    return {
      thai: thaiLanguage,
      english: englishLanguage,
      japanese: japaneseLanguage,
    }

  } catch (error) {
    console.error('❌ Error seeding languages:', error)
    throw error
  }
}
