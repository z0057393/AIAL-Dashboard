<template>
  <UCard>
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Répartition des extensions
        </p>
        <p class="text-xl text-highlighted font-semibold">
          ---
        </p>
      </div>
    </template>

    <div class="h-48 flex items-center justify-center">
      <USkeleton class="h-48 w-48 rounded-full" />
    </div>
  </UCard>
</template>
