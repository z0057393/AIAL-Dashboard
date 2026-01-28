<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links = [[{
  label: 'Liste des mots',
  icon: 'i-lucide-list',
  to: '/words',
  exact: true
}, {
  label: 'Mots gérés',
  icon: 'i-lucide-ban',
  to: '/words/managed'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <UDashboardPanel id="words" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Gestion des mots">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
