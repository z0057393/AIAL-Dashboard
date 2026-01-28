<script setup lang="ts">
import type { Extension } from '~/types'

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
  <div>
    <UPageCard
      title="Extensions AIAL"
      description="Gérez les extensions installées sur les postes de votre entreprise."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    />

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
            autofocus
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
