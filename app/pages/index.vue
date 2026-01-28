<script setup lang="ts">
import type { StatItem } from '~/components/organisms/stats/StatsRow.vue'

const { range, period } = usePeriod()

const baseStats = [{
  title: 'Extensions',
  icon: 'i-lucide-puzzle',
  minValue: 400,
  maxValue: 1000,
  minVariation: -15,
  maxVariation: 25
}, {
  title: 'Nouveaux mots',
  icon: 'i-lucide-text',
  minValue: 50,
  maxValue: 200,
  minVariation: -10,
  maxVariation: 30
}, {
  title: 'Mots blacklistés',
  icon: 'i-lucide-ban',
  minValue: 10,
  maxValue: 50,
  minVariation: -5,
  maxVariation: 15
}]

const { data: stats } = await useAsyncData<StatItem[]>('stats', async () => {
  return baseStats.map((stat) => {
    const value = randomInt(stat.minValue, stat.maxValue)
    const variation = randomInt(stat.minVariation, stat.maxVariation)

    return {
      title: stat.title,
      icon: stat.icon,
      value,
      variation
    }
  })
}, {
  watch: [period, range],
  default: () => []
})
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <DateRangePicker v-model="range" class="-ms-1" />

          <PeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <StatsRow :stats="stats" />
      <LineChart :period="period" :range="range" />
      <BlacklistedWordsTable :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</template>
