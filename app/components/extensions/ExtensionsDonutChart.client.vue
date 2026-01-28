<script setup lang="ts">
import { VisSingleContainer, VisDonut } from '@unovis/vue'
import type { Extension } from '~/types'

const props = defineProps<{
  extensions: Extension[]
}>()

type DonutDataRecord = {
  label: string
  value: number
  color: string
}

const data = computed<DonutDataRecord[]>(() => {
  const withBlacklisted = props.extensions.filter(e => e.blacklistedWordsCount > 0).length
  const withoutBlacklisted = props.extensions.length - withBlacklisted

  return [
    { label: 'Sans mots blacklistés', value: withoutBlacklisted, color: 'var(--ui-success)' },
    { label: 'Avec mots blacklistés', value: withBlacklisted, color: 'var(--ui-error)' }
  ]
})

const value = (d: DonutDataRecord) => d.value
const color = (d: DonutDataRecord) => d.color

const totalBlacklisted = computed(() => {
  return props.extensions.reduce((acc, e) => acc + e.blacklistedWordsCount, 0)
})
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Répartition des extensions
        </p>
        <p class="text-xl text-highlighted font-semibold">
          {{ totalBlacklisted }} mot{{ totalBlacklisted > 1 ? 's' : '' }} blacklisté{{ totalBlacklisted > 1 ? 's' : '' }} au total
        </p>
      </div>
    </template>

    <div class="flex flex-col sm:flex-row items-center gap-6">
      <VisSingleContainer :data="data" class="h-48 w-48">
        <VisDonut
          :value="value"
          :color="color"
          :arc-width="30"
          :pad-angle="0.02"
          :corner-radius="4"
        />
      </VisSingleContainer>

      <div class="flex flex-col gap-3">
        <div v-for="item in data" :key="item.label" class="flex items-center gap-2">
          <span
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: item.color }"
          />
          <span class="text-sm text-muted">{{ item.label }}</span>
          <span class="text-sm font-semibold text-highlighted">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.unovis-single-container {
  --vis-donut-background-color: var(--ui-bg-elevated);
}
</style>
