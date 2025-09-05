// ตัวอย่างการใช้งาน Categories Collection กับ Multilang Fields

export const exampleCategoryData = {
  // i18n Settings
  enableTranslations: true,
  supportedLanguages: ['th', 'en', 'ja'],
  defaultLanguage: 'th',
  
  // Multilang Content
  translations: {
    title: {
      th: 'เทคโนโลยี',
      en: 'Technology',
      ja: 'テクノロジー',
    },
    shortName: {
      th: 'เทค',
      en: 'Tech',
      ja: 'テック',
    },
    description: {
      th: 'หมวดหมู่เกี่ยวกับเทคโนโลยีและนวัตกรรมใหม่ๆ',
      en: 'Category about technology and new innovations',
      ja: 'テクノロジーと新しいイノベーションに関するカテゴリー',
    },
    metaTitle: {
      th: 'เทคโนโลยี - เว็บไซต์ของเรา',
      en: 'Technology - Our Website',
      ja: 'テクノロジー - 私たちのウェブサイト',
    },
    metaDescription: {
      th: 'เรียนรู้เกี่ยวกับเทคโนโลยีและนวัตกรรมใหม่ๆ',
      en: 'Learn about technology and new innovations',
      ja: 'テクノロジーと新しいイノベーションについて学ぶ',
    },
    metaKeywords: {
      th: 'เทคโนโลยี, นวัตกรรม, ใหม่, เรียนรู้',
      en: 'technology, innovation, new, learn',
      ja: 'テクノロジー, イノベーション, 新しい, 学ぶ',
    },
    icon: {
      th: 'cpu',
      en: 'cpu',
      ja: 'cpu',
    },
  },
  
  // Other fields
  slug: 'technology',
}

// ตัวอย่างการใช้งานใน Admin Panel
export const adminPanelUsage = {
  description: 'วิธีการใช้งาน Categories Collection ใน Admin Panel',
  steps: [
    '1. เปิด Admin Panel และไปที่ Collections > Categories',
    '2. คลิก "Create New" เพื่อสร้างหมวดหมู่ใหม่',
    '3. ตั้งค่า i18n Settings:',
    '   - เปิดใช้งานการแปลภาษา (enableTranslations)',
    '   - เลือกภาษาที่ต้องการรองรับ (supportedLanguages)',
    '   - เลือกภาษาเริ่มต้น (defaultLanguage)',
    '4. กรอกข้อมูลในแท็บ "การแปลภาษา":',
    '   - ข้อมูลหลัก: ชื่อหมวดหมู่, ชื่อย่อ, คำอธิบาย',
    '   - SEO: Meta Title, Meta Description, Meta Keywords',
    '   - การแสดงผล: ไอคอน',
    '5. บันทึกหมวดหมู่',
  ],
}

// ตัวอย่างการใช้งานใน Frontend
export const frontendUsage = {
  description: 'วิธีการใช้งาน Categories Collection ใน Frontend',
  code: `
// ตัวอย่างการดึงข้อมูลหมวดหมู่
const categories = await payload.find({
  collection: 'categories',
  where: {
    enableTranslations: { equals: true }
  }
})

// ตัวอย่างการแสดงหมวดหมู่ตามภาษา
const currentLanguage = 'th'
categories.docs.forEach(category => {
  const title = category.translations?.title?.[currentLanguage] || category.title
  const description = category.translations?.description?.[currentLanguage] || ''
  const icon = category.translations?.icon?.[currentLanguage] || 'folder'
  
  console.log(\`\${title}: \${description}\`)
})

// ตัวอย่างการแสดงใน JSX
{categories.docs.map(category => {
  const title = category.translations?.title?.[currentLanguage] || category.title
  const description = category.translations?.description?.[currentLanguage] || ''
  const icon = category.translations?.icon?.[currentLanguage] || 'folder'
  
  return (
    <div key={category.id} className="category-card">
      <Icon name={icon} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
})}
  `,
}
