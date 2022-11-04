<script setup lang="ts">
useHead({
  title: "iQue",
  meta: [
    {
      name: "theme-color",
      content: "#10b981",
    },
  ],
});
</script>

<template>
  <div class="min-h-85vh max-h-90vh flex-col justify-between flex h-full">
    <header class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-medium">iQue</h1>
      <RouterLink class="text-gray-400 text-base" to="/"> Not now </RouterLink>
    </header>
    <img src="/assets/login.svg" />
    <section class="my-2 space-y-4">
      <div class="mb-8 space-y-2">
        <h2 class="text-3xl font-bold">Queue Better,</h2>
        <h3 class="text-3xl font-bold">Enjoy Life Happier.</h3>
      </div>
      <div>
        <RouterLink
          to="/login"
          class="block text-center w-full bg-emerald-500 shadow-md shadow-emerald-500/40 text-white rounded-lg uppercase py-4"
        >
          Login
        </RouterLink>
        <p class="text-center mt-4 text-gray-400 px-4">
          or
          <RouterLink
            to="/signup"
            class="text-emerald-500 border-b border-b-emerald-500"
          >
            Sign up
          </RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>
