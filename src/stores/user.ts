import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from '~/api/models'

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const token = ref('')
  const user = ref<User>()

  function setToken(_token: string) {
    token.value = _token
  }

  const logout = () => setToken('')

  function setUser(_user: User) {
    user.value = _user
  }

  return {
    login: setToken,
    logout,
    setUser,
    user,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
