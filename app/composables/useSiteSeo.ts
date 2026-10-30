import type { Portfolio } from '#shared/types/portfolio'

/** Title, description, canonical URL, Open Graph / Twitter cards and JSON-LD. */
export function useSiteSeo(portfolio: Ref<Portfolio>) {
  const { siteUrl } = useRuntimeConfig().public
  const localeHead = useLocaleHead()
  const url = `${siteUrl}/`
  const image = `${siteUrl}/og.png`

  const title = () => portfolio.value.seo.title
  const description = () => portfolio.value.seo.description
  const imageAlt = () => `${portfolio.value.person.name}, ${portfolio.value.hero.role.text}`

  useHead({
    htmlAttrs: { lang: () => localeHead.value.htmlAttrs.lang },
    link: [{ rel: 'canonical', href: url }],
    script: [{
      key: 'person-json-ld',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(personJsonLd(portfolio.value, siteUrl)),
    }],
  })

  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogUrl: url,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: imageAlt,
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
  })
}
