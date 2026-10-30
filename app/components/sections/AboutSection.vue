<script setup lang="ts">
import type { About } from '#shared/types/portfolio'

defineProps<{ about: About }>()
const { t } = useI18n()
</script>

<template>
  <section id="about" class="section container-page" aria-labelledby="about-title">
    <SectionHeader title-id="about-title" :eyebrow="t('sections.about.eyebrow')" :title="t('sections.about.title')" />

    <div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
      <div v-reveal class="grid content-start gap-5 text-[1.0625rem] text-fg/90">
        <p v-for="paragraph in about.paragraphs" :key="paragraph.text">{{ paragraph.text }}</p>
      </div>

      <div v-reveal="120" class="grid content-start gap-4">
        <article class="card p-5">
          <h3 class="about-heading"><AppIcon name="graduation" :size="18" />{{ t('about.education') }}</h3>
          <p class="mt-3 font-medium">{{ about.education.school }} – {{ about.education.schoolFull }}</p>
          <p class="mt-1 text-sm text-fg/85">{{ about.education.degree }}, {{ about.education.field }}</p>
          <p class="mt-1 font-mono text-xs text-muted">
            {{ about.education.location }} · {{ about.education.start }} – {{ about.education.end }}
          </p>
        </article>

        <article class="card p-5">
          <h3 class="about-heading"><AppIcon name="award" :size="18" />{{ t('about.certification') }}</h3>
          <p class="mt-3 font-medium">{{ about.certification.name }}</p>
          <a
            v-if="about.certification.href"
            :href="about.certification.href"
            class="link mt-1 inline-flex items-center gap-1.5 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('about.verify') }}
            <AppIcon name="external" :size="14" />
            <span class="sr-only">{{ t('a11y.new_tab') }}</span>
          </a>
        </article>

        <article class="card p-5">
          <h3 class="about-heading"><AppIcon name="globe" :size="18" />{{ t('about.languages') }}</h3>
          <ul class="mt-3 grid gap-1.5">
            <li v-for="language in about.languages.items" :key="language.name" class="flex justify-between gap-4">
              <span>{{ language.name }}</span>
              <span class="font-mono text-sm text-muted">{{ language.level }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
}
</style>
