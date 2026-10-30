<script setup lang="ts">
import type { Hero, Person } from '#shared/types/portfolio'

const props = defineProps<{ hero: Hero, person: Person }>()
const { t } = useI18n()

// "Software Engineer, Backend & Integrations (Node.js / TypeScript)": the stack
// in parentheses wraps as one piece.
const role = computed(() => {
  const match = props.hero.role.text.match(/^(.*?)\s*(\([^)]*\))$/)
  return match ? { title: match[1], stack: match[2] } : { title: props.hero.role.text, stack: '' }
})
</script>

<template>
  <section id="top" class="container-page hero" aria-labelledby="hero-title">
    <div>
      <ul class="flex flex-wrap gap-2">
        <li v-for="pill in hero.pills" :key="pill.text">
          <PillBadge :tone="pill.tone" :dot="pill.dot">{{ pill.text }}</PillBadge>
        </li>
      </ul>

      <!-- Both names on one line of markup, so the heading reads "Firas Saada". -->
      <h1 id="hero-title" class="hero-name">
        <span class="block">{{ hero.name.first }}</span> <span class="block text-gradient">{{ hero.name.last }}</span>
      </h1>

      <p class="hero-role">
        {{ role.title }} <span v-if="role.stack" class="whitespace-nowrap text-muted">{{ role.stack }}</span>
      </p>
      <p class="hero-summary">{{ hero.summary.text }}</p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a href="#work" class="btn btn-primary">
          {{ t('hero.work') }}
          <AppIcon name="arrow-right" :size="18" />
        </a>
        <a :href="person.cv.href" :download="person.cv.fileName" class="btn btn-outline">
          <AppIcon name="download" :size="18" />
          {{ t('hero.cv') }}
        </a>
        <a :href="`mailto:${person.email}`" class="btn btn-text">
          <AppIcon name="mail" :size="18" />
          {{ t('hero.email') }}
        </a>
      </div>
    </div>

    <TerminalCard :lines="hero.terminal" />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  align-items: center;
  gap: 48px;
  padding-block: 48px 64px;
}

.hero-name {
  margin-top: 28px;
  font-size: clamp(3.5rem, 2.2rem + 6.5vw, 6.25rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.hero-role {
  margin-top: 24px;
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 1rem + 0.6vw, 1.375rem);
  font-weight: 500;
  line-height: 1.35;
}

.hero-summary {
  margin-top: 16px;
  max-width: 38rem;
  font-size: 1.0625rem;
  color: var(--muted);
}

@media (min-width: 1024px) {
  .hero {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 56px;
    padding-block: 96px 104px;
  }
}
</style>
