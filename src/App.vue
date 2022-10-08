<script setup lang="ts">
import { useUserStore } from './stores/user'
import { userApi } from './utils'
import Snackbar from './components/Snackbar.vue'

const router = useRouter()
useHead({
  title: 'iQue',
  meta: [
    {
      name: 'theme-color',
      content: computed(() => {
        return (router.currentRoute.value.meta?.themeColor as string) || '#faf9fa'
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
const userStore = useUserStore()
const token = useLocalStorage('token', '')
onMounted(() => {
  if (token.value) {
    userApi.usersVerifyGet().then(({ data }) => {
      userStore.setUser(data)
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
