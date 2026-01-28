<script setup lang="ts">
import type { Word } from '~/types'

const { data: words } = await useFetch<Word[]>('/api/words', { default: () => [] })
const { getFilteredWords } = useWords()

const q = ref('')

const sortedAndFilteredWords = computed(() => {
  const activeWords = getFilteredWords(words.value, true)
  const filtered = activeWords.filter((word) => {
    return word.mot.search(new RegExp(q.value, 'i')) !== -1
  })
  return filtered.sort((a, b) => b.occurrence - a.occurrence)
})
</script>

<template>
  <div>
    <UPageCard
      title="Liste des mots"
      description="Visualisez et gérez les mots détectés, triés par occurrence."
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

      <WordsList :words="sortedAndFilteredWords" mode="active" />
    </UPageCard>
  </div>
</template>
