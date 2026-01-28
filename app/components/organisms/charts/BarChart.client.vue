<script setup lang="ts">
import type { Extension } from '~/types'

const props = defineProps<{
  extensions: Extension[]
}>()

type BarDataRecord = {
  name: string
  count: number
}

const data = computed<BarDataRecord[]>(() => {
  return [...props.extensions]
    .sort((a, b) => b.blacklistedWordsCount - a.blacklistedWordsCount)
    .slice(0, 10)
    .map(e => ({
      name: e.name,
      count: e.blacklistedWordsCount
    }))
})

const maxCount = computed(() => {
  return Math.max(...props.extensions.map(e => e.blacklistedWordsCount), 1)
})
</script>

<template>
  <UCard ref="cardRef" :ui="{ body: '!p-0' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Top extensions par mots blacklistés
        </p>
        <p class="text-sm text-muted">
          Classement des extensions avec le plus de détections
        </p>
      </div>
    </template>

    <div class="p-4">
      <div
        v-for="item in data"
        :key="item.name"
        class="flex items-center gap-3 py-2"
      >
        <span class="text-sm text-muted w-32 truncate">{{ item.name }}</span>
        <div class="flex-1 h-6 bg-default rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="item.count > 0 ? 'bg-error' : 'bg-success'"
            :style="{ width: `${(item.count / maxCount) * 100}%` }"
          />
        </div>
        <span class="text-sm font-semibold text-highlighted w-8 text-right tabular-nums">
          {{ item.count }}
        </span>
      </div>

      <div v-if="data.length === 0" class="py-8 text-center text-muted">
        Aucune extension
      </div>
    </div>
  </UCard>
</template>
