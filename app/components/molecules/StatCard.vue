<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  value: string | number
  variation?: number
  color?: 'primary' | 'success' | 'warning' | 'error'
}>()
</script>

<template>
  <UPageCard
    :icon="icon"
    :title="title"
    variant="subtle"
    :ui="{
      container: 'gap-y-1.5',
      wrapper: 'items-start',
      leading: `p-2.5 rounded-full bg-${color || 'primary'}/10 ring ring-inset ring-${color || 'primary'}/25 flex-col`,
      leadingIcon: color ? `text-${color}` : undefined,
      title: 'font-normal text-muted text-xs uppercase'
    }"
    class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
  >
    <div class="flex items-center gap-2">
      <span class="text-2xl font-semibold text-highlighted">
        {{ value }}
      </span>

      <UBadge
        v-if="variation !== undefined"
        :color="variation > 0 ? 'success' : 'error'"
        variant="subtle"
        class="text-xs"
      >
        {{ variation > 0 ? '+' : '' }}{{ variation }}%
      </UBadge>
    </div>
  </UPageCard>
</template>
