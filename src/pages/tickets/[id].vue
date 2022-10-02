<script lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline/index.js'

export default {
  components: {
    ArrowLeftIcon,
  },
}
</script>

<template>
  <div class="min-h-100vh">
    <header class="flex items-center justify-between text-white mb-4">
      <button class="bg-orange-200 leading-none p-2 rounded-lg">
        <ArrowLeftIcon class="w-5 h-5 text-orange-500 top-0.5 relative" />
      </button>
      <h2>Your Booking Ticket</h2>
      <div class="w-9 h-9" />
    </header>
    <section class="space-y-4">
      <a
        href="#"
        class="block bg-white overflow-hidden rounded-lg"
      >
        <img
          alt="Office"
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="h-56 w-full object-cover"
        >

        <div class="p-6">
          <h5 class="text-xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h5>

          <p class="mt-2 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div
            class="mt-4 inline-block border-b border-blue-500 pb-1 font-medium text-blue-600"
          >
            Find out more
            <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </a>
      <div class="bg-white rounded-lg px-4 py-8">
        <div class="flex items-center justify-around">
          <div class="text-center p-4">
            <h4 class="font-bold text-3xl mb-1 text-orange-500">
              12
            </h4>
            <p class="text-gray-400">
              Queues
            </p>
          </div>
          <div class="text-center p-4">
            <h4 class="font-bold text-3xl mb-1 text-orange-500">
              47
            </h4>
            <p class="text-gray-400">
              Avg Minutes To Go
            </p>
          </div>
          <div class="text-center p-4">
            <h4 class="font-bold text-3xl mb-1 text-orange-500">
              5.5
            </h4>
            <p class="text-gray-400">
              KM Distance
            </p>
          </div>
        </div>

        <div class="">
          <h3 class="text-center font-bold my-4">
            Your Queue Number
          </h3>
          <p class="text-center text-5xl font-bold text-orange-500">
            AG123
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: bg-orange-500
</route>
