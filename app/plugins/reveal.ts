import type { Directive } from 'vue'

let observer: IntersectionObserver | undefined
const seen = new WeakSet<Element>()

/**
 * The observer decides everything, so nothing measures the page synchronously:
 * on its first report an element already on screen (or above it) is left
 * alone, one below the fold is hidden until it scrolls into view.
 */
function getObserver() {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target
      const firstReport = !seen.has(el)
      seen.add(el)

      if (entry.isIntersecting) {
        if (!firstReport) el.classList.add('is-visible')
        observer?.unobserve(el)
      }
      else if (firstReport) {
        const belowFold = entry.boundingClientRect.top >= window.innerHeight
        if (belowFold) el.classList.add('reveal')
        else observer?.unobserve(el)
      }
    }
  }, { rootMargin: '0px 0px -8% 0px' })
  return observer
}

/**
 * `v-reveal` (optionally `v-reveal="delayMs"`): fades and slides an element in
 * the first time it scrolls into view. Content never depends on it: elements
 * already on screen, browsers without IntersectionObserver and
 * prefers-reduced-motion are left untouched.
 */
const reveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, binding) {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
