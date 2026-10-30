<script setup lang="ts">
const portfolio = usePortfolio()
const { t } = useI18n()

useSiteSeo(portfolio)
</script>

<template>
  <div class="relative isolate">
    <div class="page-glow" aria-hidden="true" />
    <a href="#main" class="skip-link">{{ t('a11y.skip') }}</a>
    <AppNav :email="portfolio.person.email" :hello="portfolio.hello" />
    <main id="main" tabindex="-1" class="outline-none">
      <NuxtPage />
    </main>
    <AppFooter :name="portfolio.person.name" />
  </div>
</template>
