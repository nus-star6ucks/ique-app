import { acceptHMRUpdate, defineStore } from 'pinia'

export interface LoginUser {
  id: number
  username: string
  createTime: number
}

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const token = ref('')
  const user = ref<LoginUser>()

  function setToken(_token: string) {
    localStorage.setItem('token', _token)
    token.value = _token
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  function setUser(_user: LoginUser) {
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
