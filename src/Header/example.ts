// ตัวอย่างการใช้งาน Header Global กับ Multilang Fields

export const exampleHeaderData = {
  // i18n Settings
  enableTranslations: true,
  supportedLanguages: ['th', 'en', 'ja'],
  defaultLanguage: 'th',
  
  // Multilang Content
  translations: {
    logoAltText: {
      th: 'โลโก้เว็บไซต์ของเรา',
      en: 'Our website logo',
      ja: '私たちのウェブサイトのロゴ',
    },
    siteTitle: {
      th: 'เว็บไซต์ของเรา',
      en: 'Our Website',
      ja: '私たちのウェブサイト',
    },
    siteDescription: {
      th: 'เว็บไซต์ที่ให้บริการและผลิตภัณฑ์ที่ยอดเยี่ยม',
      en: 'Website providing excellent services and products',
      ja: '素晴らしいサービスと製品を提供するウェブサイト',
    },
    searchPlaceholder: {
      th: 'ค้นหา...',
      en: 'Search...',
      ja: '検索...',
    },
    ctaButtonText: {
      th: 'เริ่มต้นเลย',
      en: 'Get Started',
      ja: '始める',
    },
    ctaButtonUrl: {
      th: '/th/contact',
      en: '/en/contact',
      ja: '/ja/contact',
    },
    loginButtonText: {
      th: 'เข้าสู่ระบบ',
      en: 'Login',
      ja: 'ログイン',
    },
    registerButtonText: {
      th: 'สมัครสมาชิก',
      en: 'Register',
      ja: '登録',
    },
    profileButtonText: {
      th: 'โปรไฟล์',
      en: 'Profile',
      ja: 'プロフィール',
    },
    logoutButtonText: {
      th: 'ออกจากระบบ',
      en: 'Logout',
      ja: 'ログアウト',
    },
    mobileMenuToggleText: {
      th: 'เมนู',
      en: 'Menu',
      ja: 'メニュー',
    },
    closeMenuText: {
      th: 'ปิด',
      en: 'Close',
      ja: '閉じる',
    },
  },
  
  // Multilang Navigation Items
  multilangNavItems: [
    {
      type: 'custom',
      url: '/th/posts',
      newTab: false,
      label: {
        th: 'บทความ',
        en: 'Posts',
        ja: '記事',
      },
    },
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
  ],
}

// ตัวอย่างการใช้งานใน Admin Panel
export const adminPanelUsage = {
  description: 'วิธีการใช้งาน Header Global ใน Admin Panel',
  steps: [
    '1. เปิด Admin Panel และไปที่ Globals > Header',
    '2. ตั้งค่า i18n Settings:',
    '   - เปิดใช้งานการแปลภาษา (enableTranslations)',
    '   - เลือกภาษาที่ต้องการรองรับ (supportedLanguages)',
    '   - เลือกภาษาเริ่มต้น (defaultLanguage)',
    '3. กรอกข้อมูลในแท็บ "การแปลภาษา":',
    '   - ข้อมูลหลัก: ข้อความ Alt ของโลโก้, ชื่อเว็บไซต์, คำอธิบายเว็บไซต์',
    '   - การค้นหา: ข้อความในช่องค้นหา',
    '   - ปุ่มต่างๆ: ข้อความปุ่ม CTA, เข้าสู่ระบบ, สมัครสมาชิก, โปรไฟล์, ออกจากระบบ',
    '   - เมนูมือถือ: ข้อความปุ่มเปิดเมนูมือถือ, ปิดเมนู',
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
  description: 'วิธีการใช้งาน Header Global ใน Frontend',
  code: `
// ตัวอย่างการดึงข้อมูล Header
const header = await payload.findGlobal({
  slug: 'header'
})

// ตัวอย่างการแสดงเนื้อหาตามภาษา
const currentLanguage = 'th'
const logoAlt = header.translations?.logoAltText?.[currentLanguage] || 'Logo'
const siteTitle = header.translations?.siteTitle?.[currentLanguage] || 'Website'
const searchPlaceholder = header.translations?.searchPlaceholder?.[currentLanguage] || 'Search...'

// ตัวอย่างการแสดง Navigation Items
const navItems = header.multilangNavItems || []
navItems.forEach(item => {
  const label = item.label?.[currentLanguage] || item.label?.th || 'Link'
  const url = item.type === 'custom' ? item.url : \`/\${currentLanguage}/\${item.reference?.slug}\`
  
  console.log(\`\${label}: \${url}\`)
})

// ตัวอย่างการแสดงใน JSX
<header>
  <img src="/logo.png" alt={logoAlt} />
  <h1>{siteTitle}</h1>
  <input placeholder={searchPlaceholder} />
  
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
</header>
  `,
}
