/** "2025-04" → "Apr 2025" (or "Apr" when the year is shown elsewhere). */
export function formatMonth(value: string, locale: string, withYear = true): string {
  const [year = 1970, month = 1] = value.split('-').map(Number)
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: withYear ? 'numeric' : undefined,
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1)))
}

/** "Apr 2025 – present", or "Jun – Dec 2024" when both ends share a year. */
export function formatPeriod(start: string, end: string, locale: string, presentLabel: string): string {
  if (end === 'present') return `${formatMonth(start, locale)} – ${presentLabel}`
  const sameYear = start.slice(0, 4) === end.slice(0, 4)
  return `${formatMonth(start, locale, !sameYear)} – ${formatMonth(end, locale)}`
}
