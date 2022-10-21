<script setup lang="ts">
import type { UserUserTypeEnum } from '~/api/models'
import { useUserStore } from '~/stores/user'

const { userType = 'customer' } = defineProps<{
  userType?: UserUserTypeEnum
}>()
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  const { user } = userStore
  if (userType === 'merchant' && user?.userType !== 'merchant') {
    router.replace('/me')
    return
  }

  if (userType === 'customer' && user?.userType !== 'customer') {
    router.replace('/merchant')
    return
  }

  const token = localStorage.getItem('token')

  if (!token)
    router.replace(userType === 'customer' ? '/me' : '/merchant/login')
})
</script>

<template>
  <slot />
</template>
