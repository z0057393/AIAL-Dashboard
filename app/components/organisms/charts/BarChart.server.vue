<template>
  <UCard>
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Top extensions par mots blacklistés
        </p>
        <p class="text-sm text-muted">
          Classement des extensions avec le plus de détections
        </p>
      </div>
    </template>

    <div class="p-4 space-y-3">
      <USkeleton v-for="i in 5" :key="i" class="h-6 w-full" />
    </div>
  </UCard>
</template>
