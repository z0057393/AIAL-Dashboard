<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Extension } from '~/types'

defineProps<{
  extensions: Extension[]
}>()

const items = [{
  label: 'Voir détails',
  icon: 'i-lucide-eye',
  onSelect: () => console.log('View details')
}, {
  label: 'Désactiver',
  icon: 'i-lucide-power-off',
  color: 'error' as const,
  onSelect: () => console.log('Disable extension')
}] satisfies DropdownMenuItem[]

function getStatusColor(status: Extension['status']) {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'error'
    case 'pending':
      return 'warning'
  }
}

function getStatusLabel(status: Extension['status']) {
  switch (status) {
    case 'active':
      return 'Actif'
    case 'inactive':
      return 'Inactif'
    case 'pending':
      return 'En attente'
  }
}

function formatLastSeen(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <ul role="list" class="divide-y divide-default">
    <li
      v-for="extension in extensions"
      :key="extension.guid"
      class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar
          icon="i-lucide-puzzle"
          size="md"
          :ui="{ icon: 'text-muted' }"
        />

        <div class="text-sm min-w-0">
          <p class="text-highlighted font-medium truncate">
            {{ extension.name }}
          </p>
          <p class="text-muted truncate text-xs">
            {{ extension.hostname }} · {{ extension.guid.slice(0, 8) }}...
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-xs text-muted hidden md:flex flex-col items-end gap-0.5">
          <span>Dernière activité : {{ formatLastSeen(extension.lastSeen) }}</span>
          <span v-if="extension.blacklistedWordsCount > 0" class="text-error">
            {{ extension.blacklistedWordsCount }} mot{{ extension.blacklistedWordsCount > 1 ? 's' : '' }} blacklisté{{ extension.blacklistedWordsCount > 1 ? 's' : '' }}
          </span>
          <span v-else class="text-success">
            Aucun mot blacklisté
          </span>
        </div>

        <UBadge
          v-if="extension.blacklistedWordsCount > 0"
          color="error"
          variant="subtle"
          class="tabular-nums"
        >
          {{ extension.blacklistedWordsCount }}
        </UBadge>

        <UBadge
          :color="getStatusColor(extension.status)"
          variant="subtle"
        >
          {{ getStatusLabel(extension.status) }}
        </UBadge>

        <UDropdownMenu :items="items" :content="{ align: 'end' }">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </div>
    </li>
  </ul>
</template>
