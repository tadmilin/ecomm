// ตัวอย่างการใช้งาน Footer Global กับ Multilang Fields

export const exampleFooterData = {
  // i18n Settings
  enableTranslations: true,
  supportedLanguages: ['th', 'en', 'ja'],
  defaultLanguage: 'th',
  
  // Multilang Content
  translations: {
    companyName: {
      th: 'บริษัทตัวอย่าง จำกัด',
      en: 'Example Company Ltd.',
      ja: 'サンプル会社株式会社',
    },
    companyDescription: {
      th: 'บริษัทที่ให้บริการและผลิตภัณฑ์ที่ยอดเยี่ยมสำหรับลูกค้า',
      en: 'Company providing excellent services and products for customers',
      ja: 'お客様に素晴らしいサービスと製品を提供する会社',
    },
    address: {
      th: '123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110',
      en: '123 Sukhumvit Road, Khlong Toei, Watthana, Bangkok 10110',
      ja: 'バンコク ワッタナ区 クロントイ スクムビット通り123番地 10110',
    },
    phone: {
      th: '+66 2 123 4567',
      en: '+66 2 123 4567',
      ja: '+66 2 123 4567',
    },
    email: {
      th: 'info@example.com',
      en: 'info@example.com',
      ja: 'info@example.com',
    },
    website: {
      th: 'https://example.com',
      en: 'https://example.com',
      ja: 'https://example.com',
    },
    businessHours: {
      th: 'จันทร์ - ศุกร์ 9:00 - 18:00 น.',
      en: 'Monday - Friday 9:00 AM - 6:00 PM',
      ja: '月曜日 - 金曜日 9:00 - 18:00',
    },
    facebookUrl: {
      th: 'https://facebook.com/example',
      en: 'https://facebook.com/example',
      ja: 'https://facebook.com/example',
    },
    twitterUrl: {
      th: 'https://twitter.com/example',
      en: 'https://twitter.com/example',
      ja: 'https://twitter.com/example',
    },
    instagramUrl: {
      th: 'https://instagram.com/example',
      en: 'https://instagram.com/example',
      ja: 'https://instagram.com/example',
    },
    linkedinUrl: {
      th: 'https://linkedin.com/company/example',
      en: 'https://linkedin.com/company/example',
      ja: 'https://linkedin.com/company/example',
    },
    youtubeUrl: {
      th: 'https://youtube.com/example',
      en: 'https://youtube.com/example',
      ja: 'https://youtube.com/example',
    },
    newsletterTitle: {
      th: 'สมัครรับจดหมายข่าว',
      en: 'Subscribe to Newsletter',
      ja: 'ニュースレターに登録',
    },
    newsletterDescription: {
      th: 'รับข่าวสารและโปรโมชั่นล่าสุดจากเรา',
      en: 'Get the latest news and promotions from us',
      ja: '最新のニュースとプロモーションを受け取る',
    },
    newsletterButtonText: {
      th: 'สมัครเลย',
      en: 'Subscribe',
      ja: '登録する',
    },
    newsletterPlaceholder: {
      th: 'กรอกอีเมลของคุณ',
      en: 'Enter your email',
      ja: 'メールアドレスを入力',
    },
    copyrightText: {
      th: '© 2024 บริษัทตัวอย่าง จำกัด สงวนลิขสิทธิ์',
      en: '© 2024 Example Company Ltd. All rights reserved.',
      ja: '© 2024 サンプル会社株式会社。全著作権所有。',
    },
    privacyPolicyText: {
      th: 'นโยบายความเป็นส่วนตัว',
      en: 'Privacy Policy',
      ja: 'プライバシーポリシー',
    },
    termsOfServiceText: {
      th: 'เงื่อนไขการใช้งาน',
      en: 'Terms of Service',
      ja: '利用規約',
    },
    cookiesPolicyText: {
      th: 'นโยบายคุกกี้',
      en: 'Cookie Policy',
      ja: 'クッキーポリシー',
    },
    taxId: {
      th: '0123456789012',
      en: '0123456789012',
      ja: '0123456789012',
    },
    registrationNumber: {
      th: '0105560001234',
      en: '0105560001234',
      ja: '0105560001234',
    },
  },
  
  // Multilang Navigation Items
  multilangNavItems: [
    {
      type: 'custom',
      url: '/th/about',
      newTab: false,
      label: {
        th: 'เกี่ยวกับเรา',
        en: 'About Us',
        ja: '私たちについて',
      },
    },
    {
      type: 'custom',
      url: '/th/contact',
      newTab: false,
      label: {
        th: 'ติดต่อเรา',
        en: 'Contact Us',
        ja: 'お問い合わせ',
      },
    },
    {
      type: 'custom',
      url: '/th/privacy',
      newTab: false,
      label: {
        th: 'นโยบายความเป็นส่วนตัว',
        en: 'Privacy Policy',
        ja: 'プライバシーポリシー',
      },
    },
    {
      type: 'custom',
      url: '/th/terms',
      newTab: false,
      label: {
        th: 'เงื่อนไขการใช้งาน',
        en: 'Terms of Service',
        ja: '利用規約',
      },
    },
  ],
}

// ตัวอย่างการใช้งานใน Admin Panel
export const adminPanelUsage = {
  description: 'วิธีการใช้งาน Footer Global ใน Admin Panel',
  steps: [
    '1. เปิด Admin Panel และไปที่ Globals > Footer',
    '2. ตั้งค่า i18n Settings:',
    '   - เปิดใช้งานการแปลภาษา (enableTranslations)',
    '   - เลือกภาษาที่ต้องการรองรับ (supportedLanguages)',
    '   - เลือกภาษาเริ่มต้น (defaultLanguage)',
    '3. กรอกข้อมูลในแท็บ "การแปลภาษา":',
    '   - ข้อมูลบริษัท: ชื่อบริษัท, คำอธิบายบริษัท',
    '   - ข้อมูลติดต่อ: ที่อยู่, เบอร์โทรศัพท์, อีเมล, เว็บไซต์, เวลาทำการ',
    '   - โซเชียลมีเดีย: Facebook, Twitter, Instagram, LinkedIn, YouTube',
    '   - จดหมายข่าว: หัวข้อ, คำอธิบาย, ปุ่มสมัคร, ช่องอีเมล',
    '   - ข้อมูลทางกฎหมาย: ลิขสิทธิ์, นโยบายความเป็นส่วนตัว, เงื่อนไขการใช้งาน, นโยบายคุกกี้',
    '   - ข้อมูลเพิ่มเติม: เลขประจำตัวผู้เสียภาษี, เลขทะเบียนบริษัท',
    '4. ตั้งค่ารายการเมนูหลายภาษา:',
    '   - เลือกประเภทลิงก์ (กำหนดเอง หรือ อ้างอิง)',
    '   - กรอก URL หรือเลือกอ้างอิง',
    '   - ตั้งค่าการเปิดในแท็บใหม่',
    '   - กรอกข้อความลิงก์สำหรับแต่ละภาษา',
    '5. บันทึกการตั้งค่า',
  ],
}

// ตัวอย่างการใช้งานใน Frontend
export const frontendUsage = {
  description: 'วิธีการใช้งาน Footer Global ใน Frontend',
  code: `
// ตัวอย่างการดึงข้อมูล Footer
const footer = await payload.findGlobal({
  slug: 'footer'
})

// ตัวอย่างการแสดงเนื้อหาตามภาษา
const currentLanguage = 'th'
const companyName = footer.translations?.companyName?.[currentLanguage] || 'Company'
const address = footer.translations?.address?.[currentLanguage] || ''
const phone = footer.translations?.phone?.[currentLanguage] || ''
const email = footer.translations?.email?.[currentLanguage] || ''
const copyrightText = footer.translations?.copyrightText?.[currentLanguage] || ''

// ตัวอย่างการแสดง Social Media Links
const socialLinks = [
  { name: 'Facebook', url: footer.translations?.facebookUrl?.[currentLanguage] },
  { name: 'Twitter', url: footer.translations?.twitterUrl?.[currentLanguage] },
  { name: 'Instagram', url: footer.translations?.instagramUrl?.[currentLanguage] },
  { name: 'LinkedIn', url: footer.translations?.linkedinUrl?.[currentLanguage] },
  { name: 'YouTube', url: footer.translations?.youtubeUrl?.[currentLanguage] },
].filter(link => link.url)

// ตัวอย่างการแสดง Navigation Items
const navItems = footer.multilangNavItems || []
navItems.forEach(item => {
  const label = item.label?.[currentLanguage] || item.label?.th || 'Link'
  const url = item.type === 'custom' ? item.url : \`/\${currentLanguage}/\${item.reference?.slug}\`
  
  console.log(\`\${label}: \${url}\`)
})

// ตัวอย่างการแสดงใน JSX
<footer>
  <div className="company-info">
    <h3>{companyName}</h3>
    <p>{address}</p>
    <p>Tel: {phone}</p>
    <p>Email: {email}</p>
  </div>
  
  <div className="social-links">
    {socialLinks.map((link, index) => (
      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
        {link.name}
      </a>
    ))}
  </div>
  
  <nav>
    {navItems.map((item, index) => {
      const label = item.label?.[currentLanguage] || item.label?.th || 'Link'
      const url = item.type === 'custom' ? item.url : \`/\${currentLanguage}/\${item.reference?.slug}\`
      
      return (
        <a key={index} href={url} target={item.newTab ? '_blank' : '_self'}>
          {label}
        </a>
      )
    })}
  </nav>
  
  <div className="copyright">
    <p>{copyrightText}</p>
  </div>
</footer>
  `,
}
