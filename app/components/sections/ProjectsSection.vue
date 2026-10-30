<script setup lang="ts">
import type { Project } from '#shared/types/portfolio'

defineProps<{ projects: Project[] }>()
const { t } = useI18n()
</script>

<template>
  <section id="projects" class="section container-page" aria-labelledby="projects-title">
    <SectionHeader
      title-id="projects-title"
      :eyebrow="t('sections.projects.eyebrow')"
      :title="t('sections.projects.title')"
    />

    <div class="mt-10 grid gap-6">
      <article
        v-for="project in projects"
        :key="project.id"
        v-reveal
        class="card card-interactive p-5 sm:p-8"
        :aria-labelledby="`project-${project.id}`"
      >
        <div class="flex items-start gap-4">
          <span class="icon-tile"><AppIcon :name="project.icon" :size="22" /></span>
          <h3 :id="`project-${project.id}`" class="pt-1.5 text-xl font-semibold sm:text-2xl">
            <a v-if="project.href" :href="project.href" class="link" target="_blank" rel="noopener noreferrer">
              {{ project.title }}<span class="sr-only"> {{ t('a11y.new_tab') }}</span>
            </a>
            <template v-else>{{ project.title }}</template>
          </h3>
        </div>

        <ul class="mt-5 grid gap-3 md:gap-6" :class="project.bullets.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'">
          <li v-for="bullet in project.bullets" :key="bullet.text" class="rounded-xl bg-surface-2 p-4 text-[0.9375rem]">
            {{ bullet.text }}
          </li>
        </ul>

        <FlowSteps
          v-if="project.flow"
          class="mt-6"
          :steps="project.flow"
          :label="t('projects.flow', { name: project.title })"
        />

        <p v-if="project.note" class="mt-5 text-sm text-muted">{{ project.note.text }}</p>
        <TagList class="mt-5" :tags="project.tags" :label="t('work.stack')" />
      </article>
    </div>
  </section>
</template>
