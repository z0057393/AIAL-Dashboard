<script setup lang="ts">
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Period, Range } from '~/types'

const props = defineProps<{
  period: Period
  range: Range
}>()

interface BlacklistedWordDetection {
  mot: string
  detections: number
  lastSeen: string
}

const sampleBlacklistedWords = [
  'motinterdit1',
  'termebanni',
  'expressionbloquee',
  'motfiltre',
  'contenusensible'
]

const { data } = await useAsyncData('blacklisted-detections', async () => {
  const detections: BlacklistedWordDetection[] = []
  const currentDate = new Date()

  for (let i = 0; i < 5; i++) {
    const hoursAgo = randomInt(0, 48)
    const date = new Date(currentDate.getTime() - hoursAgo * 3600000)

    detections.push({
      mot: sampleBlacklistedWords[i]!,
      detections: randomInt(1, 50),
      lastSeen: date.toISOString()
    })
  }

  return detections.sort((a, b) => b.detections - a.detections)
}, {
  watch: [() => props.period, () => props.range],
  default: () => []
})

const columns: TableColumn<BlacklistedWordDetection>[] = [
  {
    accessorKey: 'mot',
    header: 'Mot',
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.getValue('mot'))
  },
  {
    accessorKey: 'detections',
    header: () => h('div', { class: 'text-center' }, 'Détections'),
    cell: ({ row }) => {
      const count = row.getValue('detections') as number
      return h('div', { class: 'text-center font-semibold tabular-nums' }, count.toString())
    }
  },
  {
    accessorKey: 'lastSeen',
    header: 'Dernière détection',
    cell: ({ row }) => {
      return new Date(row.getValue('lastSeen')).toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  }
]
</script>

<template>
  <div>
    <h3 class="text-sm font-medium text-muted uppercase mb-3">
      Mots blacklistés détectés sur la période
    </h3>
    <UTable
      :data="data"
      :columns="columns"
      class="shrink-0"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
        td: 'border-b border-default'
      }"
    />
  </div>
</template>
