export const useAuth = () => {
  const user = useState<{ email: string } | null>('auth-user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, _password: string) => {
    user.value = { email }
    await navigateTo('/')
  }

  const logout = async () => {
    user.value = null
    await navigateTo('/login')
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}
