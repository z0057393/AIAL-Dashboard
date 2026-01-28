<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: false
})

const toast = useToast()

const schema = z.object({
  email: z.string().email('Email invalide')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: ''
})

const loading = ref(false)
const submitted = ref(false)

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  loading.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  loading.value = false
  submitted.value = true

  toast.add({
    title: 'Email envoyé',
    description: 'Vérifiez votre boîte de réception',
    color: 'success'
  })
}
</script>

<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center bg-default">
      <UCard class="w-full max-w-md">
        <template #header>
          <div class="text-center">
            <h1 class="text-2xl font-bold text-highlighted">
              Réinitialiser le mot de passe
            </h1>
            <p class="text-sm text-muted mt-1">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>
        </template>

        <div v-if="submitted" class="text-center py-4">
          <UIcon name="i-lucide-mail-check" class="size-12 text-success mx-auto mb-4" />
          <p class="text-highlighted font-medium mb-2">
            Email envoyé !
          </p>
          <p class="text-sm text-muted mb-4">
            Si un compte existe avec l'adresse <span class="font-medium">{{ state.email }}</span>, vous recevrez un email avec les instructions.
          </p>
          <UButton
            to="/login"
            variant="outline"
            color="neutral"
          >
            Retour à la connexion
          </UButton>
        </div>

        <UForm
          v-else
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

          <UButton
            type="submit"
            block
            size="lg"
            :loading="loading"
          >
            Envoyer le lien
          </UButton>
        </UForm>

        <template #footer>
          <p class="text-center text-sm text-muted">
            <UButton to="/login" variant="link" class="p-0">
              Retour à la connexion
            </UButton>
          </p>
        </template>
      </UCard>
    </div>
  </UApp>
</template>
