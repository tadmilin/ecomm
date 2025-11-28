# คู่มือนำเข้าสินค้าแบบ 3 ภาษา (ไทย, อังกฤษ, จีน)

## 📋 รูปแบบ Excel Template ใหม่

ระบบรองรับ **3 ภาษา**: ไทย (TH), อังกฤษ (EN), จีน (CN/ZH)

### คอลัมน์ที่ต้องมีในไฟล์ Excel:

#### 1. ข้อมูลพื้นฐาน (Required)
- `SKU` - รหัสสินค้า (ห้ามซ้ำ) *
- `Product Name (TH)` - ชื่อสินค้าภาษาไทย *
- `Product Name (EN)` - ชื่อสินค้าภาษาอังกฤษ
- `Product Name (CN)` - ชื่อสินค้าภาษาจีน
- `Price` - ราคา (บาท) *
- `Stock` - จำนวนสินค้าคงเหลือ *

#### 2. คำอธิบายสินค้า (Optional)
- `Description (TH)` - คำอธิบายภาษาไทย
- `Description (EN)` - คำอธิบายภาษาอังกฤษ
- `Description (CN)` - คำอธิบายภาษาจีน

#### 3. ราคาและต้นทุน (Optional)
- `Compare At Price` - ราคาเปรียบเทียบ (ราคาก่อนลด)
- `Cost` - ต้นทุนต่อชิ้น

#### 4. ข้อมูลเพิ่มเติม (Optional)
- `Weight` - น้ำหนัก (กิโลกรัม)
- `Category` - หมวดหมู่ (ถ้ายังไม่มีจะสร้างใหม่อัตโนมัติ)
- `Tags` - แท็ก (คั่นด้วย , หรือ | หรือ ;)
- `Status` - สถานะ: `active`, `draft`, `out_of_stock`, `discontinued`
- `Featured` - สินค้าเด่น: `yes` หรือ `no`
- `Image URLs` - URLs รูปภาพ (คั่นด้วย |)
- `Image Files` - ชื่อไฟล์รูปภาพ (คั่นด้วย |)
- `External ID` - รหัสอ้างอิงจากระบบเก่า

---

## 🎯 การทำงานของระบบแปลภาษา

### Frontend (หน้าเว็บ)
เมื่อผู้ใช้เปิดหน้าเว็บ ระบบจะแสดงข้อความตาม URL:
- `/th/products` → แสดงภาษาไทย
- `/en/products` → แสดงภาษาอังกฤษ
- `/cn/products` → แสดงภาษาจีน

### Fallback Logic
ถ้าไม่มีข้อความในภาษาที่เลือก จะใช้ลำดับ:
1. ภาษาที่เลือก (th/en/zh)
2. ภาษาไทย (ภาษาหลัก)
3. ภาษาอังกฤษ
4. ภาษาจีน
5. ค่า fallback จากฟิลด์ `name` หรือ `description`

---

## 🚀 วิธีใช้งาน

### ขั้นตอนที่ 1: เตรียมไฟล์ Excel

ใช้ไฟล์ตัวอย่าง: `scripts/products-template-3lang.csv`

**ตัวอย่างข้อมูล:**
```csv
SKU,Product Name (TH),Product Name (EN),Product Name (CN),Description (TH),Description (EN),Description (CN),Price,Stock
IPHONE-15,iPhone 15 128GB,iPhone 15 128GB,iPhone 15 128GB,"ไอโฟน 15 พร้อม Dynamic Island","iPhone 15 with Dynamic Island","配备灵动岛的iPhone 15",32900,100
MACBOOK-M3,MacBook Pro M3,MacBook Pro M3,MacBook Pro M3,"แมคบุ๊คโปรชิป M3","MacBook Pro with M3 chip","配备M3芯片的MacBook Pro",89900,30
```

### ขั้นตอนที่ 2: Import ข้อมูล

```bash
# ทดสอบก่อน (Dry run)
pnpm run import:products:dry -- --file products.xlsx

# Import จริง
pnpm run import:products -- --file products.xlsx

# กำหนด batch size (ถ้าข้อมูลเยอะ)
pnpm run import:products -- --file products.xlsx --batch-size 50
```

### ขั้นตอนที่ 3: ตรวจสอบในAdmin Panel

1. เข้า `http://localhost:3000/admin`
2. ไปที่ `Collections > Products`
3. คลิกสินค้าที่ import มา
4. จะเห็นฟิลด์:
   - **ชื่อสินค้า (Product Name)** - แสดง 3 ช่อง: ไทย, อังกฤษ, จีน
   - **คำอธิบายสินค้า (Description)** - แสดง 3 ช่อง: ไทย, อังกฤษ, จีน

### ขั้นตอนที่ 4: แก้ไข/เพิ่มคำแปล

คุณสามารถเพิ่มหรือแก้ไขคำแปลได้โดยตรงใน Admin Panel:
1. เปิดสินค้าที่ต้องการแก้ไข
2. เลื่อนไปที่ "ชื่อสินค้า (Product Name)"
3. กรอกข้อความในช่องภาษาที่ต้องการ
4. กด Save

---

## 📱 การแสดงผลบน Frontend

### หน้า Products (`/[lang]/products`)
ระบบจะดึงชื่อและคำอธิบายตามภาษาอัตโนมัติ:
- Thai: `/th/products` - แสดงชื่อและคำอธิบายภาษาไทย
- English: `/en/products` - แสดงชื่อและคำอธิบายภาษาอังกฤษ
- Chinese: `/cn/products` - แสดงชื่อและคำอธิบายภาษาจีน

### หน้า Cart (`/[lang]/cart`)
รถเข็นจะแสดงชื่อสินค้าตามภาษาที่เลือก

---

## 🎨 ตัวอย่างหน้าจอ Admin Panel

```
┌─────────────────────────────────────────────────┐
│ ชื่อสินค้า (Product Name) *                     │
├─────────────────────────────────────────────────┤
│ ไทย (Thai) *                                    │
│ [iPhone 15 Pro Max 256GB                   ]    │
├─────────────────────────────────────────────────┤
│ English                                         │
│ [iPhone 15 Pro Max 256GB                   ]    │
├─────────────────────────────────────────────────┤
│ 中文 (Chinese)                                  │
│ [iPhone 15 Pro Max 256GB                   ]    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ คำอธิบายสินค้า (Description)                    │
├─────────────────────────────────────────────────┤
│ ไทย (Thai)                                      │
│ [ไอโฟนที่ทรงพลังที่สุด พร้อมชิป A17 Pro    ]   │
│ [ดีไซน์ไทเทเนียม และระบบกล้องขั้นสูง       ]   │
├─────────────────────────────────────────────────┤
│ English                                         │
│ [The most powerful iPhone ever with A17    ]   │
│ [Pro chip, titanium design, and advanced   ]   │
│ [camera system.                            ]   │
├─────────────────────────────────────────────────┤
│ 中文 (Chinese)                                  │
│ [最强大的iPhone配备A17 Pro芯片、钛金属     ]   │
│ [设计和先进相机系统                        ]   │
└─────────────────────────────────────────────────┘
```

---

## 📊 Excel Template Columns (สรุป)

| Column Name | Required | Example | Description |
|-------------|----------|---------|-------------|
| SKU | ✅ | `IPHONE-15PM` | รหัสสินค้า (ห้ามซ้ำ) |
| Product Name (TH) | ✅ | `iPhone 15 Pro Max 256GB` | ชื่อสินค้าภาษาไทย |
| Product Name (EN) | | `iPhone 15 Pro Max 256GB` | ชื่อสินค้าภาษาอังกฤษ |
| Product Name (CN) | | `iPhone 15 Pro Max 256GB` | ชื่อสินค้าภาษาจีน |
| Description (TH) | | `ไอโฟนที่ทรงพลังที่สุด...` | คำอธิบายภาษาไทย |
| Description (EN) | | `The most powerful iPhone...` | คำอธิบายภาษาอังกฤษ |
| Description (CN) | | `最强大的iPhone...` | คำอธิบายภาษาจีน |
| Price | ✅ | `45900` | ราคาปกติ (บาท) |
| Compare At Price | | `49900` | ราคาก่อนลด |
| Stock | ✅ | `50` | จำนวนคงเหลือ |
| Category | | `Smartphones` | หมวดหมู่ |
| Status | | `active` | สถานะ |
| Featured | | `yes` | สินค้าเด่น |
| Image URLs | | `https://...` | URLs รูปภาพ |

---

## ⚙️ Configuration

แก้ไขค่า config ใน `scripts/import-products.js`:

```javascript
const CONFIG = {
  batchSize: 50,              // จำนวนสินค้าต่อ batch
  batchDelay: 1000,           // หน่วงเวลาระหว่าง batch (ms)
  imagePath: './product-images', // folder รูปภาพ
}
```

---

## 🔧 Troubleshooting

### ปัญหา: ชื่อสินค้าแสดงภาษาผิด
**วิธีแก้:**
1. ตรวจสอบว่า Excel มีคอลัมน์ `Product Name (TH)`, `Product Name (EN)`, `Product Name (CN)`
2. Import ใหม่ด้วย `pnpm run import:products -- --file products.xlsx`

### ปัญหา: ไม่มีภาษาจีน
**วิธีแก้:**
1. เข้า Admin Panel > เลือกสินค้า
2. กรอกข้อความในช่อง "中文 (Chinese)"
3. กด Save

### ปัญหา: คำแปลไม่แสดง
**วิธีแก้:**
1. ตรวจสอบว่า URL มี lang parameter: `/th/products`, `/en/products`, `/cn/products`
2. Refresh cache: `pnpm run build`

---

## 📚 ไฟล์ที่เกี่ยวข้อง

- `scripts/import-products.js` - Script นำเข้าสินค้า
- `scripts/products-template-3lang.csv` - Template Excel 3 ภาษา
- `src/collections/Products/index.ts` - Products Collection
- `src/fields/multilangText3.ts` - Multilang Text Field (3 ภาษา)
- `src/fields/multilangTextarea3.ts` - Multilang Textarea Field (3 ภาษา)
- `src/utilities/getTranslatedText.ts` - Helper function แปลภาษา
- `src/app/[lang]/products/page.tsx` - หน้าแสดงสินค้า
- `src/app/[lang]/cart/page.tsx` - หน้ารถเข็น

---

## 🎉 สรุป

ระบบนี้ใช้แนวทาง **Custom Multilang Fields** ของ Payload CMS:
- ✅ แสดงทุกภาษาในหน้าเดียว (Admin Panel)
- ✅ ใช้ภาษาไทยเป็นหลัก
- ✅ Admin กรอกแปลเองได้
- ✅ Fallback อัตโนมัติถ้าไม่มีภาษาที่เลือก
- ✅ รองรับ Excel import พร้อมหลายภาษา
- ✅ Frontend แสดงภาษาตาม URL parameter
