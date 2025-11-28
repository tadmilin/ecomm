// Helper function สำหรับดึงข้อความตามภาษา
export function getTranslatedText(
  multilangField: { th?: string; en?: string; zh?: string } | null | undefined,
  lang: string,
  fallback: string = '',
): string {
  // ถ้าไม่มี multilang field ให้ใช้ fallback
  if (!multilangField) return fallback

  // แปลง lang code ให้ตรงกับที่เก็บ
  const langCode = lang === 'cn' ? 'zh' : lang

  // ลองใช้ภาษาที่ต้องการก่อน
  if (multilangField[langCode as keyof typeof multilangField]) {
    return multilangField[langCode as keyof typeof multilangField] || fallback
  }

  // fallback order: th -> en -> zh -> fallback string
  return multilangField.th || multilangField.en || multilangField.zh || fallback
}

// Type สำหรับ Multilang field
export type MultilangField = {
  th?: string
  en?: string
  zh?: string
}
