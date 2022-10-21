<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="relative rounded-lg border border-gray-200 p-8 text-center opacity-70">
    <h2 class="text-2xl font-medium uppercase" v-text="props.title || 'Still Nothing'" />
    <p class="mt-4 text-sm text-gray-500" v-text="props.description || 'Click something to make changes`'" />
  </div>
</template>
