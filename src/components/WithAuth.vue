<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  const { user, token } = userStore
  if (token && user)
    return

  router.replace('/me')
})
</script>

<template>
  <slot />
</template>
