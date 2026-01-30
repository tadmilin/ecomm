

## วิธีเริ่มต้นใช้งาน (5 นาที)

### 1. Install xlsx package
```bash
npm install xlsx
```

### 2. ดู Excel Template ตัวอย่าง
เปิดไฟล์: `scripts/products-template.csv`

คุณจะเห็น format ดังนี้:
```csv
SKU,Product Name,Description,Price,Stock,Category,Image URLs
IPHONE-15PM,iPhone 15 Pro Max,...,45900,50,Smartphones,https://...
```

### 3. Prepare Excel ของคุณ

**Columns ที่ต้องมี:**
- `SKU` - รหัสสินค้า (ห้ามซ้ำ)
- `Product Name` - ชื่อสินค้า
- `Price` - ราคา (บาท)
- `Stock` - จำนวนคงเหลือ

**Columns เสริม:**
- `Description` - รายละเอียด
- `Category` - หมวดหมู่
- `Image URLs` - ลิงก์รูป คั่นด้วย `|`
- `Tags` - แท็ก คั่นด้วย `,`
- `Status` - `active`, `draft`, `out_of_stock`, `discontinued`

### 4. Optimize รูปภาพ (สำคัญ!)

**เป้าหมาย: 300 KB/รูป**

```bash
# วิธีที่ 1: ใช้ Sharp CLI
npm install -g sharp-cli
sharp-cli resize 800 800 --format webp --quality 85 --input ./images/*.jpg --output ./optimized/

# วิธีที่ 2: ใช้ online tools
# - TinyPNG.com
# - Squoosh.app
```

### 5. Test Import (ทดสอบก่อน)
```bash
npm run import:products:dry -- --file products.xlsx
```

คุณจะเห็น:
```
📊 Import Summary:
Total rows:      3000
Processed:       3000
Created:         3000
Errors:          0
⚠️  This was a dry run. No data was actually imported.
```

### 6. Import จริง
```bash
npm run import:products -- --file products.xlsx --batch-size 50
```

รอ ~60 นาที สำหรับ 3,000 สินค้า

### 7. เช็คผลลัพธ์

**Admin Panel:**
```
http://localhost:3000/admin/collections/products
```

**Frontend:**
```
http://localhost:3000/products
```

---

## 📝 คำสั่งที่มีประโยชน์

### Import Commands
```bash
# Dry run (ทดสอบ)
npm run import:products:dry -- --file products.xlsx

# Import จริง
npm run import:products -- --file products.xlsx

# Custom batch size
npm run import:products -- --file products.xlsx --batch-size 100

# Custom image folder
IMAGE_PATH=./my-images npm run import:products -- --file products.xlsx
```

### Development Commands
```bash
# Start dev server
npm run dev

# Generate types (after schema changes)
npm run generate:types

# Build for production
npm run build
```

---

## ⚠️ สิ่งที่ต้องระวัง

### ❌ อย่าทำ:
1. อัปโหลดรูปขนาด 2 MB (ต้อง optimize เป็น 300 KB)
2. มี SKU ซ้ำในไฟล์ Excel
3. ใส่ราคาเป็นตัวอักษร (ต้องเป็นตัวเลข)
4. Import โดยไม่ test ด้วย dry-run ก่อน

### ✅ ควรทำ:
1. Backup database ก่อน import ใหญ่
2. Test ด้วย 10-100 สินค้าก่อน
3. Optimize รูปทุกรูปก่อน upload
4. Monitor storage usage

---

## 📊 Storage Checklist

### Before Import:
- [ ] รูปภาพทุกรูป optimize แล้ว (~300 KB)
- [ ] Excel format ถูกต้อง
- [ ] SKU ไม่ซ้ำกัน
- [ ] Test dry-run ผ่าน

### After Import:
- [ ] Check MongoDB usage (ควร < 50 MB)
- [ ] Check Vercel Blob usage (ควร < 4 GB)
- [ ] Verify สินค้าใน Admin Panel
- [ ] Test frontend display

---

## 🆘 ปัญหาที่พบบ่อย

### "xlsx not found"
```bash
npm install xlsx
```

### "Image upload failed"
- ตรวจสอบ URL รูปภาพ accessible หรือไม่
- ตรวจสอบไฟล์รูปอยู่ใน `./product-images/` หรือไม่

### "SKU already exists"
- Script จะ update สินค้าเดิมอัตโนมัติ
- หรือใช้ SKU ใหม่ที่ไม่ซ้ำ

### Import ช้า
- ลด batch size: `--batch-size 25`
- เพิ่ม delay: `BATCH_DELAY=2000 npm run import:products -- --file products.xlsx`

---

## 📚 เอกสารเพิ่มเติม

- **คู่มือฉบับเต็ม (ไทย)**: `PRODUCT_IMPORT_README_TH.md`
- **Import Guide (English)**: `scripts/IMPORT_GUIDE.md`
- **Storage Planning**: `STORAGE_PLANNING.md`

---

## ✨ สรุป

1. ✅ Products Collection พร้อมใช้
2. ✅ Import script พร้อม
3. ✅ Template Excel มีให้
4. ✅ Storage planning ครบ
5. ⏳ รอคุณ prepare Excel + รูปภาพ
6. ⏳ รอคุณ run import

**เริ่มได้เลย! ใช้เวลาเพียง ~60 นาทีสำหรับ 3,000 สินค้า 🚀**
