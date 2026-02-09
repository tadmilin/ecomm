# 📦 คู่มือ Import สินค้าแบบมืออาชีพ (Production Ready)

## 🎯 Overview
ระบบ import สินค้ารองรับ CSV/Excel โดยอัตโนมัติ พร้อม:
- ✅ รองรับ 3 ภาษา (ไทย, อังกฤษ, จีน)
- ✅ อัปโหลดรูปภาพอัตโนมัติจาก URL → Cloudflare R2
- ✅ สร้างหมวดหมู่อัตโนมัติ
- ✅ ตรวจสอบ SKU ซ้ำ (update หรือ create)
- ✅ Dry run mode สำหรับทดสอบก่อน

---

## 📋 โครงสร้าง CSV (ตรงกับโค้ด 100%)

### ✅ คอลัมน์บังคับ (REQUIRED)
| คอลัมน์ | ตัวอย่าง | หมายเหตุ |
|---------|----------|----------|
| **SKU** | `CEMENT-001` | รหัสสินค้าต้องไม่ซ้ำ |
| **Product Name (TH)** | `ปูนซีเมนต์ปอร์ตแลนด์ 50 กก.` | ชื่อภาษาไทย (บังคับ) |
| **Price** | `350` | ราคาขาย (บาท) |
| **Stock** | `1000` | จำนวนสต็อก |

### 🌐 คอลัมน์ภาษา (RECOMMENDED)
| คอลัมน์ | ตัวอย่าง | Auto-fill |
|---------|----------|-----------|
| **Product Name (EN)** | `Portland Cement 50kg` | ถ้าไม่มีใช้ (TH) |
| **Product Name (ZH)** | `波特兰水泥 50公斤` | ถ้าไม่มีใช้ (TH) |
| **Description (TH)** | `ปูนซีเมนต์คุณภาพดี...` | คำอธิบายไทย |
| **Description (EN)** | `High quality cement...` | ถ้าไม่มีใช้ (TH) |
| **Description (ZH)** | `高品质水泥...` | ถ้าไม่มีใช้ (TH) |

### 💰 คอลัมน์ราคา (OPTIONAL)
| คอลัมน์ | ตัวอย่าง | หมายเหตุ |
|---------|----------|----------|
| **Compare At Price** | `450` | ราคาปกติ (ก่อนลด) |
| **Cost** | `280` | ต้นทุนต่อชิ้น |

### 📦 คอลัมน์ขนาด/น้ำหนัก (OPTIONAL)
| คอลัมน์ | ตัวอย่าง | หน่วย |
|---------|----------|------|
| **Weight** | `50` | กิโลกรัม (kg) |
| **Length (cm)** | `40` | เซนติเมตร |
| **Width (cm)** | `30` | เซนติเมตร |
| **Height (cm)** | `10` | เซนติเมตร |

### 🏷️ คอลัมน์จัดหมวดหมู่ (OPTIONAL)
| คอลัมน์ | ตัวอย่าง | หมายเหตุ |
|---------|----------|----------|
| **Category** | `ปูนซีเมนต์` | ต้องตรงกับชื่อใน Admin (สร้างอัตโนมัติ) |
| **Tags** | `ปูน,ก่อสร้าง,คุณภาพดี` | คั่นด้วย `,` |
| **Status** | `active` | `active`, `draft`, `archived` |
| **Featured** | `yes` | `yes` หรือ `no` |

### 🖼️ คอลัมน์รูปภาพ (OPTIONAL)
| คอลัมน์ | ตัวอย่าง | หมายเหตุ |
|---------|----------|----------|
| **Image URLs** | `https://example.com/img1.jpg\|https://example.com/img2.jpg` | คั่นด้วย `\|` สูงสุด 5 รูป |

---

## 🚀 ขั้นตอนการ Import (Production Workflow)

### 1️⃣ เตรียมไฟล์ CSV
```bash
# ดาวน์โหลดเทมเพลต
cp products-template-multilang.csv my-products.csv

# แก้ไขไฟล์ใน Excel/Google Sheets
# บันทึกเป็น CSV (UTF-8)
```

### 2️⃣ Dry Run (ทดสอบก่อน)
```bash
pnpm import:products --file my-products.csv --dry-run
```

**ตรวจสอบ output:**
- ✅ จำนวนสินค้าที่จะสร้าง/อัปเดต
- ✅ หมวดหมู่ที่จะสร้าง
- ✅ Error (ถ้ามี)

### 3️⃣ Import จริง
```bash
# เลือกทีละวิธี:

# A. Import ทั้งหมดทันที
pnpm import:products --file my-products.csv

# B. Import ทีละหมวดหมู่ (แนะนำ)
pnpm import:products --file cement-products.csv
pnpm import:products --file brick-products.csv
pnpm import:products --file paint-products.csv
```

### 4️⃣ ตรวจสอบผลลัพธ์
```bash
# เช็คใน Admin Panel:
https://your-domain.com/admin/collections/products

# หรือเช็คในเว็บไซต์:
https://your-domain.com/products
```

---

## ⚠️ Best Practices (Production)

### ✅ DO (ควรทำ)
1. **Backup ก่อนทำ import ใหญ่**
   ```bash
   # Export สินค้าเดิมก่อน
   mongodump --uri="YOUR_DATABASE_URI" --collection=products
   ```

2. **ใช้ Dry Run เสมอ**
   - ตรวจสอบ 100% ก่อน import จริง
   - ดู error และแก้ไขใน CSV

3. **แบ่ง import เป็นชุดย่อย**
   - แบ่งเป็นหมวดหมู่ (300-500 สินค้า/ครั้ง)
   - ง่ายต่อการแก้ไขถ้าเจอปัญหา

4. **ใช้ URL รูปภาพคุณภาพสูง**
   - Unsplash: `https://images.unsplash.com/photo-xxx?w=1200`
   - Cloudinary: `https://res.cloudinary.com/xxx/image/upload/w_1200`
   - Imgur: `https://i.imgur.com/xxx.jpg`

5. **ตรวจสอบ SKU ไม่ซ้ำ**
   - ใช้รูปแบบ: `CATEGORY-NUMBER` (เช่น `CEMENT-001`)
   - Run ซ้ำ = อัปเดตสินค้าเดิม

6. **ใช้ชื่อหมวดหมู่ตรงกับ Admin**
   - เช็คชื่อใน Admin Panel ก่อน
   - ถ้าไม่มีจะสร้างใหม่อัตโนมัติ

### ❌ DON'T (ห้ามทำ)
1. ❌ Import 3,000 สินค้าพร้อมกันครั้งแรก
2. ❌ ข้าม Dry Run
3. ❌ ใช้รูปภาพขนาดใหญ่เกิน 10MB
4. ❌ ใช้อักขระพิเศษใน SKU (ใช้ `-` และ `_` เท่านั้น)
5. ❌ ลืม backup database ก่อน import ใหญ่
6. ❌ Import ตอนเวลา peak hours (ใช้เวลากลางคืน)

---

## 🔍 ตัวอย่าง CSV ที่สมบูรณ์

```csv
SKU,Product Name (TH),Product Name (EN),Product Name (ZH),Description (TH),Description (EN),Description (ZH),Price,Compare At Price,Cost,Stock,Weight,Length (cm),Width (cm),Height (cm),Category,Tags,Status,Featured,Image URLs
CEMENT-001,ปูนซีเมนต์ปอร์ตแลนด์ 50 กก.,Portland Cement 50kg,波特兰水泥 50公斤,ปูนซีเมนต์คุณภาพสูงสำหรับงานก่อสร้าง,High quality Portland cement for construction,高品质波特兰水泥用于建筑工程,350,420,280,1000,50,60,40,15,ปูนซีเมนต์,"ปูน,ซีเมนต์,ก่อสร้าง",active,yes,https://images.unsplash.com/photo-1581858726788-75bc0f1a4eac?w=1200|https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200
BRICK-001,อิฐมอญ 3 รู,Red Brick 3 Holes,红砖 3孔,อิฐมอญคุณภาพดี 3 รู สำหรับก่อผนัง,High quality red brick with 3 holes for wall construction,高品质红砖3孔用于墙体建筑,7,9,5,5000,3.5,20,10,7,อิฐมวลเบา,"อิฐ,ก่อผนัง,มอญ",active,yes,https://images.unsplash.com/photo-1619641805634-77fc9fb4d4e5?w=1200
PAINT-001,สีทาบ้านภายนอก 5 แกลลอน,Exterior Paint 5 Gallon,外墙涂料 5加仑,สีทาบ้านภายนอกกันน้ำ ทนแดด,Waterproof exterior paint UV resistant,防水外墙涂料抗紫外线,1850,2200,1400,200,25,35,35,40,สีทาบ้าน,"สี,ทาบ้าน,ภายนอก",active,yes,https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200|https://images.unsplash.com/photo-1572981779780-c6d0c0ec0715?w=1200
```

---

## 📊 Import Summary (ตัวอย่าง)

```
🚀 Product Import Script
📄 File: my-products.csv
🔄 Dry run: No
---

✅ Payload initialized

📊 Found 3 products

🔹 [1/3] CEMENT-001 - ปูนซีเมนต์ปอร์ตแลนด์ 50 กก.
  ✓ Category found: ปูนซีเมนต์
  📥 Downloading: https://images.unsplash.com/photo-xxx
  📥 Downloading: https://images.unsplash.com/photo-yyy
  ✓ Uploaded 2 images
  ✅ Created

🔹 [2/3] BRICK-001 - อิฐมอญ 3 รู
  ✨ Category created: อิฐมวลเบา
  📥 Downloading: https://images.unsplash.com/photo-zzz
  ✓ Uploaded 1 images
  ✅ Created

🔹 [3/3] PAINT-001 - สีทาบ้านภายนอก 5 แกลลอน
  ✓ Category found: สีทาบ้าน
  📥 Downloading: https://images.unsplash.com/photo-aaa
  📥 Downloading: https://images.unsplash.com/photo-bbb
  ✓ Uploaded 2 images
  ✅ Created

══════════════════════════════════════════════════
📊 Import Summary
══════════════════════════════════════════════════
Total:   3
Created: 3
Updated: 0
Errors:  0
══════════════════════════════════════════════════
```

---

## 🆘 Troubleshooting

### ❌ Error: "missing secret key"
```bash
# แก้ไข: ตรวจสอบ .env.local มี PAYLOAD_SECRET
cat .env.local | grep PAYLOAD_SECRET

# หรือ pull จาก Vercel
vercel env pull .env.local
```

### ❌ Error: "Image failed: HTTP 403"
```bash
# แก้ไข: URL รูปภาพไม่อนุญาตให้ดาวน์โหลด
# ใช้ Unsplash หรืออัปโหลดไปยัง Imgur/Cloudinary ก่อน
```

### ❌ Error: "Category not found"
```bash
# แก้ไข: ตรวจสอบชื่อหมวดหมู่ในไฟล์ CSV ตรงกับ Admin Panel
# หรือปล่อยว่างไว้ให้สร้างอัตโนมัติ
```

### ⚠️ Warning: "XLSX.readFile is not a function"
```bash
# แก้ไข: ติดตั้งแพ็กเกจใหม่
pnpm install xlsx tsx --save
```

---

## 📞 Support

- 📚 Documentation: `/scripts/README.md`
- 🐛 Issues: Check `pnpm import:products --help`
- 💬 Contact: Senior Dev Team

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Production Ready:** ✅ YES
