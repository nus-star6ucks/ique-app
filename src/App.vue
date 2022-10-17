<script setup lang="ts">
import Snackbar from './components/Snackbar.vue'

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
</script>

<template>
  <RouterView />
  <Snackbar />
</template>
