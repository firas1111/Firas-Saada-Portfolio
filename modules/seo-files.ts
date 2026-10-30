import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineNuxtModule, useLogger } from 'nuxt/kit'

/**
 * Writes robots.txt and sitemap.xml into the build output with the absolute
 * site URL. Runs at build time only: the deployed site stays fully static.
 */
export default defineNuxtModule({
  meta: { name: 'seo-files' },
  setup(_options, nuxt) {
    const logger = useLogger('seo-files')

    nuxt.hook('nitro:build:public-assets', async (nitro) => {
      const siteUrl = String(nuxt.options.runtimeConfig.public.siteUrl)
      if (siteUrl.includes('localhost')) {
        logger.warn(`Site URL is ${siteUrl}. Set NUXT_PUBLIC_SITE_URL before deploying so the sitemap, canonical and Open Graph URLs are right.`)
      }

      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        `  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`,
        '</urlset>',
        '',
      ].join('\n')

      const publicDir = nitro.options.output.publicDir
      await writeFile(join(publicDir, 'robots.txt'), robots)
      await writeFile(join(publicDir, 'sitemap.xml'), sitemap)
    })
  },
})
