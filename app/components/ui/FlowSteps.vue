<script setup lang="ts">
import type { FlowStep } from '#shared/types/portfolio'

defineProps<{ steps: FlowStep[], label: string }>()
</script>

<template>
  <div class="flow-wrap">
    <ol class="flow" :style="{ '--steps': steps.length }" :aria-label="label">
      <li v-for="(step, index) in steps" :key="step.label" class="flow-step">
        <span class="flow-number" aria-hidden="true">{{ index + 1 }}</span>
        <span class="flow-text">
          <span class="flow-label">{{ step.label }}</span>
          <span v-if="step.detail" class="flow-detail">{{ step.detail }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.flow-wrap {
  container-type: inline-size;
}

/* Vertical by default (mobile, narrow cards). */
.flow {
  display: grid;
}

.flow-step {
  position: relative;
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  align-content: start;
  column-gap: 14px;
  padding-bottom: 18px;
}

.flow-step:last-child {
  padding-bottom: 0;
}

.flow-step:not(:last-child)::before {
  content: "";
  position: absolute;
  top: 34px;
  bottom: 2px;
  left: 15.5px;
  width: 1px;
  background: linear-gradient(rgb(96 165 250 / 0.55), rgb(96 165 250 / 0.15));
}

.flow-number {
  position: relative;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgb(96 165 250 / 0.45);
  border-radius: 50%;
  background: color-mix(in srgb, var(--blue) 12%, var(--surface));
  color: var(--blue);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
}

.flow-text {
  display: grid;
  gap: 3px;
  padding-top: 5px;
}

.flow-label {
  font-weight: 500;
  line-height: 1.35;
  color: var(--text);
}

.flow-detail {
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--muted);
  overflow-wrap: anywhere;
}

/* Horizontal with connectors once the card is wide enough. */
@container (min-width: 52rem) {
  .flow {
    grid-template-columns: repeat(var(--steps), minmax(0, 1fr));
    column-gap: 16px;
  }

  .flow-step {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 12px;
    padding-bottom: 0;
  }

  .flow-step:not(:last-child)::before {
    top: 15.5px;
    right: -6px;
    bottom: auto;
    left: 44px;
    width: auto;
    height: 1px;
    background: linear-gradient(90deg, rgb(96 165 250 / 0.55), rgb(96 165 250 / 0.2));
  }

  .flow-step:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 12.5px;
    right: -6px;
    width: 7px;
    height: 7px;
    border-top: 1px solid rgb(96 165 250 / 0.45);
    border-right: 1px solid rgb(96 165 250 / 0.45);
    transform: rotate(45deg);
  }

  .flow-text {
    padding-top: 0;
  }
}
</style>
