#!/usr/bin/env node

/**
 * Migration Script: i18next to PayloadCMS i18n
 * 
 * This script migrates existing i18next translation data to PayloadCMS
 * Languages and Translations collections.
 * 
 * Usage:
 *   node scripts/migrate-to-payload-i18n.js
 *   node scripts/migrate-to-payload-i18n.js --dry-run
 *   node scripts/migrate-to-payload-i18n.js --reset
 */

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config.ts'

// Configuration
const CONFIG = {
  // Source directories for existing translations
  sourceDirs: {
    dictionaries: 'src/dictionaries',
    locales: 'public/locales'
  },
  
  // Target collections
  collections: {
    languages: 'languages',
    translations: 'translations'
  },
  
  // Default language settings
  defaultLanguage: 'th',
  supportedLanguages: ['th', 'en', 'ja'],
  
  // Language configurations
  languageConfigs: {
    th: {
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
    en: {
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
    ja: {
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
  }
}

class PayloadI18nMigrator {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false
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

  async migrate() {
    console.log('🔄 Starting migration process...')
    console.log(`📋 Mode: ${this.dryRun ? 'DRY RUN' : 'LIVE'}`)
    
    if (this.reset) {
      await this.resetCollections()
    }

    // Step 1: Create Languages
    await this.createLanguages()
    
    // Step 2: Migrate Translations from dictionaries
    await this.migrateDictionaryTranslations()
    
    // Step 3: Migrate Translations from locales
    await this.migrateLocaleTranslations()
    
    // Step 4: Generate summary
    this.generateSummary()
  }

  async resetCollections() {
    if (this.dryRun) {
      console.log('🧹 [DRY RUN] Would reset collections')
      return
    }

    console.log('🧹 Resetting collections...')
    
    try {
      // Delete all existing translations
      const existingTranslations = await this.payload.find({
        collection: CONFIG.collections.translations,
        limit: 1000
      })
      
      for (const translation of existingTranslations.docs) {
        await this.payload.delete({
          collection: CONFIG.collections.translations,
          id: translation.id
        })
      }
      
      // Delete all existing languages (except default)
      const existingLanguages = await this.payload.find({
        collection: CONFIG.collections.languages,
        limit: 1000
      })
      
      for (const language of existingLanguages.docs) {
        if (language.code !== CONFIG.defaultLanguage) {
          await this.payload.delete({
            collection: CONFIG.collections.languages,
            id: language.id
          })
        }
      }
      
      console.log('✅ Collections reset successfully')
    } catch (error) {
      console.error('❌ Failed to reset collections:', error.message)
      this.stats.errors.push(`Reset failed: ${error.message}`)
    }
  }

  async createLanguages() {
    console.log('🌍 Creating languages...')
    
    for (const [code, config] of Object.entries(CONFIG.languageConfigs)) {
      try {
        // Check if language already exists
        const existing = await this.payload.find({
          collection: CONFIG.collections.languages,
          where: { code: { equals: code } }
        })
        
        if (existing.docs.length > 0) {
          console.log(`⏭️  Language ${code} already exists, skipping...`)
          continue
        }
        
        if (this.dryRun) {
          console.log(`📝 [DRY RUN] Would create language: ${config.name} (${config.nativeName})`)
        } else {
          await this.payload.create({
            collection: CONFIG.collections.languages,
            data: config
          })
          console.log(`✅ Created language: ${config.name} (${config.nativeName})`)
        }
        
        this.stats.languagesCreated++
      } catch (error) {
        console.error(`❌ Failed to create language ${code}:`, error.message)
        this.stats.errors.push(`Language ${code}: ${error.message}`)
      }
    }
  }

  async migrateDictionaryTranslations() {
    console.log('📚 Migrating dictionary translations...')
    
    const dictPath = path.join(process.cwd(), CONFIG.sourceDirs.dictionaries)
    
    if (!fs.existsSync(dictPath)) {
      console.log('⚠️  Dictionary directory not found, skipping...')
      return
    }
    
    for (const langCode of CONFIG.supportedLanguages) {
      const filePath = path.join(dictPath, `${langCode}.json`)
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Dictionary file not found: ${filePath}`)
        continue
      }
      
      try {
        const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        await this.processTranslations(langCode, 'common', translations)
      } catch (error) {
        console.error(`❌ Failed to process dictionary ${langCode}:`, error.message)
        this.stats.errors.push(`Dictionary ${langCode}: ${error.message}`)
      }
    }
  }

  async migrateLocaleTranslations() {
    console.log('🌐 Migrating locale translations...')
    
    const localesPath = path.join(process.cwd(), CONFIG.sourceDirs.locales)
    
    if (!fs.existsSync(localesPath)) {
      console.log('⚠️  Locales directory not found, skipping...')
      return
    }
    
    for (const langCode of CONFIG.supportedLanguages) {
      const langDir = path.join(localesPath, langCode)
      
      if (!fs.existsSync(langDir)) {
        console.log(`⚠️  Locale directory not found: ${langDir}`)
        continue
      }
      
      // Process all JSON files in the language directory
      const files = fs.readdirSync(langDir).filter(file => file.endsWith('.json'))
      
      for (const file of files) {
        const namespace = path.basename(file, '.json')
        const filePath = path.join(langDir, file)
        
        try {
          const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'))
          await this.processTranslations(langCode, namespace, translations)
        } catch (error) {
          console.error(`❌ Failed to process locale ${langCode}/${namespace}:`, error.message)
          this.stats.errors.push(`Locale ${langCode}/${namespace}: ${error.message}`)
        }
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
      // Check if translation already exists
      const existing = await this.payload.find({
        collection: CONFIG.collections.translations,
        where: {
          and: [
            { language: { equals: langCode } },
            { namespace: { equals: namespace } },
            { key: { equals: key } }
          ]
        }
      })
      
      if (existing.docs.length > 0) {
        console.log(`⏭️  Translation already exists: ${namespace}.${key} (${langCode})`)
        return
      }
      
      if (this.dryRun) {
        console.log(`📝 [DRY RUN] Would create translation: ${namespace}.${key} = "${value}" (${langCode})`)
      } else {
        await this.payload.create({
          collection: CONFIG.collections.translations,
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
      }
      
      this.stats.translationsCreated++
    } catch (error) {
      console.error(`❌ Failed to create translation ${namespace}.${key}:`, error.message)
      this.stats.errors.push(`Translation ${namespace}.${key}: ${error.message}`)
    }
  }

  generateSummary() {
    console.log('\n📊 Migration Summary:')
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
    
    if (this.dryRun) {
      console.log('\n⚠️  This was a DRY RUN - no data was actually modified')
    } else {
      console.log('\n✅ Migration completed successfully!')
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2)
  const options = {
    dryRun: args.includes('--dry-run'),
    reset: args.includes('--reset')
  }
  
  console.log('🔄 PayloadCMS i18n Migration Script')
  console.log('=====================================')
  
  if (options.dryRun) {
    console.log('🧪 Running in DRY RUN mode - no changes will be made')
  }
  
  if (options.reset) {
    console.log('🧹 RESET mode enabled - existing data will be cleared')
  }
  
  const migrator = new PayloadI18nMigrator(options)
  
  try {
    await migrator.init()
    await migrator.migrate()
  } catch (error) {
    console.error('💥 Migration failed:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export default PayloadI18nMigrator
