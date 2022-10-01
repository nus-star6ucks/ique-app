<script lang="ts">
import { ArrowLeftIcon, LockClosedIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'

export default {
  components: {
    ArrowLeftIcon, UserIcon, PhoneIcon, LockClosedIcon,
  },
}
</script>

<template>
  <div>
    <header class="flex items-center justify-between">
      <button class="bg-orange-100 leading-none p-2 rounded-lg">
        <ArrowLeftIcon class="w-5 h-5 text-orange-500" />
      </button>
      <RouterLink to="/login" class="text-orange-500">
        Login
      </RouterLink>
    </header>

    <form class="form-auth mt-24 space-y-16">
      <h2 class="font-semibold text-3xl pt-16">
        Join Us
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
            <PhoneIcon class="w-6 h-6 text-gray-400" />
          </div>
          <input placeholder="Phone" type="text" class="px-6 pl-14" required>
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-4 top-4 inline-flex">
            <LockClosedIcon class="w-6 h-6 text-gray-400" />
          </div>
          <input placeholder="Password" minlength="6" required class="px-6 pl-14" type="password">
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-4 top-4 inline-flex">
            <LockClosedIcon class="w-6 h-6 text-gray-400" />
          </div>
          <input placeholder="Password Confirmation" minlength="6" required class="px-6 pl-14" type="password">
        </div>
      </div>
      <div>
        <button type="submit" class="text-center w-full bg-teal-500 text-white rounded-lg uppercase py-4">
          Sign up
        </button>
        <p class="text-center mt-4 text-gray-400 px-4">
          By clicking Sign up, you agree to your <a href="javascript:;">Terms and Conditions</a> and <a href="javascript:;">Privacy Statement</a>
        </p>
      </div>
    </form>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
