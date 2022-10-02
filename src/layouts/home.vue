<script setup lang="ts">
import { useRouter } from 'vue-router'
</script>

<script lang="ts">
import Tabbar from '../components/Tabbar.vue'

export default {
  components: {
    Tabbar,
  },
}
</script>

<template>
  <main class="with-tabbar" :class="[useRouter().currentRoute.value.meta.classNames]">
    <RouterView />
  </main>
  <Tabbar />
</template>
