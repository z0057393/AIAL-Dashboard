<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Word } from '~/types'

const props = defineProps<{
  words: Word[]
  mode: 'active' | 'managed'
}>()

const toast = useToast()
const { ignoreWord, blacklistWord, restoreWord } = useWords()

const focusedIndex = ref(0)

// Reset focus when words change
watch(() => props.words, () => {
  if (focusedIndex.value >= props.words.length) {
    focusedIndex.value = Math.max(0, props.words.length - 1)
  }
})

const focusedWord = computed(() => props.words[focusedIndex.value])

function handleIgnore() {
  if (props.mode !== 'active' || !focusedWord.value) return
  ignoreWord(focusedWord.value.mot)
  toast.add({
    title: `"${focusedWord.value.mot}" ignoré`,
    color: 'warning'
  })
}

function handleBlacklist() {
  if (props.mode !== 'active' || !focusedWord.value) return
  blacklistWord(focusedWord.value.mot)
  toast.add({
    title: `"${focusedWord.value.mot}" blacklisté`,
    color: 'error'
  })
}

function navigateUp() {
  if (focusedIndex.value > 0) {
    focusedIndex.value--
  }
}

function navigateDown() {
  if (focusedIndex.value < props.words.length - 1) {
    focusedIndex.value++
  }
}

// Keyboard shortcuts
defineShortcuts({
  shift_i: () => handleIgnore(),
  shift_b: () => handleBlacklist(),
  arrowup: () => navigateUp(),
  arrowdown: () => navigateDown()
})

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
  <div>
    <ul role="list" class="divide-y divide-default">
      <li
        v-for="(word, index) in words"
        :key="word.mot"
        class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6 transition-colors cursor-pointer"
        :class="[index === focusedIndex ? 'bg-primary/10 ring-1 ring-primary/25' : 'hover:bg-elevated/25']"
        @click="focusedIndex = index"
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
            color="error"
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

    <div v-if="mode === 'active' && words.length > 0" class="px-4 py-2 border-t border-default">
      <p class="text-xs text-dimmed flex items-center gap-4">
        <span class="flex items-center gap-1">
          <UKbd size="sm">↑</UKbd>
          <UKbd size="sm">↓</UKbd>
          <span>naviguer</span>
        </span>
        <span class="flex items-center gap-1">
          <UKbd size="sm">Shift</UKbd>
          <UKbd size="sm">I</UKbd>
          <span>ignorer</span>
        </span>
        <span class="flex items-center gap-1">
          <UKbd size="sm">Shift</UKbd>
          <UKbd size="sm">B</UKbd>
          <span>blacklister</span>
        </span>
      </p>
    </div>
  </div>
</template>
