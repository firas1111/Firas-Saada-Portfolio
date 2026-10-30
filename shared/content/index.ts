import type { Portfolio } from '../types/portfolio'
import en from './en'

/**
 * Content per locale. To add a language, add its file next to en.ts, register
 * it here and in the `i18n.locales` list of nuxt.config.ts.
 */
export const content: { en: Portfolio } & Record<string, Portfolio | undefined> = { en }
