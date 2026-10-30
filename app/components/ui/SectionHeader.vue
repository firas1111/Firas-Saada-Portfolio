<script setup lang="ts">
defineProps<{ titleId: string, eyebrow: string, title: string }>()
</script>

<template>
  <header>
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="titleId" class="section-title">{{ title }}</h2>
    <slot />
  </header>
</template>
