<script setup lang="ts">
import type { KeyFact } from '#shared/types/portfolio'

defineProps<{ facts: KeyFact[] }>()
const { t } = useI18n()
</script>

<template>
  <section class="container-page" :aria-label="t('facts.label')">
    <ul class="facts">
      <li v-for="fact in facts" :key="fact.value" class="fact">
        <span class="fact-value">{{ fact.value }}</span>
        <span class="fact-label">{{ fact.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  background: var(--border);
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  background: color-mix(in srgb, var(--surface) 92%, transparent);
}

.fact-value {
  font-family: var(--font-display);
  /* Small enough on a 360px screen for "Top contributor" to fit two columns. */
  font-size: clamp(1.25rem, 0.6rem + 3vw, 2.25rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.fact-label {
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--muted);
}

@media (min-width: 1024px) {
  .facts { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .fact { padding: 24px 28px; }
}
</style>
