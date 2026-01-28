// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],

  components: [
    { path: '~/components/molecules', pathPrefix: false },
    { path: '~/components/organisms/navigation', pathPrefix: false },
    { path: '~/components/organisms/stats', pathPrefix: false },
    { path: '~/components/organisms/lists', pathPrefix: false },
    { path: '~/components/organisms/charts', pathPrefix: false },
    { path: '~/components/organisms/tables', pathPrefix: false }
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },
  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
