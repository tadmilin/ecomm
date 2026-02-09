import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { createMultilangText3 } from '@/fields/multilangText3'
import { createMultilangTextarea3 } from '@/fields/multilangTextarea3'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'sku', 'price', 'stock', 'status', 'updatedAt'],
    useAsTitle: 'name',
    group: 'E-commerce',
  },
  fields: [
    // Multilang fields (ไทย, อังกฤษ, จีน)
    createMultilangText3({
      name: 'multilangName',
      label: 'ชื่อสินค้า (Product Name)',
      required: true,
      admin: {
        description: 'ชื่อสินค้าในภาษาไทย, อังกฤษ, และจีน',
      },
      maxLength: 200,
    }),
    createMultilangTextarea3({
      name: 'multilangDescription',
      label: 'คำอธิบายสินค้า (Description)',
      required: false,
      admin: {
        description: 'คำอธิบายสินค้าในภาษาไทย, อังกฤษ, และจีน',
      },
      rows: 8,
    }),

    // Original fields (สำหรับ fallback และ Excel import)
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name (Default)',
      admin: {
        description: 'ชื่อสินค้าหลัก (จะใช้เป็น fallback ถ้าไม่มีภาษาที่เลือก)',
      },
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      label: 'SKU',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (Default)',
      admin: {
        description: 'คำอธิบายหลัก (fallback)',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: false,
      min: 0,
      label: 'Price (THB)',
      admin: {
        description: 'ราคาสินค้า (ถ้าไม่กรอกจะแสดง "ราคาพิเศษ" บนหน้าเว็บ)',
      },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      min: 0,
      label: 'Compare at Price',
    },
    {
      name: 'cost',
      type: 'number',
      min: 0,
      label: 'Cost per Item',
    },
    {
      name: 'stock',
      type: 'number',
      required: false,
      min: 0,
      defaultValue: 888,
      label: 'Stock Quantity',
      admin: {
        description: 'จำนวนสต๊อก (ถ้าไม่กรอกจะใช้ค่าเริ่มต้น 888)',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product Images',
      maxRows: 10,
      admin: {
        description: 'รูปสินค้า (ใช้ product-media: 2 ขนาดเท่านั้น - ประหยัด storage)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'product-media', // เปลี่ยนจาก 'media' → 'product-media'
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categories',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight (kg)',
    },
    {
      name: 'dimensions',
      type: 'group',
      label: 'Dimensions',
      fields: [
        {
          name: 'length',
          type: 'number',
          label: 'Length (cm)',
        },
        {
          name: 'width',
          type: 'number',
          label: 'Width (cm)',
        },
        {
          name: 'height',
          type: 'number',
          label: 'Height (cm)',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Out of Stock',
          value: 'out_of_stock',
        },
        {
          label: 'Discontinued',
          value: 'discontinued',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Product',
      defaultValue: false,
      admin: {
        description: 'แสดงในหน้าแรกหรือหน้า featured products',
      },
    },
    {
      name: 'isNew',
      type: 'checkbox',
      label: 'New Product',
      defaultValue: false,
      admin: {
        description: 'สินค้าใหม่ จะแสดงป้าย NEW',
      },
    },
    {
      name: 'brand',
      type: 'text',
      label: 'Brand',
      admin: {
        description: 'ยี่ห้อสินค้า เช่น MAZUMA, TCL, SAMSUNG',
      },
    },
    {
      name: 'discount',
      type: 'number',
      label: 'Discount Percentage',
      min: 0,
      max: 100,
      admin: {
        description: 'เปอร์เซ็นต์ส่วนลด (0-100) สำหรับแสดงป้าย -XX%',
      },
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Product Badges',
      maxRows: 5,
      admin: {
        description: 'ป้ายพิเศษ เช่น Wi-Fi, ELCB, รับประกัน 5 ปี',
      },
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'productCode',
      type: 'text',
      label: 'Product Code',
      admin: {
        description: 'รหัสสินค้าสำหรับแสดงลูกค้า (ต่างจาก SKU)',
      },
    },

    // Product Variants (ตัวเลือกย่อย)
    {
      name: 'hasVariants',
      type: 'checkbox',
      label: 'มีตัวเลือกสินค้า (Has Variants)',
      defaultValue: false,
      admin: {
        description: 'เปิดใช้งานถ้าสินค้ามีหลายตัวเลือก เช่น ขนาด สี',
      },
    },
    {
      name: 'variants',
      type: 'array',
      label: 'ตัวเลือกสินค้า (Product Variants)',
      admin: {
        condition: (data) => data.hasVariants === true,
        description: 'กำหนดตัวเลือกต่างๆ เช่น ขนาด S, M, L หรือสีแดง, น้ำเงิน',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'ชื่อตัวเลือก',
          admin: {
            description: 'เช่น "ขนาด M", "สีแดง", "แพ็ค 5 ชิ้น"',
          },
        },
        {
          name: 'sku',
          type: 'text',
          label: 'SKU ของตัวเลือกนี้',
          admin: {
            description: 'รหัสสินค้าเฉพาะตัวเลือกนี้ (ถ้าไม่ระบุจะใช้ SKU หลัก)',
          },
        },
        {
          name: 'price',
          type: 'number',
          label: 'ราคา (THB)',
          admin: {
            description: 'ถ้าไม่ระบุจะใช้ราคาหลักของสินค้า',
          },
        },
        {
          name: 'compareAtPrice',
          type: 'number',
          label: 'ราคาก่อนลด',
          admin: {
            description: 'สำหรับแสดงราคาเปรียบเทียบ (ขีดฆ่า)',
          },
        },
        {
          name: 'discountPrice',
          type: 'number',
          label: 'ราคาพิเศษ/ลดราคา',
          admin: {
            description: 'ราคาหลังลดพิเศษ (ถ้ามี)',
          },
        },
        {
          name: 'stock',
          type: 'number',
          defaultValue: 0,
          label: 'จำนวนคงคลัง',
          admin: {
            description: 'จำนวนสต๊อกของตัวเลือกนี้',
          },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          label: 'สถานะ',
          options: [
            {
              label: 'Active (ขายได้)',
              value: 'active',
            },
            {
              label: 'Out of Stock (หมด)',
              value: 'out_of_stock',
            },
            {
              label: 'Discontinued (ยกเลิก)',
              value: 'discontinued',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'product-media', // เปลี่ยนจาก media
          label: 'รูปภาพตัวเลือก',
          admin: {
            description: 'รูปสำหรับตัวเลือกนี้ (เช่น รูปสินค้าสีแดง) - ใช้ product-media',
          },
        },
        {
          name: 'weight',
          type: 'number',
          label: 'น้ำหนัก (kg)',
        },
        {
          name: 'options',
          type: 'group',
          label: 'คุณสมบัติตัวเลือก',
          fields: [
            {
              name: 'size',
              type: 'text',
              label: 'ขนาด (Size)',
              admin: {
                description: 'เช่น S, M, L, XL',
              },
            },
            {
              name: 'color',
              type: 'text',
              label: 'สี (Color)',
              admin: {
                description: 'เช่น แดง, น้ำเงิน, ขาว',
              },
            },
            {
              name: 'material',
              type: 'text',
              label: 'วัสดุ (Material)',
              admin: {
                description: 'เช่น ฝ้าย, โพลีเอสเตอร์',
              },
            },
            {
              name: 'type',
              type: 'text',
              label: 'ประเภท (Type)',
              admin: {
                description: 'เช่น แพ็คเดี่ยว, แพ็คคู่',
              },
            },
          ],
        },
      ],
    },

    {
      name: 'externalId',
      type: 'text',
      label: 'External ID',
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        }
        return data
      },
    ],
  },
}
