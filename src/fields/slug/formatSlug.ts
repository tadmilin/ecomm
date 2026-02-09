import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string | undefined =>
  val
    ?.replace(/ /g, '-')
    .replace(/[^\u0E00-\u0E7F\w-]+/g, '') // รองรับภาษาไทย
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || data?.slug === undefined) {
      const fallbackData = data?.[fallback]

      if (typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
