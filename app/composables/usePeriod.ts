import { sub } from 'date-fns'
import { createSharedComposable } from '@vueuse/core'
import type { Period, Range } from '~/types'

const _usePeriod = () => {
  const range = shallowRef<Range>({
    start: sub(new Date(), { days: 14 }),
    end: new Date()
  })

  const period = ref<Period>('daily')

  return {
    range,
    period
  }
}

export const usePeriod = createSharedComposable(_usePeriod)
