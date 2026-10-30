<script setup lang="ts">
import type { Hello } from '#shared/types/portfolio'

const props = defineProps<{ email: string, hello: Hello }>()
const { t } = useI18n()

// Cycles Hello / Bonjour / مرحبا. Pauses on hover and focus, and stays on the
// first word under prefers-reduced-motion.
const index = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!paused.value) index.value = (index.value + 1) % props.hello.greetings.length
  }, 2400)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <a
    :href="`mailto:${email}`"
    class="say-hello"
    :aria-label="t('hello.label')"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focus="paused = true"
    @blur="paused = false"
  >
    <span aria-hidden="true">{{ t('hello.say') }}</span>
    <span class="words" aria-hidden="true">
      <span
        v-for="(greeting, i) in hello.greetings"
        :key="greeting.lang"
        :lang="greeting.lang"
        :dir="greeting.dir"
        :class="{ 'is-active': i === index }"
      >{{ greeting.text }}</span>
    </span>
  </a>
</template>

<style scoped>
.say-hello {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  background: var(--gradient);
  color: var(--on-accent);
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  transition: box-shadow 0.2s ease;
}

.say-hello:hover {
  box-shadow: 0 8px 26px -10px rgb(34 211 238 / 0.7);
}

/* All words share one grid cell, so the button keeps the width of the longest. */
.words {
  display: inline-grid;
}

.words > span {
  grid-area: 1 / 1;
  text-align: center;
  opacity: 0;
  transform: translateY(45%);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.words > span.is-active {
  opacity: 1;
  transform: none;
}
</style>
