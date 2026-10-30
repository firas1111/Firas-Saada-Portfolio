import { content } from '#shared/content'
import type { Portfolio } from '#shared/types/portfolio'

/** Content for the current locale, falling back to English. */
export function usePortfolio() {
  const { locale } = useI18n()
  return computed<Portfolio>(() => content[locale.value] ?? content.en)
}
