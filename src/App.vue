<script setup lang="ts">
import { UserUserTypeEnum } from './api/models'
import Snackbar from './components/Snackbar.vue'
import { useUserStore } from './stores/user'
import { userApi } from './utils'

const router = useRouter()

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

onMounted(() => {
  const token = localStorage.getItem('token')
  const userStore = useUserStore()

  if (typeof userStore.user === 'undefined' && token) {
    userApi.usersGet().then(({ data }) => {
      userStore.setUser(data)
      if (data.userType === 'merchant')
        router.replace('/merchant')
    }).catch(() => {
      userStore.logout()
      router.replace('/')
    })
    return
  }

  if (userStore.user?.userType === UserUserTypeEnum.Customer && router.currentRoute.value.path.startsWith('/merchant')) {
    router.replace('/')
    return
  }

  if (userStore.user?.userType === UserUserTypeEnum.Merchant && !router.currentRoute.value.path.startsWith('/merchant'))
    router.replace('/merchant')
})
</script>

<template>
  <RouterView />
  <Snackbar />
</template>
