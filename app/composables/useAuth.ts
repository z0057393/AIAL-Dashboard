export const useAuth = () => {
  const user = useState<{ email: string } | null>('auth-user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const login = (email: string, _password: string) => {
    user.value = { email }
    return navigateTo('/')
  }

  const logout = () => {
    user.value = null
    return navigateTo('/login')
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}
