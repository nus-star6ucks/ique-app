import { initializeApp } from 'firebase/app'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { getMessaging, getToken } from 'firebase/messaging'
// import { onBackgroundMessage } from 'firebase/messaging/sw'
import { notificationApi, queueApi } from '~/utils'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

const messaging = getMessaging(app)
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
// })

export interface LoginUser {
  id: number
  username: string
  userType: string
  phoneNumber: string
  createTime: number
}

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const user = ref<LoginUser>()

  async function setToken(_token: string) {
    localStorage.setItem('token', _token)
    await Notification.requestPermission()
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    })
    if (user.value?.id)
      await notificationApi.queuesRegisterTokenPost(user.value.id, token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    user.value = undefined
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
