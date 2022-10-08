<script setup lang="ts">
const token = useLocalStorage('token', '')
const router = useRouter()

onMounted(() => {
  if (token.value)
    router.replace('/')
})
</script>

<template>
  <slot />
</template>
