export const useAuth = () => {
  const user = useState<{ email: string } | null>('auth-user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const login = (email: string, _password: string) => {
    user.value = { email }
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}
