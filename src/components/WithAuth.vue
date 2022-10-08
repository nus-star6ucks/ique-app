<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  const { user } = userStore
  if (user)
    return

  router.replace('/me')
})
</script>

<template>
  <slot />
</template>
