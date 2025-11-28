# คู่มือนำเข้าสินค้า 3,000 ชิ้น จาก Excel สู่ Payload CMS

## 📋 สรุปสิ่งที่สร้างแล้ว

### ✅ ไฟล์ที่สร้างใหม่:

1. **`src/collections/Products/index.ts`**
   - Collection สำหรับสินค้า พร้อม fields ครบ (sku, name, price, stock, images, etc.)
   - Admin panel พร้อมใช้งาน

2. **`scripts/import-products.js`**
   - Script นำเข้าสินค้าจาก Excel
   - รองรับ batch processing (50-100 สินค้า/รอบ)
   - อัปโหลดรูปภาพจาก URL หรือไฟล์ในเครื่อง
   - Auto-create categories ถ้ายังไม่มี

3. **`scripts/IMPORT_GUIDE.md`**
   - คู่มือการใช้งานแบบละเอียด (ภาษาอังกฤษ)
   - วิธี prepare Excel file
   - คำสั่งรัน import
   - Troubleshooting

4. **`scripts/products-template.csv`**
   - Excel template ตัวอย่าง 15 สินค้า
   - แสดงรูปแบบ columns ที่ต้องใช้
   - มีรูปภาพตัวอย่างจาก Unsplash

5. **`src/app/[lang]/products/page.tsx`**
   - หน้าแสดงสินค้า frontend
   - Grid layout พร้อมรูป, ราคา, stock
   - รองรับ pagination

6. **`STORAGE_PLANNING.md`**
   - การประมาณการใช้ storage
   - แผนการ migrate เมื่อ storage เต็ม
   - Cost projections

---

## 🎯 คำตอบคำถามของคุณ

### Q: จะดึงข้อมูลจาก Excel เข้า Admin Panel ได้อย่างไร?

**A:** ใช้ script `import-products.js` ที่สร้างให้แล้ว มีขั้นตอนดังนี้:

#### 1. Prepare Excel File
สร้างไฟล์ Excel (.xlsx หรือ .csv) ด้วย columns เหล่านี้:

| Column Name | Required | ตัวอย่าง |
|------------|----------|----------|
| SKU | ✅ | `PROD-001` |
| Product Name | ✅ | `iPhone 15 Pro Max` |
| Description | ⚪ | `Latest iPhone with...` |
| Price | ✅ | `45900` |
| Stock | ✅ | `100` |
| Category | ⚪ | `Smartphones` |
| Image URLs | ⚪ | `https://example.com/img1.jpg\|https://example.com/img2.jpg` |

**ดู template ตัวอย่าง**: `scripts/products-template.csv`

#### 2. Prepare รูปภาพ (2 วิธี)

**วิธี 1: ใช้ URL** (แนะนำ)
```excel
Image URLs: https://example.com/product1.jpg|https://example.com/product2.jpg
```

**วิธี 2: ใช้ไฟล์ในเครื่อง**
```
1. วางรูปทั้งหมดใน folder: ./product-images/
2. ใน Excel ใส่ชื่อไฟล์:
   Image Files: product1.jpg|product2.jpg
```

#### 3. Install Dependencies
```bash
npm install xlsx
```

#### 4. Test Import (Dry Run)
```bash
npm run import:products:dry -- --file products.xlsx
```
หรือ
```bash
node scripts/import-products.js --file products.xlsx --dry-run
```

#### 5. Import จริง
```bash
npm run import:products -- --file products.xlsx --batch-size 50
```

---

### Q: 3,000 สินค้าพร้อมรูปภาพจะพอไหม?

**A: ใช่ พอ!** ถ้าทำตามแนวทางนี้:

#### MongoDB Atlas Free (512 MB)
- **ข้อมูลสินค้า 3,000 ชิ้น**: ~10 MB
- **Pages + Posts + Users**: ~20 MB
- **Total**: ~30 MB / 512 MB = **6% ใช้งาน** ✅

#### Vercel Blob Free (5 GB)
- **3 รูป/สินค้า × 3,000 สินค้า × 300 KB/รูป** = 2.7 GB
- **Total**: 2.7 GB / 5 GB = **54% ใช้งาน** ✅
- **เหลือ**: 2.3 GB สำหรับเพิ่มสินค้าอีก 1,500 ชิ้น

#### ⚠️ ข้อแม้:
- **ต้อง optimize รูป** ให้ได้ ~300 KB/รูป
- **รูปต้นฉบับ 2 MB/รูป** = ใช้ 18 GB (เกิน!) ❌

---

## 🖼️ วิธี Optimize รูปภาพ

### วิธีที่ 1: ใช้ Sharp CLI (Batch)
```bash
# Install
npm install -g sharp-cli

# Optimize ทั้ง folder
sharp-cli resize 800 800 ^
  --format webp ^
  --quality 85 ^
  --input ./original-images/*.jpg ^
  --output ./optimized-images/
```

### วิธีที่ 2: ใช้ Online Tools
- **TinyPNG**: https://tinypng.com (drag & drop)
- **Squoosh**: https://squoosh.app (manual control)
- **Cloudinary**: Auto-optimize on upload

### เป้าหมาย:
- **Resolution**: 800×800px (product listing), 1200×1200px (max)
- **Format**: WebP (เล็กกว่า JPEG 25-35%)
- **Quality**: 85%
- **Size**: 200-400 KB per image

---

## 🚀 ขั้นตอนการใช้งานทั้งหมด

### Step 1: Update Config (ทำแล้ว ✅)
```typescript
// src/payload.config.ts
collections: [Pages, Posts, Media, Categories, Products, Users]
```

### Step 2: Install Package
```bash
npm install xlsx
```

### Step 3: Generate Types
```bash
npm run generate:types
```

### Step 4: Start Dev Server
```bash
npm run dev
```

### Step 5: Access Admin Panel
```
http://localhost:3000/admin
```
- เข้า Collections → Products
- คุณจะเห็น Products collection พร้อมใช้งาน

### Step 6: Prepare Excel & Images
1. สร้างไฟล์ Excel ตาม template
2. Optimize รูปภาพให้ได้ ~300 KB/รูป
3. Upload รูปไปที่ CDN หรือวางใน `./product-images/`

### Step 7: Test Import
```bash
npm run import:products:dry -- --file products.xlsx
```

ดูผลลัพธ์:
```
📊 Import Summary:
Total rows:      3000
Processed:       3000
Created:         3000
Updated:         0
Skipped:         0
Errors:          0
```

### Step 8: Import จริง
```bash
npm run import:products -- --file products.xlsx --batch-size 50
```

รอประมาณ **60 นาที** สำหรับ 3,000 สินค้า

### Step 9: View Products
```
Frontend: http://localhost:3000/products
Admin: http://localhost:3000/admin/collections/products
```

---

## 📊 Performance & Timing

### Import Speed:
| จำนวนสินค้า | มีรูป (3 รูป/สินค้า) | ไม่มีรูป |
|----------|------------------|---------|
| 100 | ~2 นาที | ~30 วินาที |
| 500 | ~10 นาที | ~3 นาที |
| 1,000 | ~20 นาที | ~5 นาที |
| 3,000 | ~60 นาที | ~15 นาที |

### Factors:
- **Batch size**: 50-100 (แนะนำ 50)
- **Delay**: 1000ms between batches
- **Image download**: ~500ms per image
- **MongoDB insert**: ~100ms per product

---

## 🎨 การใช้งาน Admin Panel

### เข้าถึง Products:
1. เปิด http://localhost:3000/admin
2. Sidebar → Collections → Products
3. กด "Create New" เพื่อเพิ่มสินค้าทีละชิ้น

### Filters & Search:
- Filter by: Status, Category, Featured
- Search: SKU, Product Name
- Sort: Price, Stock, Created Date

### Bulk Actions:
- Select multiple products → Change Status
- Export to CSV
- Bulk Delete

---

## 🔄 แผนการ Migrate Storage (เมื่อจำเป็น)

### เมื่อไหร่ต้อง Migrate?
- Vercel Blob ใกล้เต็ม (> 4 GB = 80%)
- ต้องการ image transformation (resize, crop, watermark)
- ต้องการ CDN แบบ global

### Migrate ไป Cloudinary:
```bash
# 1. Sign up Cloudinary (free 25 GB)
# 2. Add credentials to .env.local
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STORAGE_PROVIDER=cloudinary

# 3. Redeploy or restart server
npm run dev

# 4. Future uploads จะใช้ Cloudinary อัตโนมัติ
# 5. (Optional) Migrate existing images with migration script
```

**ใช้เวลา**: ~2-4 ชั่วโมงสำหรับ 3,000 สินค้า

---

## 💡 Best Practices

### DO ✅:
1. **Test ก่อน** ด้วย `--dry-run`
2. **Backup database** ก่อน import ใหญ่
3. **Optimize รูปภาพ** ก่อน upload
4. **Use batch processing** (50-100 ต่อรอบ)
5. **Monitor storage** ทุกเดือน
6. **Validate Excel data** ก่อน import (SKU ไม่ซ้ำ, ราคาถูกต้อง)

### DON'T ❌:
1. **อย่า upload รูปขนาดใหญ่** (> 1 MB)
2. **อย่าใช้ PNG** สำหรับรูปสินค้า (ใช้ WebP/JPEG)
3. **อย่า import ซ้ำ** โดยไม่ check duplicates
4. **อย่ารอจน storage เต็ม 100%** ค่อย migrate
5. **อย่า forget backup** database

---

## 🐛 Troubleshooting

### Error: "SKU already exists"
**สาเหตร**: มีสินค้า SKU ซ้ำ
**แก้**: Script จะ update สินค้าเดิมอัตโนมัติ

### Error: "Image upload failed"
**สาเหตร**: URL ไม่ถูกต้องหรือไฟล์หาไม่เจอ
**แก้**: 
- Check URL accessible
- Check filename ถูกต้อง
- Check internet connection

### Error: "Category not found"
**สาเหตร**: N/A (script auto-create)
**แก้**: ไม่ต้องแก้ category จะถูกสร้างอัตโนมัติ

### Import ช้ามาก
**สาเหตร**: Batch size ใหญ่เกิน หรือ delay น้อยเกิน
**แก้**: 
```bash
# ลด batch size
npm run import:products -- --file products.xlsx --batch-size 25

# หรือเพิ่ม delay
BATCH_DELAY=2000 npm run import:products -- --file products.xlsx
```

### Out of Memory
**สาเหตร**: Import ทีละมากเกิน
**แก้**: แบ่ง Excel เป็นหลายไฟล์ (500-1000 สินค้า/ไฟล์)

---

## 📞 สรุป

### ✅ พร้อมใช้งาน:
- Products Collection ✅
- Import Script ✅
- Excel Template ✅
- Storage Planning ✅
- Frontend Page ✅

### ⏳ ขั้นตอนถัดไป:
1. Install `xlsx`: `npm install xlsx`
2. Generate types: `npm run generate:types`
3. Prepare Excel file
4. Optimize images (300 KB/image)
5. Test import: `npm run import:products:dry -- --file products.xlsx`
6. Import: `npm run import:products -- --file products.xlsx`
7. Check results: http://localhost:3000/admin/collections/products

### 💰 ค่าใช้จ่าย:
- **0-3,000 สินค้า**: ฟรี ($0/month) ✅
- **3,000-6,000 สินค้า**: ~$1/month
- **6,000-10,000 สินค้า**: ฟรี (ย้ายไป Cloudinary) ✅
- **10,000+ สินค้า**: ~$57/month (MongoDB M10)

---

## 📚 เอกสารเพิ่มเติม

- **Import Guide**: `scripts/IMPORT_GUIDE.md`
- **Storage Planning**: `STORAGE_PLANNING.md`
- **Excel Template**: `scripts/products-template.csv`
- **Import Script**: `scripts/import-products.js`

---

**มีคำถามเพิ่มเติม? แจ้งได้เลย! 🚀**
