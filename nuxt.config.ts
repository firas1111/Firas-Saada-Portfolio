import tailwindcss from '@tailwindcss/vite'

// Absolute site URL for canonical, Open Graph, JSON-LD and the sitemap.
// Set NUXT_PUBLIC_SITE_URL once the domain is known; on Vercel the production
// domain is picked up automatically.
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || 'http://localhost:3000'
).replace(/\/+$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxtjs/i18n', './modules/seo-files'],

  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      siteUrl,
      // Link to the public repository in the footer once it exists.
      sourceUrl: process.env.NUXT_PUBLIC_SOURCE_URL ?? '',
    },
  },

  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#070b16' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '128x128' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // Self-hosted at build time (no request to Google Fonts at runtime), as
  // variable fonts: one file per family instead of one per weight.
  fonts: {
    defaults: { subsets: ['latin', 'latin-ext'] },
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: ['500 700'], preload: { subsets: ['latin'] } },
      { name: 'Inter', provider: 'google', weights: ['400 600'], preload: { subsets: ['latin'] } },
      { name: 'JetBrains Mono', provider: 'google', weights: ['400 500'] },
    ],
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    baseUrl: siteUrl,
    locales: [{ code: 'en', language: 'en', name: 'English', file: 'en.json' }],
  },

  typescript: {
    strict: true,
    // Type-check the Node scripts (source check, image rendering) too.
    nodeTsConfig: { include: ['../scripts/**/*'] },
  },
})
