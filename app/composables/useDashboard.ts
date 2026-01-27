import { createSharedComposable } from '@vueuse/core'

const _useDashboard = () => {
  const router = useRouter()

  defineShortcuts({
    'g-h': () => router.push('/'),
    'g-c': () => router.push('/customers'),
    'g-s': () => router.push('/settings')
  })
}

export const useDashboard = createSharedComposable(_useDashboard)
