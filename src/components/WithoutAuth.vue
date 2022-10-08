<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  const { user, token } = userStore
  if (token && user)
    router.replace('/')
})
</script>

<template>
  <slot />
</template>
