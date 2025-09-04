#!/usr/bin/env node

/**
 * Seed Script: PayloadCMS i18n Initial Data
 * 
 * This script creates initial language and translation data
 * for PayloadCMS i18n system.
 * 
 * Usage:
 *   node scripts/seed-payload-i18n.js
 *   node scripts/seed-payload-i18n.js --reset
 */

import { getPayload } from 'payload'
import configPromise from '../src/payload.config.ts'

// Initial data
const INITIAL_DATA = {
  languages: [
    {
      code: 'th',
      name: 'Thai',
      nativeName: 'ไทย',
      isActive: true,
      isDefault: true,
      direction: 'ltr',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      currency: 'THB',
      sortOrder: 1
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      isActive: true,
      isDefault: false,
      direction: 'ltr',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD',
      sortOrder: 2
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      isActive: true,
      isDefault: false,
      direction: 'ltr',
      dateFormat: 'YYYY/MM/DD',
      timeFormat: '24h',
      currency: 'JPY',
      sortOrder: 3
    }
  ],
  
  translations: {
    th: {
      common: {
        meta: {
          title: 'เว็บไซต์ Payload',
          description: 'เว็บไซต์ที่สร้างด้วย Payload CMS'
        },
        loading: 'กำลังโหลด...',
        error: 'เกิดข้อผิดพลาด',
        success: 'สำเร็จ',
        cancel: 'ยกเลิก',
        save: 'บันทึก',
        delete: 'ลบ',
        edit: 'แก้ไข',
        create: 'สร้างใหม่',
        search: 'ค้นหา',
        filter: 'กรอง',
        sort: 'เรียงลำดับ',
        next: 'ถัดไป',
        previous: 'ก่อนหน้า',
        back: 'กลับ',
        home: 'หน้าแรก',
        about: 'เกี่ยวกับเรา',
        contact: 'ติดต่อ',
        login: 'เข้าสู่ระบบ',
        logout: 'ออกจากระบบ',
        register: 'สมัครสมาชิก',
        profile: 'โปรไฟล์',
        settings: 'การตั้งค่า'
      },
      layout: {
        header: {
          search_sr_only: 'ค้นหา',
          menu_toggle: 'เปิด/ปิดเมนู',
          language_switcher: 'เปลี่ยนภาษา'
        },
        nav: {
          home: 'หน้าแรก',
          posts: 'บทความ',
          search: 'ค้นหา',
          about: 'เกี่ยวกับเรา'
        },
        footer: {
          copyright: 'ลิขสิทธิ์ © {year} เว็บไซต์ Payload',
          all_rights_reserved: 'สงวนลิขสิทธิ์',
          powered_by: 'ขับเคลื่อนโดย Payload CMS'
        }
      },
      auth: {
        signin_with_google: 'เข้าสู่ระบบด้วย Google',
        signin: 'เข้าสู่ระบบ',
        signup: 'สมัครสมาชิก',
        email: 'อีเมล',
        password: 'รหัสผ่าน',
        confirm_password: 'ยืนยันรหัสผ่าน',
        forgot_password: 'ลืมรหัสผ่าน?',
        remember_me: 'จดจำการเข้าสู่ระบบ',
        already_have_account: 'มีบัญชีแล้ว?',
        dont_have_account: 'ยังไม่มีบัญชี?'
      },
      admin: {
        dashboard: 'แดชบอร์ด',
        collections: 'คอลเลกชัน',
        media: 'สื่อ',
        users: 'ผู้ใช้',
        settings: 'การตั้งค่า',
        languages: 'ภาษา',
        translations: 'คำแปล',
        create_new: 'สร้างใหม่',
        edit_item: 'แก้ไขรายการ',
        delete_item: 'ลบรายการ',
        save_changes: 'บันทึกการเปลี่ยนแปลง',
        cancel: 'ยกเลิก',
        confirm_delete: 'ยืนยันการลบ',
        item_created: 'สร้างรายการสำเร็จ',
        item_updated: 'อัปเดตรายการสำเร็จ',
        item_deleted: 'ลบรายการสำเร็จ'
      }
    },
    
    en: {
      common: {
        meta: {
          title: 'Payload Website',
          description: 'A modern website built with Payload CMS'
        },
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create New',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        next: 'Next',
        previous: 'Previous',
        back: 'Back',
        home: 'Home',
        about: 'About Us',
        contact: 'Contact',
        login: 'Login',
        logout: 'Logout',
        register: 'Register',
        profile: 'Profile',
        settings: 'Settings'
      },
      layout: {
        header: {
          search_sr_only: 'Search',
          menu_toggle: 'Toggle menu',
          language_switcher: 'Language switcher'
        },
        nav: {
          home: 'Home',
          posts: 'Posts',
          search: 'Search',
          about: 'About Us'
        },
        footer: {
          copyright: 'Copyright © {year} Payload Website',
          all_rights_reserved: 'All rights reserved',
          powered_by: 'Powered by Payload CMS'
        }
      },
      auth: {
        signin_with_google: 'Sign in with Google',
        signin: 'Sign In',
        signup: 'Sign Up',
        email: 'Email',
        password: 'Password',
        confirm_password: 'Confirm Password',
        forgot_password: 'Forgot Password?',
        remember_me: 'Remember Me',
        already_have_account: 'Already have an account?',
        dont_have_account: "Don't have an account?"
      },
      admin: {
        dashboard: 'Dashboard',
        collections: 'Collections',
        media: 'Media',
        users: 'Users',
        settings: 'Settings',
        languages: 'Languages',
        translations: 'Translations',
        create_new: 'Create New',
        edit_item: 'Edit Item',
        delete_item: 'Delete Item',
        save_changes: 'Save Changes',
        cancel: 'Cancel',
        confirm_delete: 'Confirm Delete',
        item_created: 'Item created successfully',
        item_updated: 'Item updated successfully',
        item_deleted: 'Item deleted successfully'
      }
    },
    
    ja: {
      common: {
        meta: {
          title: 'Payloadウェブサイト',
          description: 'Payload CMSで構築されたモダンなウェブサイト'
        },
        loading: '読み込み中...',
        error: 'エラーが発生しました',
        success: '成功',
        cancel: 'キャンセル',
        save: '保存',
        delete: '削除',
        edit: '編集',
        create: '新規作成',
        search: '検索',
        filter: 'フィルター',
        sort: '並び替え',
        next: '次へ',
        previous: '前へ',
        back: '戻る',
        home: 'ホーム',
        about: '私たちについて',
        contact: 'お問い合わせ',
        login: 'ログイン',
        logout: 'ログアウト',
        register: '登録',
        profile: 'プロフィール',
        settings: '設定'
      },
      layout: {
        header: {
          search_sr_only: '検索',
          menu_toggle: 'メニュー切り替え',
          language_switcher: '言語切り替え'
        },
        nav: {
          home: 'ホーム',
          posts: '投稿',
          search: '検索',
          about: '私たちについて'
        },
        footer: {
          copyright: 'Copyright © {year} Payloadウェブサイト',
          all_rights_reserved: 'All rights reserved',
          powered_by: 'Powered by Payload CMS'
        }
      },
      auth: {
        signin_with_google: 'Googleでサインイン',
        signin: 'サインイン',
        signup: 'サインアップ',
        email: 'メール',
        password: 'パスワード',
        confirm_password: 'パスワード確認',
        forgot_password: 'パスワードを忘れましたか？',
        remember_me: 'ログイン状態を保持',
        already_have_account: 'アカウントをお持ちですか？',
        dont_have_account: 'アカウントをお持ちでないですか？'
      },
      admin: {
        dashboard: 'ダッシュボード',
        collections: 'コレクション',
        media: 'メディア',
        users: 'ユーザー',
        settings: '設定',
        languages: '言語',
        translations: '翻訳',
        create_new: '新規作成',
        edit_item: 'アイテムを編集',
        delete_item: 'アイテムを削除',
        save_changes: '変更を保存',
        cancel: 'キャンセル',
        confirm_delete: '削除を確認',
        item_created: 'アイテムが正常に作成されました',
        item_updated: 'アイテムが正常に更新されました',
        item_deleted: 'アイテムが正常に削除されました'
      }
    }
  }
}

class PayloadI18nSeeder {
  constructor(options = {}) {
    this.reset = options.reset || false
    this.payload = null
    this.stats = {
      languagesCreated: 0,
      translationsCreated: 0,
      errors: []
    }
  }

  async init() {
    try {
      console.log('🚀 Initializing PayloadCMS...')
      this.payload = await getPayload({ config: configPromise })
      console.log('✅ PayloadCMS initialized successfully')
    } catch (error) {
      console.error('❌ Failed to initialize PayloadCMS:', error.message)
      throw error
    }
  }

  async seed() {
    console.log('🌱 Starting seeding process...')
    
    if (this.reset) {
      await this.resetCollections()
    }

    // Step 1: Create Languages
    await this.createLanguages()
    
    // Step 2: Create Translations
    await this.createTranslations()
    
    // Step 3: Generate summary
    this.generateSummary()
  }

  async resetCollections() {
    console.log('🧹 Resetting collections...')
    
    try {
      // Delete all existing translations
      const existingTranslations = await this.payload.find({
        collection: 'translations',
        limit: 1000
      })
      
      for (const translation of existingTranslations.docs) {
        await this.payload.delete({
          collection: 'translations',
          id: translation.id
        })
      }
      
      // Delete all existing languages
      const existingLanguages = await this.payload.find({
        collection: 'languages',
        limit: 1000
      })
      
      for (const language of existingLanguages.docs) {
        await this.payload.delete({
          collection: 'languages',
          id: language.id
        })
      }
      
      console.log('✅ Collections reset successfully')
    } catch (error) {
      console.error('❌ Failed to reset collections:', error.message)
      this.stats.errors.push(`Reset failed: ${error.message}`)
    }
  }

  async createLanguages() {
    console.log('🌍 Creating languages...')
    
    for (const languageData of INITIAL_DATA.languages) {
      try {
        await this.payload.create({
          collection: 'languages',
          data: languageData
        })
        console.log(`✅ Created language: ${languageData.name} (${languageData.nativeName})`)
        this.stats.languagesCreated++
      } catch (error) {
        console.error(`❌ Failed to create language ${languageData.code}:`, error.message)
        this.stats.errors.push(`Language ${languageData.code}: ${error.message}`)
      }
    }
  }

  async createTranslations() {
    console.log('📝 Creating translations...')
    
    for (const [langCode, namespaces] of Object.entries(INITIAL_DATA.translations)) {
      for (const [namespace, translations] of Object.entries(namespaces)) {
        await this.processTranslations(langCode, namespace, translations)
      }
    }
  }

  async processTranslations(langCode, namespace, translations, prefix = '') {
    for (const [key, value] of Object.entries(translations)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      
      if (typeof value === 'object' && value !== null) {
        // Recursively process nested objects
        await this.processTranslations(langCode, namespace, value, fullKey)
      } else if (typeof value === 'string') {
        // Create translation entry
        await this.createTranslation(langCode, namespace, fullKey, value)
      }
    }
  }

  async createTranslation(langCode, namespace, key, value) {
    try {
      await this.payload.create({
        collection: 'translations',
        data: {
          key,
          namespace,
          language: langCode,
          value,
          isActive: true,
          autoTranslated: false,
          needsReview: false,
          sortOrder: 0
        }
      })
      console.log(`✅ Created translation: ${namespace}.${key} = "${value}" (${langCode})`)
      this.stats.translationsCreated++
    } catch (error) {
      console.error(`❌ Failed to create translation ${namespace}.${key}:`, error.message)
      this.stats.errors.push(`Translation ${namespace}.${key}: ${error.message}`)
    }
  }

  generateSummary() {
    console.log('\n📊 Seeding Summary:')
    console.log('='.repeat(50))
    console.log(`🌍 Languages created: ${this.stats.languagesCreated}`)
    console.log(`📝 Translations created: ${this.stats.translationsCreated}`)
    console.log(`❌ Errors: ${this.stats.errors.length}`)
    
    if (this.stats.errors.length > 0) {
      console.log('\n🚨 Errors encountered:')
      this.stats.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`)
      })
    }
    
    console.log('\n✅ Seeding completed successfully!')
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2)
  const options = {
    reset: args.includes('--reset')
  }
  
  console.log('🌱 PayloadCMS i18n Seeding Script')
  console.log('==================================')
  
  if (options.reset) {
    console.log('🧹 RESET mode enabled - existing data will be cleared')
  }
  
  const seeder = new PayloadI18nSeeder(options)
  
  try {
    await seeder.init()
    await seeder.seed()
  } catch (error) {
    console.error('💥 Seeding failed:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export default PayloadI18nSeeder
