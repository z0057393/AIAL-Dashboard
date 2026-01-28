<script setup lang="ts">
</script>

<template>
  <UDashboardPanel id="extensions" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Extensions">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-4xl mx-auto">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
