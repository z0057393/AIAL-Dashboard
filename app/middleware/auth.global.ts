const publicPages = ['/login', '/reset-password']

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()

  if (publicPages.includes(to.path)) {
    if (isAuthenticated.value) {
      return navigateTo('/')
    }
    return
  }

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
