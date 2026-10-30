<script setup lang="ts">
import type { SkillGroup } from '#shared/types/portfolio'

defineProps<{ skills: SkillGroup[] }>()
const { t } = useI18n()
</script>

<template>
  <section id="skills" class="section container-page" aria-labelledby="skills-title">
    <SectionHeader title-id="skills-title" :eyebrow="t('sections.skills.eyebrow')" :title="t('sections.skills.title')" />

    <div v-reveal class="card mt-10 divide-y divide-line">
      <div
        v-for="group in skills"
        :key="group.id"
        class="grid gap-3 px-5 py-5 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-baseline sm:px-8"
      >
        <h3 class="font-mono text-xs font-medium tracking-[0.08em] text-muted uppercase">{{ group.label }}</h3>
        <ul class="flex flex-wrap gap-2">
          <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chip {
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgb(148 163 184 / 0.05);
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>
