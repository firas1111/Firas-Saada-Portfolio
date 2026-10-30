<script setup lang="ts">
const portfolio = usePortfolio()
</script>

<template>
  <div>
    <HeroSection :hero="portfolio.hero" :person="portfolio.person" />
    <KeyFacts :facts="portfolio.keyFacts" />
    <WorkSection :work="portfolio.work" />
    <ExperienceSection :experience="portfolio.experience" />
    <ProjectsSection :projects="portfolio.projects" />
    <SkillsSection :skills="portfolio.skills" />
    <AboutSection :about="portfolio.about" />
    <ContactSection :contact="portfolio.contact" :person="portfolio.person" />
  </div>
</template>
