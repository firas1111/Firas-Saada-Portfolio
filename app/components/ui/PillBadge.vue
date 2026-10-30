<script setup lang="ts">
import type { PillTone } from '#shared/types/portfolio'

withDefaults(defineProps<{ tone?: PillTone, dot?: boolean }>(), { tone: 'neutral', dot: false })
</script>

<template>
  <span class="pill" :class="`pill-${tone}`">
    <span v-if="dot" class="pill-dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style scoped>
.pill {
  --pill: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.3rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--pill) 32%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--pill) 11%, transparent);
  color: var(--pill);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pill-cyan { --pill: var(--cyan); }
.pill-violet { --pill: var(--violet); }
.pill-green { --pill: var(--green); }
.pill-amber { --pill: var(--amber); }
.pill-blue { --pill: var(--blue); }

.pill-neutral {
  border-color: var(--border);
  background: rgb(148 163 184 / 0.06);
}

.pill-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.pill-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2.4s ease-out infinite;
}

@keyframes pulse {
  from { transform: scale(1); opacity: 0.6; }
  70%, to { transform: scale(2.6); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .pill-dot::after { display: none; }
}
</style>
