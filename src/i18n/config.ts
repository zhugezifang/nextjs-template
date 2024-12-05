export const defaultLocale = 'zh'
export const locales = ['zh'/*, 'en-US'*/] as const
export type Locale = typeof locales[number]

export const localeNames: Record<Locale, string> = {
  'zh': '简体中文'
  //,'en-US': 'English'
} 