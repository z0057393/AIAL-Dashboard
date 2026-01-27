<script setup lang="ts">
import type { Extension } from '~/types'

const { data: extensions } = await useFetch<Extension[]>('/api/extensions', { default: () => [] })

const q = ref('')

const filteredExtensions = computed(() => {
  return extensions.value.filter((extension) => {
    return extension.name.search(new RegExp(q.value, 'i')) !== -1
      || extension.hostname.search(new RegExp(q.value, 'i')) !== -1
      || extension.guid.search(new RegExp(q.value, 'i')) !== -1
  })
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
    >
      <UButton
        label="Ajouter une extension"
        color="neutral"
        icon="i-lucide-plus"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard
      variant="subtle"
      :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch', header: 'p-4 mb-0 border-b border-default' }"
    >
      <template #header>
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="Rechercher une extension..."
          autofocus
          class="w-full"
        />
      </template>

      <SettingsExtensionsList :extensions="filteredExtensions" />
    </UPageCard>
  </div>
</template>
