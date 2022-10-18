<script setup lang="ts">
import type { UserUserTypeEnum } from '~/api/models'
import { useUserStore } from '~/stores/user'

const props = defineProps<{
  userType?: UserUserTypeEnum
}>()
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  const { user } = userStore
  const { userType = 'customer' } = props
  if (userType === 'merchant' && user?.userType === 'merchant')
    return

  if (userType === 'customer' && user?.userType === 'customer')
    return

  router.replace(userType === 'customer' ? '/me' : '/merchant/login')
})
</script>

<template>
  <slot />
</template>
