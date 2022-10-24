import { acceptHMRUpdate, defineStore } from 'pinia'

export const useNotificationDotStore = defineStore('notificationDotStore', () => {
  const notificationDot = ref<boolean>(false)

  function setNotificationDot(_notificationDot: boolean) {
    notificationDot.value = _notificationDot
  }

  return {
    setNotificationDot,
    notificationDot,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotificationDotStore, import.meta.hot))
