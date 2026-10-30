<script setup lang="ts">
import type { Fact } from '#shared/types/portfolio'

defineProps<{ items: Fact[], title: string }>()
</script>

<template>
  <div class="impact">
    <p class="eyebrow">{{ title }}</p>
    <ul class="impact-list">
      <li v-for="item in items" :key="item.text">
        <span class="impact-mark" aria-hidden="true">✦</span>
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.impact {
  position: relative;
  padding: 14px 18px 16px 20px;
  border-radius: 12px;
  background: var(--surface-2);
}

.impact::before {
  content: "";
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 0;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(var(--blue), var(--cyan));
}

.impact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  margin-top: 8px;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.impact-list li {
  display: flex;
  gap: 8px;
}

.impact-mark {
  color: var(--cyan);
}
</style>
