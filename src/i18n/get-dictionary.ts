import type { Locale } from './config'

const dictionaries = {
  'en-US': () => import('./dictionaries/en-US.json').then(module => module.default),
  'zh': () => import('./dictionaries/zh.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
