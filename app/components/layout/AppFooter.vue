<script setup lang="ts">
defineProps<{ name: string }>()
const { t } = useI18n()
const { sourceUrl } = useRuntimeConfig().public
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row">
      <p class="text-center sm:text-left">
        © {{ year }} {{ name }} · {{ t('footer.built') }}<template v-if="sourceUrl">
          (<a :href="sourceUrl" class="link" target="_blank" rel="noopener noreferrer">{{ t('footer.source') }}<span class="sr-only"> {{ t('a11y.new_tab') }}</span></a>)</template>
      </p>
      <a href="#top" class="inline-flex items-center gap-2 transition-colors hover:text-fg">
        {{ t('footer.top') }}
        <AppIcon name="arrow-up" :size="16" />
      </a>
    </div>
  </footer>
</template>
