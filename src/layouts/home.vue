<script lang="ts">
import Tabbar from '../components/Tabbar.vue'

export default {
  components: {
    Tabbar,
  },
}
</script>

<template>
  <main class="with-tabbar">
    <RouterView />
  </main>
  <Tabbar />
</template>
