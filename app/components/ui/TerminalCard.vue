<script setup lang="ts">
import type { TerminalLine, TerminalStatus } from '#shared/types/portfolio'

const props = defineProps<{ lines: TerminalLine[] }>()
const { t } = useI18n()

const tokens: Record<TerminalStatus, string> = { ok: '[ OK ]', pending: '[ .. ]', info: '[INFO]' }

// Each line is "typed" once by a CSS animation (about 1.5 s in total). The text
// is in the HTML from the start; prefers-reduced-motion turns the animation off.
const COMMAND_MS = 350
const LINE_MS = 200

function typing(index: number) {
  const delay = index === 0 ? 100 : 550 + (index - 1) * LINE_MS
  return { '--type-delay': `${delay}ms`, '--type-duration': `${index === 0 ? COMMAND_MS : LINE_MS}ms` }
}

const promptStyle = computed(() => typing(props.lines.length + 1))
</script>

<template>
  <figure class="terminal">
    <figcaption class="terminal-bar">
      <span class="terminal-dots" aria-hidden="true"><span /><span /><span /></span>
      <span class="terminal-title">{{ t('terminal.title') }}</span>
    </figcaption>

    <div class="terminal-body">
      <p class="terminal-line" :style="typing(0)">
        <span class="text-green" aria-hidden="true">$ </span>{{ t('terminal.command') }}
      </p>
      <p
        v-for="(line, index) in lines"
        :key="line.name"
        class="terminal-line terminal-status"
        :style="typing(index + 1)"
      >
        <span :class="`status-${line.status}`">
          <span aria-hidden="true">{{ tokens[line.status] }}</span>
          <span class="sr-only">{{ t(`terminal.${line.status}`) }}:</span>
        </span>
        <span class="status-name">{{ line.name }}</span>
        <span class="status-text">{{ line.text }}</span>
      </p>
      <p class="terminal-line" :style="promptStyle" aria-hidden="true">
        <span class="text-green">$ </span><span class="cursor" />
      </p>
    </div>
  </figure>
</template>

<style scoped>
.terminal {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--surface-2) 94%, transparent);
  box-shadow:
    0 30px 80px -40px rgb(34 211 238 / 0.35),
    inset 0 1px 0 rgb(255 255 255 / 0.03);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: rgb(255 255 255 / 0.02);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.terminal-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(248 113 113 / 0.75);
}

.terminal-dots span:nth-child(2) { background: rgb(251 191 36 / 0.75); }
.terminal-dots span:nth-child(3) { background: rgb(52 211 153 / 0.75); }

.terminal-title {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}

.terminal-body {
  container-type: inline-size;
  padding: 16px 18px 18px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-variant-ligatures: none; /* keep "--status" as two hyphens */
  line-height: 1.7;
}

.terminal-line {
  animation: type var(--type-duration) steps(24, end) var(--type-delay) both;
}

.terminal-status {
  display: grid;
  grid-template-columns: 6ch minmax(0, 1fr);
  column-gap: 1.5ch;
  margin-top: 6px;
}

/* Narrow cards: the description wraps under the name. */
.status-text {
  grid-column: 2;
  color: var(--muted);
}

@container (min-width: 27rem) {
  .terminal-status { grid-template-columns: 6ch 9ch minmax(0, 1fr); }
  .status-text { grid-column: auto; }
}

.status-ok { color: var(--green); }
.status-pending { color: var(--amber); }
.status-info { color: var(--blue); }

.status-ok,
.status-pending,
.status-info {
  white-space: pre;
}

.cursor {
  display: inline-block;
  width: 0.6em;
  height: 1.15em;
  vertical-align: -0.2em;
  background: var(--cyan);
  animation: blink 1s steps(1, end) calc(var(--type-delay) + 200ms) 4;
}

@keyframes type {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0); }
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (min-width: 640px) {
  .terminal-body { font-size: 13px; }
}
</style>
