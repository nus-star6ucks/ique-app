<script lang="ts" setup>
import { BuildingStorefrontIcon } from '@heroicons/vue/24/outline/index.js'

const username = ref<string>('')
const password = ref<string>('')
const phoneNumber = ref<string>('')
</script>

<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <main
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <BuildingStorefrontIcon class="block text-emerald-500 w-24" />
          <h1
            class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            Join Us
          </h1>

          <form class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label for="username" class="block text-gray-700">
                Username
              </label>
              <input
                v-model.trim="username" placeholder="Username" name="username" required type="text"
                class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
              >
            </div>

            <div class="col-span-6">
              <label for="password" class="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
              >
            </div>

            <div class="col-span-6">
              <label for="phoneNumber" class="block text-gray-700">
                Phone
              </label>
              <input
                id="phoneNumber"
                v-model="phoneNumber"
                name="phoneNumber"
                type="phoneNumber"
                class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
              >
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                class="inline-block shrink-0 rounded-md border border-emerald-500 bg-emerald-500 px-12 py-3 text-white transition hover:bg-transparent hover:text-emerald-500 focus:outline-none focus:ring active:text-emerald-500"
              >
                Register
              </button>

              <p class="mt-4 text-gray-500 sm:mt-0 w-72">
                Have an account already?
                <RouterLink to="/merchant/login" class="text-gray-700 underline">
                  Login Now
                </RouterLink>
              </p>
            </div>
          </form>
        </div>
      </main>
      <aside
        class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt="Pattern"
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format"
          class="absolute inset-0 h-full w-full object-cover"
        >
      </aside>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh p-0
</route>

