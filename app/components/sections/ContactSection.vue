<script setup lang="ts">
import type { Contact, Person } from '#shared/types/portfolio'

const props = defineProps<{ contact: Contact, person: Person }>()
const { t } = useI18n()

const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(props.person.email)
    copyState.value = 'copied'
  }
  catch {
    copyState.value = 'failed'
  }
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (copyState.value = 'idle'), 2500)
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <section id="contact" class="section container-page" aria-labelledby="contact-title">
    <div v-reveal class="contact">
      <p class="eyebrow">{{ t('sections.contact.eyebrow') }}</p>
      <h2 id="contact-title" class="section-title">{{ t('sections.contact.title') }}</h2>
      <p class="mx-auto mt-4 max-w-xl text-[1.0625rem] text-muted">{{ contact.intro.text }}</p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a :href="`mailto:${person.email}`" class="btn btn-primary email-button">
          <AppIcon name="mail" :size="18" />
          {{ person.email }}
        </a>
        <button type="button" class="btn btn-outline" :aria-label="t('contact.copy_label')" @click="copyEmail">
          <AppIcon :name="copyState === 'copied' ? 'check' : 'copy'" :size="18" />
          {{ copyState === 'copied' ? t('contact.copied') : t('contact.copy') }}
        </button>
      </div>
      <p class="mt-3 min-h-5 text-sm" :class="copyState === 'failed' ? 'text-amber' : 'text-muted'" aria-live="polite">
        <template v-if="copyState === 'copied'">{{ t('contact.copied_announce') }}</template>
        <template v-else-if="copyState === 'failed'">{{ t('contact.copy_failed') }}</template>
      </p>

      <ul class="mt-4 flex flex-wrap items-center justify-center gap-3">
        <li v-if="person.linkedin">
          <a :href="person.linkedin" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
            <AppIcon name="linkedin" :size="18" />
            {{ t('contact.linkedin') }}
            <span class="sr-only">{{ t('a11y.new_tab') }}</span>
          </a>
        </li>
        <li>
          <a :href="person.cv.href" :download="person.cv.fileName" class="btn btn-outline">
            <AppIcon name="download" :size="18" />
            {{ t('contact.cv') }}
          </a>
        </li>
      </ul>

      <p class="mt-8 inline-flex items-center gap-2 text-sm text-muted">
        <AppIcon name="pin" :size="16" />
        {{ contact.location.text }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  overflow: hidden;
  padding: 48px 20px;
  border: 1px solid var(--border-hi);
  border-radius: 24px;
  background:
    radial-gradient(70% 90% at 50% 0%, rgb(96 165 250 / 0.16), transparent 70%),
    var(--surface);
  text-align: center;
}

.email-button {
  max-width: 100%;
  white-space: normal;
  overflow-wrap: anywhere;
}

@media (min-width: 640px) {
  .contact { padding: 72px 48px; }
}
</style>
