<script setup lang="ts">
import type { Extension } from '~/types'

const props = defineProps<{
  extensions: Extension[]
}>()

const stats = computed(() => {
  const total = props.extensions.length
  const withBlacklisted = props.extensions.filter(e => e.blacklistedWordsCount > 0).length
  const percentageWithBlacklisted = total > 0 ? Math.round((withBlacklisted / total) * 100) : 0

  return [
    {
      title: 'Extensions installées',
      icon: 'i-lucide-puzzle',
      value: total,
      color: 'primary'
    },
    {
      title: 'Avec mots blacklistés',
      icon: 'i-lucide-alert-triangle',
      value: withBlacklisted,
      color: 'error'
    },
    {
      title: 'Taux de détection',
      icon: 'i-lucide-percent',
      value: `${percentageWithBlacklisted}%`,
      color: percentageWithBlacklisted > 50 ? 'error' : percentageWithBlacklisted > 25 ? 'warning' : 'success'
    }
  ]
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: `p-2.5 rounded-full bg-${stat.color}/10 ring ring-inset ring-${stat.color}/25 flex-col`,
        leadingIcon: `text-${stat.color}`,
        title: 'font-normal text-muted text-xs uppercase'
      }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
