<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: false
})

const { login } = useAuth()
const toast = useToast()

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  login(event.data.email, event.data.password)
  toast.add({
    title: 'Connexion réussie',
    color: 'success'
  })
  await navigateTo('/')
}
</script>

<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center bg-default">
      <UCard class="w-full max-w-md">
        <template #header>
          <div class="text-center">
            <h1 class="text-2xl font-bold text-highlighted">
              AIAL Dashboard
            </h1>
            <p class="text-sm text-muted mt-1">
              Connectez-vous à votre compte
            </p>
          </div>
        </template>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="vous@exemple.com"
              icon="i-lucide-mail"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Mot de passe" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="••••••••"
              icon="i-lucide-lock"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            block
            size="lg"
            :loading="loading"
          >
            Se connecter
          </UButton>
        </UForm>

        <template #footer>
          <p class="text-center text-sm text-muted">
            Mot de passe oublié ?
            <UButton variant="link" class="p-0">
              Réinitialiser
            </UButton>
          </p>
        </template>
      </UCard>
    </div>
  </UApp>
</template>
