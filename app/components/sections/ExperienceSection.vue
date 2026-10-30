<script setup lang="ts">
import type { Experience } from '#shared/types/portfolio'

defineProps<{ experience: Experience[] }>()
const { t, locale } = useI18n()
</script>

<template>
  <section id="experience" class="section container-page" aria-labelledby="experience-title">
    <SectionHeader
      title-id="experience-title"
      :eyebrow="t('sections.experience.eyebrow')"
      :title="t('sections.experience.title')"
    />

    <ol class="timeline mt-10">
      <li v-for="(job, index) in experience" :key="job.id" v-reveal class="timeline-item">
        <span class="timeline-dot" :class="{ 'is-current': index === 0 }" aria-hidden="true" />
        <article class="card p-5 sm:p-7">
          <header class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 class="text-lg font-semibold sm:text-xl">{{ job.role }}</h3>
            <p class="shrink-0 font-mono text-xs text-muted">
              {{ formatPeriod(job.start, job.end, locale, t('experience.present')) }}
            </p>
          </header>
          <p class="mt-1 text-[0.9375rem]">
            <span class="font-medium text-cyan">{{ job.company }}</span>
            <span v-if="job.product" class="text-muted"> · {{ job.product }}</span>
          </p>
          <p class="mt-1 text-sm text-muted">{{ job.location }}</p>

          <ul class="bullets mt-4">
            <li v-for="bullet in job.bullets" :key="bullet.text">{{ bullet.text }}</li>
          </ul>

          <p v-if="job.note" class="mt-4 text-sm">
            <a :href="job.note.href" class="link">{{ job.note.text }}</a>
          </p>
        </article>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  display: grid;
  gap: 20px;
  padding-left: 26px;
}

@media (min-width: 640px) {
  .timeline { padding-left: 34px; }
  .timeline-dot { left: -34px; }
}

.timeline::before {
  content: "";
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 7px;
  width: 1px;
  background: linear-gradient(var(--blue), var(--border) 55%);
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  top: 28px;
  left: -26px;
  width: 15px;
  height: 15px;
  border: 2px solid var(--blue);
  border-radius: 50%;
  background: var(--bg);
}

.timeline-dot.is-current {
  border-color: var(--cyan);
  background: var(--cyan);
  box-shadow: 0 0 0 5px rgb(34 211 238 / 0.15);
}

.bullets {
  display: grid;
  gap: 8px;
  max-width: 82ch;
  font-size: 0.9375rem;
  color: rgb(230 237 247 / 0.9);
}

.bullets li {
  position: relative;
  padding-left: 20px;
}

.bullets li::before {
  content: "";
  position: absolute;
  top: 0.8em;
  left: 2px;
  width: 9px;
  height: 1px;
  background: var(--blue);
}
</style>
