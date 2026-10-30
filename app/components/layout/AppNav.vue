<script setup lang="ts">
import type { Hello } from '#shared/types/portfolio'

defineProps<{ email: string, hello: Hello }>()
const { t } = useI18n()

const sections = ['work', 'experience', 'projects', 'skills', 'about', 'contact'] as const
const active = useActiveSection(sections)

// Mobile menu: a disclosure panel. Escape and outside clicks close it.
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const menuPanel = ref<HTMLElement | null>(null)

function closeMenu(restoreFocus = false) {
  menuOpen.value = false
  if (restoreFocus) menuButton.value?.focus()
}

watch(menuOpen, async (open) => {
  if (!open) return
  await nextTick()
  menuPanel.value?.querySelector('a')?.focus()
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu(true)
}

function onPointerDown(event: PointerEvent) {
  const target = event.target as Node
  if (menuOpen.value && !menuPanel.value?.contains(target) && !menuButton.value?.contains(target)) closeMenu()
}

let desktop: MediaQueryList | undefined
const onDesktop = (event: MediaQueryListEvent) => event.matches && closeMenu()

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerDown)
  desktop = window.matchMedia('(min-width: 768px)')
  desktop.addEventListener('change', onDesktop)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown)
  desktop?.removeEventListener('change', onDesktop)
})
</script>

<template>
  <header class="site-nav">
    <nav :aria-label="t('a11y.nav')">
      <div class="container-page flex h-16 items-center gap-6">
        <a href="#top" class="monogram" :aria-label="t('a11y.home')">FS</a>

        <ul class="hidden items-center gap-1 md:flex">
          <li v-for="id in sections" :key="id">
            <a :href="`#${id}`" class="nav-link" :class="{ 'is-active': active === id }">{{ t(`nav.${id}`) }}</a>
          </li>
        </ul>

        <div class="ml-auto flex items-center gap-2">
          <SayHello :email="email" :hello="hello" />
          <button
            ref="menuButton"
            type="button"
            class="menu-button"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            @click="menuOpen = !menuOpen"
          >
            <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="22" />
            <span class="sr-only">{{ t('a11y.menu') }}</span>
          </button>
        </div>
      </div>

      <div v-show="menuOpen" id="mobile-menu" ref="menuPanel" class="mobile-menu md:hidden">
        <ul class="container-page grid gap-1 py-3">
          <li v-for="id in sections" :key="id">
            <a :href="`#${id}`" class="mobile-link" @click="closeMenu()">{{ t(`nav.${id}`) }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
}

.monogram {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--border-hi);
  border-radius: 11px;
  background: linear-gradient(135deg, rgb(96 165 250 / 0.18), rgb(34 211 238 / 0.06));
  color: var(--text);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.nav-link {
  display: block;
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--text);
  background: rgb(148 163 184 / 0.08);
}

.menu-button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
}

@media (min-width: 768px) {
  .menu-button { display: none; }
}

.mobile-menu {
  border-top: 1px solid var(--border);
}

.mobile-link {
  display: block;
  padding: 12px 8px;
  border-radius: 10px;
  color: var(--text);
  font-weight: 500;
}

.mobile-link:hover {
  background: rgb(148 163 184 / 0.08);
}
</style>
