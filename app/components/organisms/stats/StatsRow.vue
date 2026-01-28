<script setup lang="ts">
export interface StatItem {
  title: string
  icon: string
  value: string | number
  variation?: number
  color?: 'primary' | 'success' | 'warning' | 'error'
}

defineProps<{
  stats: StatItem[]
}>()
</script>

<template>
  <UPageGrid class="lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-px">
    <StatCard
      v-for="(stat, index) in stats"
      :key="index"
      :title="stat.title"
      :icon="stat.icon"
      :value="stat.value"
      :variation="stat.variation"
      :color="stat.color"
    />
  </UPageGrid>
</template>
