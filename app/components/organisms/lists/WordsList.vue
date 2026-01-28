<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Word } from '~/types'

const props = defineProps<{
  words: Word[]
  mode: 'active' | 'managed'
}>()

const toast = useToast()
const { ignoreWord, blacklistWord, restoreWord } = useWords()

function getActiveMenuItems(word: Word): DropdownMenuItem[] {
  return [{
    label: 'Ignorer',
    icon: 'i-lucide-eye-off',
    onSelect: () => {
      ignoreWord(word.mot)
      toast.add({
        title: `"${word.mot}" ignoré`,
        color: 'warning'
      })
    }
  }, {
    label: 'Blacklister',
    icon: 'i-lucide-ban',
    color: 'error' as const,
    onSelect: () => {
      blacklistWord(word.mot)
      toast.add({
        title: `"${word.mot}" blacklisté`,
        color: 'error'
      })
    }
  }]
}

function getManagedMenuItems(word: Word): DropdownMenuItem[] {
  return [{
    label: 'Restaurer',
    icon: 'i-lucide-undo-2',
    onSelect: () => {
      restoreWord(word.mot)
      toast.add({
        title: `"${word.mot}" restauré`,
        color: 'success'
      })
    }
  }]
}

function getMenuItems(word: Word): DropdownMenuItem[] {
  return props.mode === 'active' ? getActiveMenuItems(word) : getManagedMenuItems(word)
}

function getStatusColor(status: Word['status']) {
  switch (status) {
    case 'ignored':
      return 'warning'
    case 'blacklisted':
      return 'error'
    default:
      return 'success'
  }
}

function getStatusLabel(status: Word['status']) {
  switch (status) {
    case 'ignored':
      return 'Ignoré'
    case 'blacklisted':
      return 'Blacklisté'
    default:
      return 'Actif'
  }
}
</script>

<template>
  <ul role="list" class="divide-y divide-default">
    <li
      v-for="word in words"
      :key="word.mot"
      class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar
          icon="i-lucide-text"
          size="md"
          :ui="{ icon: 'text-muted' }"
        />

        <div class="text-sm min-w-0">
          <p class="text-highlighted font-medium truncate">
            {{ word.mot }}
          </p>
          <p v-if="mode === 'active'" class="text-muted truncate text-xs">
            {{ word.occurrence }} occurrence{{ word.occurrence > 1 ? 's' : '' }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <UBadge
          v-if="mode === 'managed' && word.status"
          :color="getStatusColor(word.status)"
          variant="subtle"
        >
          {{ getStatusLabel(word.status) }}
        </UBadge>

        <UBadge
          v-if="mode === 'active'"
          color="primary"
          variant="subtle"
          class="tabular-nums"
        >
          {{ word.occurrence }}
        </UBadge>

        <UDropdownMenu :items="getMenuItems(word)" :content="{ align: 'end' }">
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
