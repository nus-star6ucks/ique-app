<script setup lang="ts">
import type { UserUserTypeEnum } from '~/api/models'
import { useUserStore } from '~/stores/user'

const { userType = 'customer' } = defineProps<{
  userType?: UserUserTypeEnum
}>()
const userStore = useUserStore()
const router = useRouter()
const token = useLocalStorage('token', '')

onMounted(() => {
  const { user } = userStore
  if (userType === 'merchant' && user?.userType === 'merchant')
    return

  if (userType === 'customer' && user?.userType === 'customer')
    return

  if (!token.value)
    router.replace(userType === 'customer' ? '/me' : '/merchant/login')
})
</script>

<template>
  <slot />
</template>
