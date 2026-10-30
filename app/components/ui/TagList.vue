<script setup lang="ts">
defineProps<{ tags: string[], label: string }>()
</script>

<template>
  <ul class="flex flex-wrap gap-2" :aria-label="label">
    <li v-for="tag in tags" :key="tag" class="tag">{{ tag }}</li>
  </ul>
</template>
