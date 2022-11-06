<script setup lang="ts">
import { useOneSignal } from '@onesignal/onesignal-vue3'
import Snackbar from './components/Snackbar.vue'
import { useUserStore } from './stores/user'
import { useNotificationDotStore } from './stores/notificationDot'
import { notificationApi, userApi } from './utils'

const router = useRouter()
const oneSignal = useOneSignal()
const userStore = useUserStore()
const notificationDot = useNotificationDotStore()

useHead({
  title: 'iQue',
  meta: [
    {
      name: 'theme-color',
      content: computed(() => {
        return (router.currentRoute.value.meta?.themeColor as string) || '#fafafa'
      }),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => '/favicon.ico'),
    },
  ],
})

onBeforeMount(async () => {
  await oneSignal.showSlidedownPrompt()
})

onMounted(async () => {
  const token = localStorage.getItem('token')

  if (typeof userStore.user === 'undefined' && token) {
    userApi.usersGet().then(async ({ data }) => {
      const fullPath = window.location.hash.substring(1)
      userStore.setUser(data)

      const oneSignalUserId = await oneSignal.getUserId()
      if (oneSignalUserId) {
        await notificationApi.queuesRegisterTokenPost(data.id, oneSignalUserId)

        oneSignal.on('notificationDisplay', (event) => {
          notificationDot.setNotificationDot(true)
        })
      }

      if (data.userType === 'customer' && fullPath.startsWith('/merchant')) {
        router.replace('/')
        return
      }

      if (data.userType === 'merchant' && !fullPath.startsWith('/merchant'))
        router.replace('/merchant')
    }).catch(() => {
      userStore.logout()
      router.replace('/')
    })
  }
})
</script>

<template>
  <RouterView />
  <Snackbar />
</template>
