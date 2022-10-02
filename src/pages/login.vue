<script lang="ts">
import { ArrowLeftIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'

export default {
  components: {
    ArrowLeftIcon, UserIcon, LockClosedIcon,
  },
}
</script>

<template>
  <div>
    <header class="flex items-center justify-between">
      <button class="bg-white p-2 rounded-lg">
        <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
      </button>
      <RouterLink to="/signup" class="text-gray-800">
        Signup
      </RouterLink>
    </header>

    <form class="form-auth mt-24 space-y-16">
      <h2 class="font-semibold text-3xl pt-8">
        Welcome Back
      </h2>
      <div class="space-y-4">
        <div class="relative">
          <div class="absolute inset-y-0 left-4 top-4 inline-flex">
            <UserIcon class="w-6 h-6 text-gray-400" />
          </div>
          <input placeholder="Username" required type="text" class="px-6 pl-14" minlength="6">
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-4 top-4 inline-flex">
            <LockClosedIcon class="w-6 h-6 text-gray-400" />
          </div>
          <input placeholder="Password" minlength="6" required class="px-6 pl-14" type="password">
        </div>
        <div class="relative space-x-2">
          <label>
            <input required type="checkbox">
            <span class="ml-2 text-gray-600">Remember me</span>
          </label>
        </div>
      </div>
      <div>
        <button type="submit" class="text-center w-full bg-emerald-500 shadow-md shadow-emerald-500/40 text-white rounded-lg uppercase py-4">
          Login
        </button>
        <p class="text-center mt-4 text-gray-500 px-4 text-sm">
          By clicking Login, you agree to your <a href="javascript:;">Terms and Conditions</a> and <a href="javascript:;">Privacy Statement</a>
        </p>
      </div>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
