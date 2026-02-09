#!/usr/bin/env tsx

/**
 * Product Import Script for Payload CMS
 * Senior Dev Version - TypeScript Native
 */

import 'dotenv/config'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import xlsx from 'xlsx'

interface ProductRow {
  SKU: string
  'Product Name (TH)': string
  'Product Name (EN)'?: string
  'Product Name (ZH)'?: string
  'Description (TH)'?: string
  'Description (EN)'?: string
  'Description (ZH)'?: string
  Price: number
  'Compare At Price'?: number
  Cost?: number
  Stock: number
  Weight?: number
  'Length (cm)'?: number
  'Width (cm)'?: number
  'Height (cm)'?: number
  'Parent Category'?: string
  Category?: string
  Tags?: string
  Status?: string
  Featured?: string
  'Image URLs'?: string
}

const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const fileIndex = args.indexOf('--file')
const excelFile = fileIndex !== -1 ? args[fileIndex + 1] : null
const batchSize = 50

if (!excelFile) {
  console.error('❌ Error: Please specify file with --file flag')
  console.log('Usage: pnpm import --file test-products.csv')
  process.exit(1)
}

async function uploadImage(payload: any, imageUrl: string, productSku: string) {
  try {
    let buffer: Buffer
    let filename: string

    // ตรวจสอบว่าเป็น URL หรือ Local Path
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      // Download from URL
      console.log(`  📥 Downloading: ${imageUrl}`)
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      buffer = Buffer.from(await response.arrayBuffer())
      filename = `${productSku}-${Date.now()}.jpg`
    } else {
      // Read from local file
      console.log(`  📂 Reading local: ${imageUrl}`)
      const fs = await import('fs')
      const path = await import('path')
      
      if (!fs.existsSync(imageUrl)) {
        throw new Error(`File not found: ${imageUrl}`)
      }
      
      buffer = fs.readFileSync(imageUrl)
      const ext = path.extname(imageUrl) || '.jpg'
      filename = `${productSku}-${Date.now()}${ext}`
    }

    // Detect mimetype
    const mimetype = filename.endsWith('.png') ? 'image/png' 
                   : filename.endsWith('.webp') ? 'image/webp'
                   : 'image/jpeg'

    const media = await payload.create({
      collection: 'media',
      data: { alt: `${productSku} image` },
      file: {
        data: buffer,
        mimetype,
        name: filename,
        size: buffer.length,
      },
    })

    return media.id
  } catch (error: any) {
    console.error(`  ❌ Image failed: ${error.message}`)
    return null
  }
}

async function findOrCreateCategory(payload: any, categoryName: string, parentCategoryName?: string): Promise<string | null> {
  if (!categoryName) return null

  const slug = categoryName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')

  // Find existing category
  const existing = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`  ✓ Category found: ${categoryName}`)
    return existing.docs[0].id
  }

  if (isDryRun) {
    console.log(`  ⚠️  Category would be created: ${categoryName}${parentCategoryName ? ` (ภายใต้ ${parentCategoryName})` : ''}`)
    return 'dry-run-id'
  }

  // Handle parent category
  let parentId: string | null = null
  if (parentCategoryName) {
    parentId = await findOrCreateCategory(payload, parentCategoryName)
    console.log(`  ✓ Parent category: ${parentCategoryName}`)
  }

  const category: any = await payload.create({
    collection: 'categories',
    data: { 
      title: categoryName, 
      slug,
      parent: parentId,
    },
  })

  console.log(`  ✨ Category created: ${categoryName}${parentId ? ` (ภายใต้ ${parentCategoryName})` : ''}`)
  return category.id
}

async function main() {
  console.log('🚀 Product Import Script')
  console.log(`📄 File: ${excelFile}`)
  console.log(`🔄 Dry run: ${isDryRun ? 'Yes' : 'No'}`)
  console.log('---\n')

  // Initialize Payload
  const payload = await getPayload({ config })
  console.log('✅ Payload initialized\n')

  // Read file
  if (!fs.existsSync(excelFile!)) {
    throw new Error(`File not found: ${excelFile}`)
  }

  const workbook = xlsx.readFile(excelFile!)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = xlsx.utils.sheet_to_json<ProductRow>(worksheet)

  console.log(`📊 Found ${rows.length} products\n`)

  const stats = {
    total: rows.length,
    created: 0,
    updated: 0,
    errors: 0,
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const sku = row.SKU
    const nameTH = row['Product Name (TH)']
    const nameEN = row['Product Name (EN)'] || nameTH
    const nameZH = row['Product Name (ZH)'] || nameTH
    const descTH = row['Description (TH)'] || ''
    const descEN = row['Description (EN)'] || descTH
    const descZH = row['Description (ZH)'] || descTH

    if (!sku || !nameTH) {
      console.log(`⚠️  Row ${i + 1}: Missing SKU or Thai Name\n`)
      continue
    }

    console.log(`🔹 [${i + 1}/${rows.length}] ${sku} - ${nameTH}`)

    try {
      // Check existing
      const existing = await payload.find({
        collection: 'products',
        where: { sku: { equals: sku } },
        limit: 1,
      })

      const isUpdate = existing.docs.length > 0

      if (isDryRun) {
        console.log(`  ✓ Would ${isUpdate ? 'update' : 'create'}`)
        if (row.Category) {
          await findOrCreateCategory(payload, row.Category, row['Parent Category'])
        }
        stats[isUpdate ? 'updated' : 'created']++
        console.log()
        continue
      }

      // Handle category
      let categoryId = null
      if (row.Category) {
        categoryId = await findOrCreateCategory(payload, row.Category, row['Parent Category'])
      }

      // Handle images
      const imageIds: any[] = []
      if (row['Image URLs']) {
        const urls = row['Image URLs'].split('|').map((u) => u.trim())
        for (const url of urls.slice(0, 5)) {
          const imageId = await uploadImage(payload, url, sku)
          if (imageId) {
            imageIds.push({ image: imageId })
          }
        }
        console.log(`  ✓ Uploaded ${imageIds.length} images`)
      }

      // Prepare data
      const productData = {
        multilangName: {
          th: nameTH,
          en: nameEN,
          zh: nameZH,
        },
        multilangDescription: {
          th: descTH,
          en: descEN,
          zh: descZH,
        },
        name: nameTH,
        sku,
        description: descTH,
        price: Number(row.Price) || 0,
        compareAtPrice: row['Compare At Price'] ? Number(row['Compare At Price']) : undefined,
        cost: row.Cost ? Number(row.Cost) : undefined,
        stock: Number(row.Stock) || 0,
        weight: row.Weight ? Number(row.Weight) : undefined,
        dimensions: {
          length: row['Length (cm)'] ? Number(row['Length (cm)']) : undefined,
          width: row['Width (cm)'] ? Number(row['Width (cm)']) : undefined,
          height: row['Height (cm)'] ? Number(row['Height (cm)']) : undefined,
        },
        category: categoryId ? [categoryId] : [],
        tags: row.Tags ? row.Tags.split(',').map((t) => ({ tag: t.trim() })) : [],
        images: imageIds,
        status: (row.Status?.toLowerCase() as any) || 'active',
        featured: row.Featured?.toLowerCase() === 'yes',
      }

      // Create or update
      if (isUpdate) {
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          data: productData,
        })
        console.log(`  ✅ Updated`)
        stats.updated++
      } else {
        await payload.create({
          collection: 'products',
          data: productData,
        })
        console.log(`  ✅ Created`)
        stats.created++
      }

      console.log()
    } catch (error: any) {
      console.error(`  ❌ Error: ${error.message}\n`)
      stats.errors++
    }

    // Delay between items
    if (i < rows.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  // Summary
  console.log('═'.repeat(50))
  console.log('📊 Import Summary')
  console.log('═'.repeat(50))
  console.log(`Total:   ${stats.total}`)
  console.log(`Created: ${stats.created}`)
  console.log(`Updated: ${stats.updated}`)
  console.log(`Errors:  ${stats.errors}`)
  console.log('═'.repeat(50))

  if (isDryRun) {
    console.log('\n⚠️  Dry run - no data was imported')
    console.log('Remove --dry-run to import')
  }

  process.exit(0)
}

main().catch((error) => {
  console.error('\n❌ Import failed:', error.message)
  process.exit(1)
})
