<script setup lang="ts">
import type { Integration } from '#shared/types/portfolio'

const props = defineProps<{ integration: Integration }>()
const { t } = useI18n()

const titleId = computed(() => `integration-${props.integration.id}`)
</script>

<template>
  <article
    class="card card-interactive integration"
    :class="{ 'integration-featured': integration.featured }"
    :aria-labelledby="titleId"
  >
    <div class="integration-head">
      <ul class="flex flex-wrap gap-2">
        <li><PillBadge tone="cyan">{{ integration.company }}</PillBadge></li>
        <li><PillBadge tone="violet">{{ integration.domain }}</PillBadge></li>
        <li v-if="integration.status">
          <PillBadge :tone="integration.status.kind === 'live' ? 'green' : 'amber'" dot>
            {{ integration.status.label }}
          </PillBadge>
        </li>
      </ul>
      <div class="mt-4 flex items-center gap-4">
        <span class="icon-tile"><AppIcon :name="integration.icon" :size="22" /></span>
        <h3 :id="titleId" class="text-2xl font-semibold sm:text-[1.75rem]">{{ integration.title }}</h3>
      </div>
      <p class="mt-4 text-fg/90">{{ integration.summary.text }}</p>
      <p v-if="integration.detail" class="mt-3 text-[0.9375rem] text-muted">{{ integration.detail.text }}</p>
    </div>

    <FlowSteps
      class="integration-flow"
      :steps="integration.flow"
      :label="t('work.flow', { name: integration.title })"
    />

    <div class="integration-side">
      <ImpactBox :items="integration.impact" :title="t('work.impact')" />
      <TagList :tags="integration.tags" :label="t('work.stack')" />
    </div>
  </article>
</template>

<style scoped>
/* Mobile: head, flow, impact. Desktop: head and impact side by side, flow below. */
.integration {
  display: grid;
  grid-template-areas: "head" "flow" "side";
  gap: 24px;
  padding: 20px;
}

.integration-head { grid-area: head; }
.integration-flow { grid-area: flow; }

.integration-side {
  grid-area: side;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 640px) {
  .integration { padding: 28px; }
}

@media (min-width: 1024px) {
  .integration {
    grid-template-areas: "head side" "flow flow";
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    column-gap: 40px;
    row-gap: 0;
    padding: 32px;
  }

  .integration-flow {
    margin-top: 28px;
    padding-top: 26px;
    border-top: 1px dashed var(--border);
  }
}

.integration-featured {
  border-color: transparent;
  background:
    linear-gradient(var(--surface), var(--surface)) padding-box,
    linear-gradient(135deg, rgb(96 165 250 / 0.55), rgb(34 211 238 / 0.2) 35%, var(--border) 70%) border-box;
}

.integration-featured:hover {
  border-color: transparent;
}
</style>
