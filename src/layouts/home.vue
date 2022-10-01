<script lang="ts">
import Tabbar from '../components/Tabbar.vue'

export default {
  components: {
    Tabbar,
  },
}
</script>

<template>
  <main>
    <RouterView />
    <Footer />
  </main>
  <Tabbar />
</template>
