<script setup lang="ts">
import type { Extension } from '~/types'
import type { StatItem } from '~/components/organisms/stats/StatsRow.vue'

const { data: extensions } = await useFetch<Extension[]>('/api/extensions', { default: () => [] })

const q = ref('')
const sortBy = ref<'name' | 'blacklisted' | 'activity'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')

const sortOptions = [
  { label: 'Nom', value: 'name' },
  { label: 'Mots blacklistés', value: 'blacklisted' },
  { label: 'Dernière activité', value: 'activity' }
]

const orderOptions = [
  { label: 'Croissant', value: 'asc' },
  { label: 'Décroissant', value: 'desc' }
]

const stats = computed<StatItem[]>(() => {
  const total = extensions.value.length
  const withBlacklisted = extensions.value.filter(e => e.blacklistedWordsCount > 0).length
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

const filteredAndSortedExtensions = computed(() => {
  let result = extensions.value.filter((extension) => {
    return extension.name.search(new RegExp(q.value, 'i')) !== -1
      || extension.hostname.search(new RegExp(q.value, 'i')) !== -1
      || extension.guid.search(new RegExp(q.value, 'i')) !== -1
  })

  result = [...result].sort((a, b) => {
    let comparison = 0

    switch (sortBy.value) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'blacklisted':
        comparison = a.blacklistedWordsCount - b.blacklistedWordsCount
        break
      case 'activity':
        comparison = new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime()
        break
    }

    return sortOrder.value === 'desc' ? -comparison : comparison
  })

  return result
})
</script>

<template>
  <div class="space-y-6">
    <UPageCard
      title="Extensions AIAL"
      description="Gérez les extensions installées sur les postes de votre entreprise."
      variant="naked"
      orientation="horizontal"
    />

    <!-- Stats -->
    <StatsRow :stats="stats" />

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DonutChart :extensions="extensions" />
      <BarChart :extensions="extensions" />
    </div>

    <!-- Liste -->
    <UPageCard
      variant="subtle"
      :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch', header: 'p-4 mb-0 border-b border-default' }"
    >
      <template #header>
        <div class="flex flex-col sm:flex-row gap-3 w-full">
          <UInput
            v-model="q"
            icon="i-lucide-search"
            placeholder="Rechercher une extension..."
            class="flex-1"
          />
          <div class="flex gap-2">
            <USelectMenu
              v-model="sortBy"
              :items="sortOptions"
              value-key="value"
              placeholder="Trier par"
              class="w-40"
            />
            <USelectMenu
              v-model="sortOrder"
              :items="orderOptions"
              value-key="value"
              class="w-32"
            />
          </div>
        </div>
      </template>

      <ExtensionsList :extensions="filteredAndSortedExtensions" />
    </UPageCard>
  </div>
</template>
