<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const entreprise = ref({
  label: 'Mon Entreprise',
  avatar: {
    icon: 'i-lucide-building-2'
  }
})
</script>

<template>
  <UButton
    v-bind="{
      ...entreprise,
      label: collapsed ? undefined : entreprise?.label
    }"
    color="neutral"
    variant="ghost"
    block
    :square="collapsed"
    class="cursor-default"
    :class="[!collapsed && 'py-2']"
  />
</template>
