<script setup lang="ts">
import type { Work } from '#shared/types/portfolio'

defineProps<{ work: Work }>()
const { t } = useI18n()
</script>

<template>
  <section id="work" class="section container-page" aria-labelledby="work-title">
    <SectionHeader title-id="work-title" :eyebrow="t('sections.work.eyebrow')" :title="t('sections.work.title')">
      <p class="section-intro">{{ work.intro.text }}</p>
    </SectionHeader>

    <div class="mt-10 grid gap-6">
      <IntegrationCard
        v-for="integration in work.integrations"
        :key="integration.id"
        v-reveal
        :integration="integration"
      />
    </div>
  </section>
</template>
