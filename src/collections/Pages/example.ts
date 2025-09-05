// ตัวอย่างการใช้งาน Pages Collection กับ Multilang Fields

export const examplePageData = {
  // i18n Settings
  enableTranslations: true,
  supportedLanguages: ['th', 'en', 'ja'],
  defaultLanguage: 'th',
  
  // Multilang Content
  translations: {
    title: {
      th: 'หน้าแรก',
      en: 'Home Page',
      ja: 'ホームページ',
    },
    shortDescription: {
      th: 'ยินดีต้อนรับสู่เว็บไซต์ของเรา',
      en: 'Welcome to our website',
      ja: '私たちのウェブサイトへようこそ',
    },
    content: {
      th: '<p>เนื้อหาหลักของหน้าแรก</p>',
      en: '<p>Main content of the home page</p>',
      ja: '<p>ホームページのメインコンテンツ</p>',
    },
    heroTitle: {
      th: 'ยินดีต้อนรับ',
      en: 'Welcome',
      ja: 'ようこそ',
    },
    heroSubtitle: {
      th: 'สู่เว็บไซต์ของเรา',
      en: 'to our website',
      ja: '私たちのウェブサイトへ',
    },
    heroDescription: {
      th: 'เรามีบริการและผลิตภัณฑ์ที่ยอดเยี่ยมสำหรับคุณ',
      en: 'We have excellent services and products for you',
      ja: 'あなたのために素晴らしいサービスと製品があります',
    },
    ctaButtonText: {
      th: 'เริ่มต้นเลย',
      en: 'Get Started',
      ja: '始める',
    },
    metaTitle: {
      th: 'หน้าแรก - เว็บไซต์ของเรา',
      en: 'Home - Our Website',
      ja: 'ホーム - 私たちのウェブサイト',
    },
    metaDescription: {
      th: 'ยินดีต้อนรับสู่เว็บไซต์ของเรา เรามีบริการและผลิตภัณฑ์ที่ยอดเยี่ยม',
      en: 'Welcome to our website. We have excellent services and products.',
      ja: '私たちのウェブサイトへようこそ。素晴らしいサービスと製品があります。',
    },
    metaKeywords: {
      th: 'หน้าแรก, เว็บไซต์, บริการ, ผลิตภัณฑ์',
      en: 'home, website, services, products',
      ja: 'ホーム, ウェブサイト, サービス, 製品',
    },
    footerText: {
      th: '© 2024 เว็บไซต์ของเรา สงวนลิขสิทธิ์',
      en: '© 2024 Our Website. All rights reserved.',
      ja: '© 2024 私たちのウェブサイト。全著作権所有。',
    },
    footerCopyright: {
      th: 'สงวนลิขสิทธิ์',
      en: 'All rights reserved',
      ja: '全著作権所有',
    },
  },
  
  // Other fields
  publishedAt: new Date().toISOString(),
  slug: 'home',
}

// ตัวอย่างการใช้งานใน Admin Panel
export const adminPanelUsage = {
  description: 'วิธีการใช้งาน Pages Collection ใน Admin Panel',
  steps: [
    '1. เปิด Admin Panel และไปที่ Collections > Pages',
    '2. คลิก "Create New" เพื่อสร้างหน้าใหม่',
    '3. ตั้งค่า i18n Settings:',
    '   - เปิดใช้งานการแปลภาษา (enableTranslations)',
    '   - เลือกภาษาที่ต้องการรองรับ (supportedLanguages)',
    '   - เลือกภาษาเริ่มต้น (defaultLanguage)',
    '4. กรอกข้อมูลในแท็บ "การแปลภาษา":',
    '   - เนื้อหาหลัก: หัวข้อ, คำอธิบาย, เนื้อหา',
    '   - Hero Section: หัวข้อ, หัวข้อรอง, คำอธิบาย, ปุ่ม CTA',
    '   - SEO: Meta Title, Meta Description, Meta Keywords',
    '   - Footer: ข้อความ Footer, ข้อความลิขสิทธิ์',
    '5. บันทึกหน้า',
  ],
}

// ตัวอย่างการใช้งานใน Frontend
export const frontendUsage = {
  description: 'วิธีการใช้งาน Pages Collection ใน Frontend',
  code: `
// ตัวอย่างการดึงข้อมูลหน้า
const page = await payload.find({
  collection: 'pages',
  where: {
    slug: { equals: 'home' }
  }
})

// ตัวอย่างการแสดงเนื้อหาตามภาษา
const currentLanguage = 'th'
const title = page.docs[0].translations?.title?.[currentLanguage] || page.docs[0].title
const content = page.docs[0].translations?.content?.[currentLanguage] || ''

// ตัวอย่างการแสดงใน JSX
<h1>{title}</h1>
<div dangerouslySetInnerHTML={{ __html: content }} />
  `,
}
