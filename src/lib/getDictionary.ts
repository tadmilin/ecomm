import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  th: () => import('@/dictionaries/th.json').then((module) => module.default),
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  const lang = locale as keyof typeof dictionaries
  return dictionaries[lang]?.() ?? dictionaries.en()
}
