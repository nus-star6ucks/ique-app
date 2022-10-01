<script lang="ts">
export default {
  components: {
  },
}
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
      [Home Layout]
    </div>
  </main>
  <footer class="tabbar">
    <button class="tab active">
      <span>Home</span>
    </button>
    <button class="tab">
      <span>Notification</span>
    </button>
    <button class="tab">
      <span>Me</span>
    </button>
  </footer>
</template>
