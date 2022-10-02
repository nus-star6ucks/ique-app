<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'iQue',
  meta: [
    {
      name: 'theme-color',
      content: computed(() => '#10b981'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => '/favicon.ico'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
