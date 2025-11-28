#!/usr/bin/env node

/**
 * Excel to Payload CMS Import Script
 *
 * สำหรับนำเข้าสินค้าจาก Excel พร้อมรูปภาพเข้า Payload CMS
 *
 * ความต้องการ:
 * 1. ไฟล์ Excel (.xlsx) ที่มี columns: sku, name, description, price, stock, category, image_urls
 * 2. รูปภาพอยู่ใน folder หรือ URLs
 *
 * วิธีใช้:
 *   pnpm install xlsx
 *   node scripts/import-products.js --file products.xlsx
 *   node scripts/import-products.js --file products.xlsx --dry-run
 *   node scripts/import-products.js --file products.xlsx --batch-size 50
 */

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config.js'
import xlsx from 'xlsx'

// Configuration
const CONFIG = {
  // Batch processing (จำนวนสินค้าต่อ batch)
  batchSize: parseInt(process.env.BATCH_SIZE || '50', 10),

  // Delay between batches (milliseconds)
  batchDelay: parseInt(process.env.BATCH_DELAY || '1000', 10),

  // Default image folder (ถ้ารูปอยู่ในเครื่อง)
  imagePath: process.env.IMAGE_PATH || './product-images',

  // Default category
  defaultCategory: process.env.DEFAULT_CATEGORY || null,

  // Columns mapping (ปรับตาม Excel ของคุณ)
  columns: {
    sku: 'SKU',
    name: 'Product Name',
    name_th: 'Product Name (TH)',
    name_en: 'Product Name (EN)',
    name_zh: 'Product Name (CN)',
    description: 'Description',
    description_th: 'Description (TH)',
    description_en: 'Description (EN)',
    description_zh: 'Description (CN)',
    price: 'Price',
    compareAtPrice: 'Compare At Price',
    cost: 'Cost',
    stock: 'Stock',
    weight: 'Weight',
    category: 'Category',
    tags: 'Tags',
    status: 'Status',
    featured: 'Featured',
    imageUrls: 'Image URLs', // URLs คั่นด้วย |
    imageFiles: 'Image Files', // filenames คั่นด้วย |
  },
}

// Parse command line arguments
const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const fileIndex = args.indexOf('--file')
const excelFile = fileIndex !== -1 ? args[fileIndex + 1] : null
const batchSizeIndex = args.indexOf('--batch-size')
if (batchSizeIndex !== -1) {
  CONFIG.batchSize = parseInt(args[batchSizeIndex + 1], 10)
}

if (!excelFile) {
  console.error('❌ Error: Please specify Excel file with --file flag')
  console.log('Usage: node scripts/import-products.js --file products.xlsx')
  process.exit(1)
}

// Helper: Upload image to Payload
async function uploadImage(payload, imageSource, productSku) {
  try {
    let fileBuffer
    let filename

    // Check if imageSource is URL or file path
    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      // Download from URL
      console.log(`  📥 Downloading image from URL: ${imageSource}`)
      const response = await fetch(imageSource)
      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`)
      }
      fileBuffer = Buffer.from(await response.arrayBuffer())
      filename = path.basename(new URL(imageSource).pathname)
    } else {
      // Read from local file
      const imagePath = path.join(CONFIG.imagePath, imageSource)
      if (!fs.existsSync(imagePath)) {
        throw new Error(`File not found: ${imagePath}`)
      }
      fileBuffer = fs.readFileSync(imagePath)
      filename = imageSource
    }

    // Create media in Payload
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `${productSku} - ${filename}`,
      },
      file: {
        data: fileBuffer,
        mimetype: `image/${path.extname(filename).slice(1)}`,
        name: filename,
        size: fileBuffer.length,
      },
    })

    return media.id
  } catch (error) {
    console.error(`  ❌ Failed to upload image ${imageSource}:`, error.message)
    return null
  }
}

// Helper: Find or create category
async function findOrCreateCategory(payload, categoryName) {
  if (!categoryName) return null

  try {
    // Generate slug from category name
    const slug = categoryName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')

    // Find existing category by slug
    const existing = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return existing.docs[0].id
    }

    // Create new category with localized title
    const category = await payload.create({
      collection: 'categories',
      data: {
        title: categoryName.trim(), // This will be used for all locales initially
        slug: slug,
      },
    })

    console.log(`  ✨ Created new category: ${categoryName} (slug: ${slug})`)
    return category.id
  } catch (error) {
    console.error(`  ❌ Failed to handle category ${categoryName}:`, error.message)
    return null
  }
}

// Helper: Parse tags
function parseTags(tagsString) {
  if (!tagsString) return []
  return tagsString
    .split(/[,|;]/)
    .map((tag) => ({ tag: tag.trim() }))
    .filter((t) => t.tag)
}

// Helper: Parse image list
function parseImageList(imageString) {
  if (!imageString) return []
  return imageString
    .split('|')
    .map((img) => img.trim())
    .filter((img) => img)
}

// Main import function
async function importProducts() {
  console.log('🚀 Starting product import...')
  console.log(`📄 File: ${excelFile}`)
  console.log(`📦 Batch size: ${CONFIG.batchSize}`)
  console.log(`🔄 Dry run: ${isDryRun ? 'Yes' : 'No'}`)
  console.log('---')

  // Initialize Payload
  const payload = await getPayload({ config: await configPromise })
  console.log('✅ Payload CMS initialized')

  // Read Excel file
  if (!fs.existsSync(excelFile)) {
    console.error(`❌ Excel file not found: ${excelFile}`)
    process.exit(1)
  }

  const workbook = xlsx.readFile(excelFile)
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const rows = xlsx.utils.sheet_to_json(worksheet)

  console.log(`📊 Found ${rows.length} rows in Excel`)
  console.log('---')

  // Statistics
  const stats = {
    total: rows.length,
    processed: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  }

  // Process in batches
  for (let i = 0; i < rows.length; i += CONFIG.batchSize) {
    const batch = rows.slice(i, i + CONFIG.batchSize)
    console.log(
      `\n📦 Processing batch ${Math.floor(i / CONFIG.batchSize) + 1}/${Math.ceil(rows.length / CONFIG.batchSize)} (${batch.length} items)`,
    )

    for (const row of batch) {
      const sku = row[CONFIG.columns.sku]
      const name = row[CONFIG.columns.name]

      if (!sku || !name) {
        console.log(`⚠️  Skipping row: Missing SKU or Name`)
        stats.skipped++
        continue
      }

      console.log(`\n🔹 Processing: ${sku} - ${name}`)

      try {
        // Check if product exists
        const existing = await payload.find({
          collection: 'products',
          where: {
            sku: {
              equals: sku,
            },
          },
          limit: 1,
        })

        const isUpdate = existing.docs.length > 0

        if (isDryRun) {
          console.log(`  ✓ Would ${isUpdate ? 'update' : 'create'}: ${name}`)
          stats.processed++
          if (isUpdate) stats.updated++
          else stats.created++
          continue
        }

        // Handle category
        let categoryId = null
        const categoryName = row[CONFIG.columns.category]
        if (categoryName) {
          categoryId = await findOrCreateCategory(payload, categoryName)
          if (categoryId) {
            console.log(`  ✓ Category: ${categoryName}`)
          }
        }

        // Handle images
        const imageIds = []
        const imageUrls = parseImageList(row[CONFIG.columns.imageUrls])
        const imageFiles = parseImageList(row[CONFIG.columns.imageFiles])
        const allImages = [...imageUrls, ...imageFiles]

        for (const imageSource of allImages.slice(0, 10)) {
          // Max 10 images
          const imageId = await uploadImage(payload, imageSource, sku)
          if (imageId) {
            imageIds.push({
              image: imageId,
              alt: `${name} - Image ${imageIds.length + 1}`,
            })
          }
        }

        if (imageIds.length > 0) {
          console.log(`  ✓ Uploaded ${imageIds.length} image(s)`)
        }

        // Prepare product data
        const productData = {
          name: row[CONFIG.columns.name] || row[CONFIG.columns.name_th] || name,
          sku,
          description: row[CONFIG.columns.description] || row[CONFIG.columns.description_th] || '',

          // Multilang fields (3 ภาษา: ไทย, อังกฤษ, จีน)
          multilangName: {
            th: row[CONFIG.columns.name_th] || row[CONFIG.columns.name] || name,
            en: row[CONFIG.columns.name_en] || '',
            zh: row[CONFIG.columns.name_zh] || '',
          },
          multilangDescription: {
            th: row[CONFIG.columns.description_th] || row[CONFIG.columns.description] || '',
            en: row[CONFIG.columns.description_en] || '',
            zh: row[CONFIG.columns.description_zh] || '',
          },

          price: parseFloat(row[CONFIG.columns.price]) || 0,
          compareAtPrice: row[CONFIG.columns.compareAtPrice]
            ? parseFloat(row[CONFIG.columns.compareAtPrice])
            : null,
          cost: row[CONFIG.columns.cost] ? parseFloat(row[CONFIG.columns.cost]) : null,
          stock: parseInt(row[CONFIG.columns.stock]) || 0,
          weight: row[CONFIG.columns.weight] ? parseFloat(row[CONFIG.columns.weight]) : null,
          category: categoryId ? [categoryId] : [],
          tags: parseTags(row[CONFIG.columns.tags]),
          images: imageIds,
          status: row[CONFIG.columns.status]?.toLowerCase() || 'active',
          featured: row[CONFIG.columns.featured]?.toLowerCase() === 'yes' || false,
          externalId: row['ID'] || row['External ID'] || null,
        }

        // Create or update
        if (isUpdate) {
          await payload.update({
            collection: 'products',
            id: existing.docs[0].id,
            data: productData,
          })
          console.log(`  ✅ Updated: ${name}`)
          stats.updated++
        } else {
          await payload.create({
            collection: 'products',
            data: productData,
          })
          console.log(`  ✅ Created: ${name}`)
          stats.created++
        }

        stats.processed++
      } catch (error) {
        console.error(`  ❌ Error processing ${sku}:`, error.message)
        stats.errors++
      }
    }

    // Delay between batches
    if (i + CONFIG.batchSize < rows.length) {
      console.log(`⏳ Waiting ${CONFIG.batchDelay}ms before next batch...`)
      await new Promise((resolve) => setTimeout(resolve, CONFIG.batchDelay))
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Import Summary:')
  console.log('='.repeat(50))
  console.log(`Total rows:      ${stats.total}`)
  console.log(`Processed:       ${stats.processed}`)
  console.log(`Created:         ${stats.created}`)
  console.log(`Updated:         ${stats.updated}`)
  console.log(`Skipped:         ${stats.skipped}`)
  console.log(`Errors:          ${stats.errors}`)
  console.log('='.repeat(50))

  if (isDryRun) {
    console.log('\n⚠️  This was a dry run. No data was actually imported.')
    console.log('Remove --dry-run flag to perform actual import.')
  }

  process.exit(0)
}

// Run import
importProducts().catch((error) => {
  console.error('❌ Import failed:', error)
  process.exit(1)
})
