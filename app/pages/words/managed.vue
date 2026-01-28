<script setup lang="ts">
import type { Word } from '~/types'

const { data: words } = await useFetch<Word[]>('/api/words', { default: () => [] })
const { getManagedWords } = useWords()

const q = ref('')

const managedWords = computed(() => {
  const managed = getManagedWords(words.value)
  const filtered = managed.filter((word) => {
    return word.mot.search(new RegExp(q.value, 'i')) !== -1
  })
  return filtered.sort((a, b) => b.occurrence - a.occurrence)
})

const ignoredWords = computed(() => managedWords.value.filter(w => w.status === 'ignored'))
const blacklistedWords = computed(() => managedWords.value.filter(w => w.status === 'blacklisted'))
</script>

<template>
  <div>
    <UPageCard
      title="Mots gérés"
      description="Récapitulatif des mots ignorés et blacklistés."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    />

    <UPageCard
      variant="subtle"
      :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch', header: 'p-4 mb-0 border-b border-default' }"
    >
      <template #header>
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="Rechercher un mot..."
          autofocus
          class="w-full"
        />
      </template>

      <div v-if="managedWords.length === 0" class="p-8 text-center text-muted">
        Aucun mot ignoré ou blacklisté pour le moment.
      </div>

      <div v-else class="divide-y divide-default">
        <div v-if="ignoredWords.length > 0">
          <div class="px-4 py-2 bg-default/50">
            <span class="text-sm font-medium text-muted">Mots ignorés ({{ ignoredWords.length }})</span>
          </div>
          <WordsList :words="ignoredWords" mode="managed" />
        </div>

        <div v-if="blacklistedWords.length > 0">
          <div class="px-4 py-2 bg-default/50">
            <span class="text-sm font-medium text-muted">Mots blacklistés ({{ blacklistedWords.length }})</span>
          </div>
          <WordsList :words="blacklistedWords" mode="managed" />
        </div>
      </div>
    </UPageCard>
  </div>
</template>
