<script setup lang="ts">
import { useRouter } from 'vue-router'
import Tabbar from '../components/Tabbar.vue'

useHead({
  meta: [
    {
      name: 'theme-color',
      content: computed(() => ((useRouter().currentRoute.value.meta.themeColor as string) || '#faf9fa')),
    },
  ],
})
</script>

<template>
  <main :class="[useRouter().currentRoute.value.meta.classNames]">
    <RouterView />
  </main>
  <Tabbar />
</template>
