# การแก้ไขปัญหา Language API

## ปัญหาที่พบ
```
Error creating language: SyntaxError: No number after minus sign in JSON at position 1 (line 1 column 2)
```

## สาเหตุของปัญหา
1. **Syntax Error ใน Collection Config**: มี syntax error ในไฟล์ `src/collections/Languages/index.ts`
   - ขาด comma หลัง `required: true` ใน field `code`
   - Indentation ที่ผิดปกติใน field `currency`

2. **JSON Parsing Error**: เมื่อ admin panel พยายามสร้างภาษาใหม่ ข้อมูลที่ส่งไปมี format ที่ไม่ถูกต้อง

## การแก้ไข

### 1. แก้ไข Syntax Error ใน Collection Config
```typescript
// แก้ไขจาก
{
  name: 'code',
  type: 'text',
  required: true  // ขาด comma
  unique: true,
  // ...
}

// เป็น
{
  name: 'code',
  type: 'text',
  required: true,  // เพิ่ม comma
  unique: true,
  // ...
}
```

### 2. แก้ไข Indentation ใน Field Currency
```typescript
// แก้ไขจาก
            {
          name: 'currency',
          type: 'select',
          label: 'สกุลเงินหลัก',
                options: [
        // ... indentation ผิดปกติ
      ],
      // ...
        },

// เป็น
    {
      name: 'currency',
      type: 'select',
      label: 'สกุลเงินหลัก',
      options: [
        // ... indentation ที่ถูกต้อง
      ],
      // ...
    },
```

### 3. เพิ่ม Error Handling ใน API Routes
- เพิ่ม JSON parsing validation
- เพิ่ม request body validation
- เพิ่ม detailed error messages

## ไฟล์ที่แก้ไข
1. `src/collections/Languages/index.ts` - แก้ไข syntax errors
2. `src/app/api/languages/route.ts` - เพิ่ม error handling
3. `src/app/api/translations/route.ts` - เพิ่ม error handling

## การทดสอบ
1. รัน `npx tsc --noEmit --project .` เพื่อตรวจสอบ TypeScript compilation
2. รัน `npm run dev` เพื่อเริ่ม development server
3. ทดสอบสร้างภาษาใหม่ผ่าน admin panel
4. ใช้ไฟล์ `test-language-api.js` เพื่อทดสอบ API โดยตรง

## ผลลัพธ์
- ✅ TypeScript compilation ผ่าน
- ✅ Syntax errors ได้รับการแก้ไข
- ✅ API routes มี error handling ที่ดีขึ้น
- ✅ Admin panel สามารถสร้างภาษาใหม่ได้

## หมายเหตุ
- ปัญหานี้เกิดจาก syntax errors ใน collection configuration
- การแก้ไข syntax errors จะทำให้ admin panel ทำงานได้ปกติ
- Error handling ที่เพิ่มเข้าไปจะช่วยในการ debug ปัญหาในอนาคต

