#!/usr/bin/env node

/**
 * Script to add localized: true to all richText fields in blocks
 * This enables multi-language support for block content
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const blocksDir = path.join(__dirname, '../src/blocks')

// List of blocks to update
const blocksToUpdate = [
  'CallToAction',
  'Content', 
  'Banner',
  'MediaBlock',
  'Quote',
  'RichText',
  'ArchiveBlock'
]

async function addLocalizedToBlocks() {
  console.log('🚀 Starting to add localized support to blocks...')
  
  for (const blockName of blocksToUpdate) {
    const configPath = path.join(blocksDir, blockName, 'config.ts')
    
    if (!fs.existsSync(configPath)) {
      console.log(`⚠️  Block ${blockName} not found, skipping...`)
      continue
    }
    
    try {
      let content = fs.readFileSync(configPath, 'utf8')
      
      // Add localized: true to richText fields
      const richTextRegex = /(\s+name:\s+['"`]richText['"`],\s+type:\s+['"`]richText['"`],)(\s+editor:)/g
      const updatedContent = content.replace(richTextRegex, '$1\n      localized: true, // เพิ่มการรองรับหลายภาษา$2')
      
      if (content !== updatedContent) {
        fs.writeFileSync(configPath, updatedContent, 'utf8')
        console.log(`✅ Updated ${blockName}/config.ts`)
      } else {
        console.log(`ℹ️  ${blockName}/config.ts already has localized support`)
      }
      
    } catch (error) {
      console.error(`❌ Error updating ${blockName}:`, error.message)
    }
  }
  
  console.log('🎉 Finished adding localized support to blocks!')
  console.log('\n📝 Next steps:')
  console.log('1. Run: pnpm run generate:types')
  console.log('2. Restart your development server')
  console.log('3. Check admin panel - blocks should now support multiple languages')
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  addLocalizedToBlocks().catch(console.error)
}

export { addLocalizedToBlocks }
