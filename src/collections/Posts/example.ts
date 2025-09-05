// ตัวอย่างการใช้งาน Posts Collection กับ Multilang Fields

export const examplePostData = {
  // i18n Settings
  enableTranslations: true,
  supportedLanguages: ['th', 'en', 'ja'],
  defaultLanguage: 'th',
  
  // Multilang Content
  translations: {
    title: {
      th: 'บทความใหม่',
      en: 'New Article',
      ja: '新しい記事',
    },
    excerpt: {
      th: 'นี่คือบทความใหม่ที่น่าสนใจ',
      en: 'This is an interesting new article',
      ja: 'これは興味深い新しい記事です',
    },
    content: {
      th: '<p>เนื้อหาของบทความใหม่</p>',
      en: '<p>Content of the new article</p>',
      ja: '<p>新しい記事の内容</p>',
    },
    heroTitle: {
      th: 'ยินดีต้อนรับสู่บทความใหม่',
      en: 'Welcome to the new article',
      ja: '新しい記事へようこそ',
    },
    heroSubtitle: {
      th: 'เรียนรู้สิ่งใหม่ๆ',
      en: 'Learn something new',
      ja: '新しいことを学ぶ',
    },
    heroDescription: {
      th: 'บทความนี้จะช่วยให้คุณเรียนรู้สิ่งใหม่ๆ',
      en: 'This article will help you learn something new',
      ja: 'この記事は新しいことを学ぶのに役立ちます',
    },
    metaTitle: {
      th: 'บทความใหม่ - เว็บไซต์ของเรา',
      en: 'New Article - Our Website',
      ja: '新しい記事 - 私たちのウェブサイト',
    },
    metaDescription: {
      th: 'บทความใหม่ที่น่าสนใจและมีประโยชน์',
      en: 'Interesting and useful new article',
      ja: '興味深くて有用な新しい記事',
    },
    metaKeywords: {
      th: 'บทความ, ใหม่, น่าสนใจ, มีประโยชน์',
      en: 'article, new, interesting, useful',
      ja: '記事, 新しい, 興味深い, 有用',
    },
    readingTime: {
      th: '5 นาที',
      en: '5 minutes',
      ja: '5分',
    },
    tags: {
      th: 'บทความ, ใหม่, เทคโนโลยี',
      en: 'article, new, technology',
      ja: '記事, 新しい, 技術',
    },
  },
  
  // Other fields
  publishedAt: new Date().toISOString(),
  slug: 'new-article',
  heroImage: null, // Will be set when uploading
  categories: [], // Will be set when selecting categories
  authors: [], // Will be set when selecting authors
  relatedPosts: [], // Will be set when selecting related posts
}

// ตัวอย่างการใช้งานใน Admin Panel
export const adminPanelUsage = {
  description: 'วิธีการใช้งาน Posts Collection ใน Admin Panel',
  steps: [
    '1. เปิด Admin Panel และไปที่ Collections > Posts',
    '2. คลิก "Create New" เพื่อสร้างบทความใหม่',
    '3. ตั้งค่า i18n Settings:',
    '   - เปิดใช้งานการแปลภาษา (enableTranslations)',
    '   - เลือกภาษาที่ต้องการรองรับ (supportedLanguages)',
    '   - เลือกภาษาเริ่มต้น (defaultLanguage)',
    '4. กรอกข้อมูลในแท็บ "การแปลภาษา":',
    '   - เนื้อหาหลัก: หัวข้อ, สรุปย่อ, เนื้อหา',
    '   - Hero Section: หัวข้อ, หัวข้อรอง, คำอธิบาย',
    '   - SEO: Meta Title, Meta Description, Meta Keywords',
    '   - ข้อมูลเพิ่มเติม: เวลาอ่าน, แท็ก',
    '5. ตั้งค่าข้อมูลอื่นๆ:',
    '   - อัปโหลดรูปภาพ Hero',
    '   - เลือกหมวดหมู่',
    '   - เลือกผู้เขียน',
    '   - เลือกบทความที่เกี่ยวข้อง',
    '6. บันทึกบทความ',
  ],
}

// ตัวอย่างการใช้งานใน Frontend
export const frontendUsage = {
  description: 'วิธีการใช้งาน Posts Collection ใน Frontend',
  code: `
// ตัวอย่างการดึงข้อมูลบทความ
const post = await payload.find({
  collection: 'posts',
  where: {
    slug: { equals: 'new-article' }
  }
})

// ตัวอย่างการแสดงเนื้อหาตามภาษา
const currentLanguage = 'th'
const title = post.docs[0].translations?.title?.[currentLanguage] || post.docs[0].title
const content = post.docs[0].translations?.content?.[currentLanguage] || ''
const excerpt = post.docs[0].translations?.excerpt?.[currentLanguage] || ''

// ตัวอย่างการแสดงใน JSX
<article>
  <h1>{title}</h1>
  <p className="excerpt">{excerpt}</p>
  <div dangerouslySetInnerHTML={{ __html: content }} />
</article>
  `,
}
