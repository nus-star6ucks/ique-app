<script setup lang="ts">
import type { UserUserTypeEnum } from '~/api/models'

const { userType = 'customer' } = defineProps<{
  userType?: UserUserTypeEnum
}>()

const token = useLocalStorage('token', '')
const router = useRouter()

onMounted(() => {
  if (token.value)
    router.replace(userType === 'customer' ? '/' : '/merchant')
})
</script>

<template>
  <slot />
</template>
