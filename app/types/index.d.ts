import type { AvatarProps } from '@nuxt/ui'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: UserStatus
  location: string
}

export type ExtensionStatus = 'active' | 'inactive' | 'pending'

export interface Extension {
  guid: string
  name: string
  hostname: string
  status: ExtensionStatus
  lastSeen: string
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}

export type WordStatus = 'active' | 'ignored' | 'blacklisted'

export interface Word {
  mot: string
  occurrence: number
  status?: WordStatus
}
