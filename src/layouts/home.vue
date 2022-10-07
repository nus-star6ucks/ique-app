<script setup lang="ts">
import { useRouter } from 'vue-router'
import Tabbar from '../components/Tabbar.vue'
</script>

<template>
  <main :class="[useRouter().currentRoute.value.meta.classNames]">
    <RouterView />
  </main>
  <Tabbar />
</template>
