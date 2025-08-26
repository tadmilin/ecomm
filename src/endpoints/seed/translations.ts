import type { Payload } from 'payload'

// Translation constants for consistency
const TRANSLATION_KEYS = {
  COMMON: {
    SAVE: 'save',
    CANCEL: 'cancel',
    DELETE: 'delete',
    EDIT: 'edit',
    CREATE: 'create',
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success',
  },
  PRODUCTS: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    PRICE: 'price',
    STOCK: 'stock',
    ADD_TO_CART: 'add_to_cart',
    BUY_NOW: 'buy_now',
  },
  ORDERS: {
    ORDER: 'order',
    ORDER_NUMBER: 'order_number',
    ORDER_STATUS: 'order_status',
    ORDER_DATE: 'order_date',
  },
  PAYMENTS: {
    PAYMENT: 'payment',
    PAYMENT_METHOD: 'payment_method',
    PAYMENT_STATUS: 'payment_status',
  },
  SHIPPING: {
    SHIPPING: 'shipping',
    SHIPPING_ADDRESS: 'shipping_address',
    SHIPPING_COST: 'shipping_cost',
  },
  USERS: {
    USER: 'user',
    PROFILE: 'profile',
    SETTINGS: 'settings',
  },
  STORES: {
    STORE: 'store',
    STORE_NAME: 'store_name',
    STORE_DESCRIPTION: 'store_description',
  },
  CATEGORIES: {
    CATEGORY: 'category',
    CATEGORY_NAME: 'category_name',
  },
  ERRORS: {
    NOT_FOUND: 'not_found',
    UNAUTHORIZED: 'unauthorized',
    SERVER_ERROR: 'server_error',
  },
  NOTIFICATIONS: {
    NOTIFICATION: 'notification',
    SUCCESS_MESSAGE: 'success_message',
    ERROR_MESSAGE: 'error_message',
  },
  MENU: {
    HOME: 'home',
    PRODUCTS: 'products',
    ABOUT: 'about',
    CONTACT: 'contact',
  },
  FORMS: {
    NAME: 'name',
    EMAIL: 'email',
    PHONE: 'phone',
    ADDRESS: 'address',
  },
  BUTTONS: {
    SUBMIT: 'submit',
    RESET: 'reset',
    BACK: 'back',
    NEXT: 'next',
  },
  MESSAGES: {
    WELCOME: 'welcome',
    THANK_YOU: 'thank_you',
    GOODBYE: 'goodbye',
  },
} as const

const NAMESPACES = {
  COMMON: 'common',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  PAYMENTS: 'payments',
  SHIPPING: 'shipping',
  USERS: 'users',
  STORES: 'stores',
  CATEGORIES: 'categories',
  ERRORS: 'errors',
  NOTIFICATIONS: 'notifications',
  MENU: 'menu',
  FORMS: 'forms',
  BUTTONS: 'buttons',
  MESSAGES: 'messages',
} as const

export const seedTranslations = async (payload: Payload, languages: any) => {
  console.log('📝 Seeding translations...')

  try {
    // ตรวจสอบว่ามีคำแปลอยู่แล้วหรือไม่
    const existingTranslations = await payload.find({
      collection: 'translations' as any,
      limit: 1,
    })

    if (existingTranslations.totalDocs > 0) {
      console.log('✅ Translations already exist, skipping...')
      return
    }

         const { thai, english, japanese } = languages

    // คำแปลพื้นฐาน - ภาษาไทย
    const thaiTranslations = [
      // ทั่วไป
      { key: 'save', namespace: 'common', value: 'บันทึก', language: thai.id },
      { key: 'cancel', namespace: 'common', value: 'ยกเลิก', language: thai.id },
      { key: 'delete', namespace: 'common', value: 'ลบ', language: thai.id },
      { key: 'edit', namespace: 'common', value: 'แก้ไข', language: thai.id },
      { key: 'create', namespace: 'common', value: 'สร้าง', language: thai.id },
      { key: 'loading', namespace: 'common', value: 'กำลังโหลด...', language: thai.id },
      { key: 'error', namespace: 'common', value: 'เกิดข้อผิดพลาด', language: thai.id },
      { key: 'success', namespace: 'common', value: 'สำเร็จ', language: thai.id },
      
      // สินค้า
      { key: 'title', namespace: 'products', value: 'ชื่อสินค้า', language: thai.id },
      { key: 'description', namespace: 'products', value: 'รายละเอียดสินค้า', language: thai.id },
      { key: 'price', namespace: 'products', value: 'ราคา', language: thai.id },
      { key: 'stock', namespace: 'products', value: 'จำนวนสินค้าคงเหลือ', language: thai.id },
      { key: 'add_to_cart', namespace: 'products', value: 'เพิ่มลงตะกร้า', language: thai.id },
      { key: 'buy_now', namespace: 'products', value: 'ซื้อเลย', language: thai.id },
      
      // การสั่งซื้อ
      { key: 'order', namespace: 'orders', value: 'คำสั่งซื้อ', language: thai.id },
      { key: 'order_number', namespace: 'orders', value: 'เลขที่คำสั่งซื้อ', language: thai.id },
      { key: 'order_status', namespace: 'orders', value: 'สถานะคำสั่งซื้อ', language: thai.id },
      { key: 'order_date', namespace: 'orders', value: 'วันที่สั่งซื้อ', language: thai.id },
      
      // การชำระเงิน
      { key: 'payment', namespace: 'payments', value: 'การชำระเงิน', language: thai.id },
      { key: 'payment_method', namespace: 'payments', value: 'วิธีการชำระเงิน', language: thai.id },
      { key: 'payment_status', namespace: 'payments', value: 'สถานะการชำระเงิน', language: thai.id },
      
      // การจัดส่ง
      { key: 'shipping', namespace: 'shipping', value: 'การจัดส่ง', language: thai.id },
      { key: 'shipping_address', namespace: 'shipping', value: 'ที่อยู่จัดส่ง', language: thai.id },
      { key: 'shipping_cost', namespace: 'shipping', value: 'ค่าจัดส่ง', language: thai.id },
      
      // ผู้ใช้
      { key: 'user', namespace: 'users', value: 'ผู้ใช้', language: thai.id },
      { key: 'profile', namespace: 'users', value: 'โปรไฟล์', language: thai.id },
      { key: 'settings', namespace: 'users', value: 'การตั้งค่า', language: thai.id },
      
      // ร้านค้า
      { key: 'store', namespace: 'stores', value: 'ร้านค้า', language: thai.id },
      { key: 'store_name', namespace: 'stores', value: 'ชื่อร้านค้า', language: thai.id },
      { key: 'store_description', namespace: 'stores', value: 'คำอธิบายร้านค้า', language: thai.id },
      
      // หมวดหมู่
      { key: 'category', namespace: 'categories', value: 'หมวดหมู่', language: thai.id },
      { key: 'category_name', namespace: 'categories', value: 'ชื่อหมวดหมู่', language: thai.id },
      
      // ข้อผิดพลาด
      { key: 'not_found', namespace: 'errors', value: 'ไม่พบข้อมูล', language: thai.id },
      { key: 'unauthorized', namespace: 'errors', value: 'ไม่มีสิทธิ์เข้าถึง', language: thai.id },
      { key: 'server_error', namespace: 'errors', value: 'ข้อผิดพลาดของเซิร์ฟเวอร์', language: thai.id },
      
      // การแจ้งเตือน
      { key: 'notification', namespace: 'notifications', value: 'การแจ้งเตือน', language: thai.id },
      { key: 'success_message', namespace: 'notifications', value: 'ดำเนินการสำเร็จ', language: thai.id },
      { key: 'error_message', namespace: 'notifications', value: 'เกิดข้อผิดพลาด', language: thai.id },
      
      // เมนู
      { key: 'home', namespace: 'menu', value: 'หน้าแรก', language: thai.id },
      { key: 'products', namespace: 'menu', value: 'สินค้า', language: thai.id },
      { key: 'about', namespace: 'menu', value: 'เกี่ยวกับเรา', language: thai.id },
      { key: 'contact', namespace: 'menu', value: 'ติดต่อเรา', language: thai.id },
      
      // ฟอร์ม
      { key: 'name', namespace: 'forms', value: 'ชื่อ', language: thai.id },
      { key: 'email', namespace: 'forms', value: 'อีเมล', language: thai.id },
      { key: 'phone', namespace: 'forms', value: 'เบอร์โทรศัพท์', language: thai.id },
      { key: 'address', namespace: 'forms', value: 'ที่อยู่', language: thai.id },
      
      // ปุ่ม
      { key: 'submit', namespace: 'buttons', value: 'ส่ง', language: thai.id },
      { key: 'reset', namespace: 'buttons', value: 'รีเซ็ต', language: thai.id },
      { key: 'back', namespace: 'buttons', value: 'กลับ', language: thai.id },
      { key: 'next', namespace: 'buttons', value: 'ถัดไป', language: thai.id },
      
      // ข้อความ
      { key: 'welcome', namespace: 'messages', value: 'ยินดีต้อนรับ', language: thai.id },
      { key: 'thank_you', namespace: 'messages', value: 'ขอบคุณ', language: thai.id },
      { key: 'goodbye', namespace: 'messages', value: 'ลาก่อน', language: thai.id },
    ]

    // คำแปลพื้นฐาน - ภาษาอังกฤษ
    const englishTranslations = [
      // ทั่วไป
      { key: 'save', namespace: 'common', value: 'Save', language: english.id },
      { key: 'cancel', namespace: 'common', value: 'Cancel', language: english.id },
      { key: 'delete', namespace: 'common', value: 'Delete', language: english.id },
      { key: 'edit', namespace: 'common', value: 'Edit', language: english.id },
      { key: 'create', namespace: 'common', value: 'Create', language: english.id },
      { key: 'loading', namespace: 'common', value: 'Loading...', language: english.id },
      { key: 'error', namespace: 'common', value: 'An error occurred', language: english.id },
      { key: 'success', namespace: 'common', value: 'Success', language: english.id },
      
      // สินค้า
      { key: 'title', namespace: 'products', value: 'Product Title', language: english.id },
      { key: 'description', namespace: 'products', value: 'Product Description', language: english.id },
      { key: 'price', namespace: 'products', value: 'Price', language: english.id },
      { key: 'stock', namespace: 'products', value: 'Stock', language: english.id },
      { key: 'add_to_cart', namespace: 'products', value: 'Add to Cart', language: english.id },
      { key: 'buy_now', namespace: 'products', value: 'Buy Now', language: english.id },
      
      // การสั่งซื้อ
      { key: 'order', namespace: 'orders', value: 'Order', language: english.id },
      { key: 'order_number', namespace: 'orders', value: 'Order Number', language: english.id },
      { key: 'order_status', namespace: 'orders', value: 'Order Status', language: english.id },
      { key: 'order_date', namespace: 'orders', value: 'Order Date', language: english.id },
      
      // การชำระเงิน
      { key: 'payment', namespace: 'payments', value: 'Payment', language: english.id },
      { key: 'payment_method', namespace: 'payments', value: 'Payment Method', language: english.id },
      { key: 'payment_status', namespace: 'payments', value: 'Payment Status', language: english.id },
      
      // การจัดส่ง
      { key: 'shipping', namespace: 'shipping', value: 'Shipping', language: english.id },
      { key: 'shipping_address', namespace: 'shipping', value: 'Shipping Address', language: english.id },
      { key: 'shipping_cost', namespace: 'shipping', value: 'Shipping Cost', language: english.id },
      
      // ผู้ใช้
      { key: 'user', namespace: 'users', value: 'User', language: english.id },
      { key: 'profile', namespace: 'users', value: 'Profile', language: english.id },
      { key: 'settings', namespace: 'users', value: 'Settings', language: english.id },
      
      // ร้านค้า
      { key: 'store', namespace: 'stores', value: 'Store', language: english.id },
      { key: 'store_name', namespace: 'stores', value: 'Store Name', language: english.id },
      { key: 'store_description', namespace: 'stores', value: 'Store Description', language: english.id },
      
      // หมวดหมู่
      { key: 'category', namespace: 'categories', value: 'Category', language: english.id },
      { key: 'category_name', namespace: 'categories', value: 'Category Name', language: english.id },
      
      // ข้อผิดพลาด
      { key: 'not_found', namespace: 'errors', value: 'Not Found', language: english.id },
      { key: 'unauthorized', namespace: 'errors', value: 'Unauthorized', language: english.id },
      { key: 'server_error', namespace: 'errors', value: 'Server Error', language: english.id },
      
      // การแจ้งเตือน
      { key: 'notification', namespace: 'notifications', value: 'Notification', language: english.id },
      { key: 'success_message', namespace: 'notifications', value: 'Operation Successful', language: english.id },
      { key: 'error_message', namespace: 'notifications', value: 'An Error Occurred', language: english.id },
      
      // เมนู
      { key: 'home', namespace: 'menu', value: 'Home', language: english.id },
      { key: 'products', namespace: 'menu', value: 'Products', language: english.id },
      { key: 'about', namespace: 'menu', value: 'About', language: english.id },
      { key: 'contact', namespace: 'menu', value: 'Contact', language: english.id },
      
      // ฟอร์ม
      { key: 'name', namespace: 'forms', value: 'Name', language: english.id },
      { key: 'email', namespace: 'forms', value: 'Email', language: english.id },
      { key: 'phone', namespace: 'forms', value: 'Phone', language: english.id },
      { key: 'address', namespace: 'forms', value: 'Address', language: english.id },
      
      // ปุ่ม
      { key: 'submit', namespace: 'buttons', value: 'Submit', language: english.id },
      { key: 'reset', namespace: 'buttons', value: 'Reset', language: english.id },
      { key: 'back', namespace: 'buttons', value: 'Back', language: english.id },
      { key: 'next', namespace: 'buttons', value: 'Next', language: english.id },
      
      // ข้อความ
      { key: 'welcome', namespace: 'messages', value: 'Welcome', language: english.id },
      { key: 'thank_you', namespace: 'messages', value: 'Thank You', language: english.id },
      { key: 'goodbye', namespace: 'messages', value: 'Goodbye', language: english.id },
    ]

         // คำแปลพื้นฐาน - ภาษาญี่ปุ่น
     const japaneseTranslations = [
       // ทั่วไป
       { key: 'save', namespace: 'common', value: '保存', language: japanese.id },
       { key: 'cancel', namespace: 'common', value: 'キャンセル', language: japanese.id },
       { key: 'delete', namespace: 'common', value: '削除', language: japanese.id },
       { key: 'edit', namespace: 'common', value: '編集', language: japanese.id },
       { key: 'create', namespace: 'common', value: '作成', language: japanese.id },
       { key: 'loading', namespace: 'common', value: '読み込み中...', language: japanese.id },
       { key: 'error', namespace: 'common', value: 'エラーが発生しました', language: japanese.id },
       { key: 'success', namespace: 'common', value: '成功', language: japanese.id },
      
             // สินค้า
       { key: 'title', namespace: 'products', value: '商品タイトル', language: japanese.id },
       { key: 'description', namespace: 'products', value: '商品説明', language: japanese.id },
       { key: 'price', namespace: 'products', value: '価格', language: japanese.id },
       { key: 'stock', namespace: 'products', value: '在庫', language: japanese.id },
       { key: 'add_to_cart', namespace: 'products', value: 'カートに追加', language: japanese.id },
       { key: 'buy_now', namespace: 'products', value: '今すぐ購入', language: japanese.id },
      
             // การสั่งซื้อ
       { key: 'order', namespace: 'orders', value: '注文', language: japanese.id },
       { key: 'order_number', namespace: 'orders', value: '注文番号', language: japanese.id },
       { key: 'order_status', namespace: 'orders', value: '注文状況', language: japanese.id },
       { key: 'order_date', namespace: 'orders', value: '注文日', language: japanese.id },
      
             // การชำระเงิน
       { key: 'payment', namespace: 'payments', value: '支払い', language: japanese.id },
       { key: 'payment_method', namespace: 'payments', value: '支払い方法', language: japanese.id },
       { key: 'payment_status', namespace: 'payments', value: '支払い状況', language: japanese.id },
      
             // การจัดส่ง
       { key: 'shipping', namespace: 'shipping', value: '配送', language: japanese.id },
       { key: 'shipping_address', namespace: 'shipping', value: '配送先住所', language: japanese.id },
       { key: 'shipping_cost', namespace: 'shipping', value: '配送料', language: japanese.id },
      
             // ผู้ใช้
       { key: 'user', namespace: 'users', value: 'ユーザー', language: japanese.id },
       { key: 'profile', namespace: 'users', value: 'プロフィール', language: japanese.id },
       { key: 'settings', namespace: 'users', value: '設定', language: japanese.id },
      
             // ร้านค้า
       { key: 'store', namespace: 'stores', value: '店舗', language: japanese.id },
       { key: 'store_name', namespace: 'stores', value: '店舗名', language: japanese.id },
       { key: 'store_description', namespace: 'stores', value: '店舗説明', language: japanese.id },
      
             // หมวดหมู่
       { key: 'category', namespace: 'categories', value: 'カテゴリー', language: japanese.id },
       { key: 'category_name', namespace: 'categories', value: 'カテゴリー名', language: japanese.id },
      
             // ข้อผิดพลาด
       { key: 'not_found', namespace: 'errors', value: '見つかりません', language: japanese.id },
       { key: 'unauthorized', namespace: 'errors', value: '認証が必要です', language: japanese.id },
       { key: 'server_error', namespace: 'errors', value: 'サーバーエラー', language: japanese.id },
      
             // การแจ้งเตือน
       { key: 'notification', namespace: 'notifications', value: '通知', language: japanese.id },
       { key: 'success_message', namespace: 'notifications', value: '操作が完了しました', language: japanese.id },
       { key: 'error_message', namespace: 'notifications', value: 'エラーが発生しました', language: japanese.id },
      
             // เมนู
       { key: 'home', namespace: 'menu', value: 'ホーム', language: japanese.id },
       { key: 'products', namespace: 'menu', value: '商品', language: japanese.id },
       { key: 'about', namespace: 'menu', value: '会社概要', language: japanese.id },
       { key: 'contact', namespace: 'menu', value: 'お問い合わせ', language: japanese.id },
      
             // ฟอร์ม
       { key: 'name', namespace: 'forms', value: '氏名', language: japanese.id },
       { key: 'email', namespace: 'forms', value: 'メールアドレス', language: japanese.id },
       { key: 'phone', namespace: 'forms', value: '電話番号', language: japanese.id },
       { key: 'address', namespace: 'forms', value: '住所', language: japanese.id },
      
             // ปุ่ม
       { key: 'submit', namespace: 'buttons', value: '送信', language: japanese.id },
       { key: 'reset', namespace: 'buttons', value: 'リセット', language: japanese.id },
       { key: 'back', namespace: 'buttons', value: '戻る', language: japanese.id },
       { key: 'next', namespace: 'buttons', value: '次へ', language: japanese.id },
      
             // ข้อความ
       { key: 'welcome', namespace: 'messages', value: 'ようこそ', language: japanese.id },
       { key: 'thank_you', namespace: 'messages', value: 'ありがとうございます', language: japanese.id },
       { key: 'goodbye', namespace: 'messages', value: 'さようなら', language: japanese.id },
    ]

         // รวมคำแปลทั้งหมด
     const allTranslations = [
       ...thaiTranslations,
       ...englishTranslations,
       ...japaneseTranslations,
     ]

    // สร้างคำแปลทั้งหมด
    const createdTranslations = []
    for (const translation of allTranslations) {
             const created = await payload.create({
         collection: 'translations' as any,
         data: {
           ...translation,
           isActive: true,
           autoTranslated: false,
           needsReview: false,
         },
       })
      createdTranslations.push(created)
    }

         console.log(`✅ Translations seeded successfully: ${createdTranslations.length} translations created`)
     console.log(`   - ภาษาไทย: ${thaiTranslations.length} คำ`)
     console.log(`   - ภาษาอังกฤษ: ${englishTranslations.length} คำ`)
     console.log(`   - ภาษาญี่ปุ่น: ${japaneseTranslations.length} คำ`)

    return createdTranslations

  } catch (error) {
    console.error('❌ Error seeding translations:', error)
    throw error
  }
}
