<script lang="ts" setup>
import { ChevronRightIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/vue/24/outline/index.js'
</script>

<template>
  <div class="space-y-4">
    <header class="flex items-center justify-between mb-12">
      <h1 class="text-xl font-medium">
        iQue
      </h1>
      <button class="rounded-xl bg-white p-2 leading-none">
        <MagnifyingGlassIcon class="w-4 h-4" />
      </button>
    </header>
    <div class="p-6 rounded-lg bg-white relative">
      <div>
        <h2 class="text-2xl uppercase mb-4 font-light">
          Welcome to iQue
        </h2>
        <!-- border-emerald-500 text-emerald-500  -->
        <button class="border rounded-lg p-2 border-gray-800 flex items-center text-sm">
          <span>Sign up or login to start</span> <ChevronRightIcon class="w-4" />
        </button>
      </div>
      <img src="/assets/banner.svg" class="w-32 absolute right-2 bottom-6">
    </div>
    <section class="space-x-4 overflow-x-scroll no-scrollbar whitespace-nowrap">
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-emerald-500 text-white px-4 py-2 rounded-lg">
        Fastest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
    </section>
    <section class="space-y-4">
      <a
        class="group grid grid-cols-3 overflow-hidden rounded-xl bg-white rounded-xl p-6"
        href="#"
      >
        <div class="col-span-1 relative overflow-hidden rounded-xl">
          <div class="glassmorphism bg-white text-gray-700 text-center absolute bottom-2 left-2 z-10 text-xs rounded-md p-2">Western</div>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
            class="inset-0 h-full w-full object-cover z-0"
          >
        </div>
        <div class="col-span-2">
          <div class="pl-6 space-y-2 min-h-32 relative">
            <h3 class="font-semibold text-lg">The Deck</h3>
            <Stars :count="4" />

            <div class="absolute bottom-0 w-full pr-6 flex items-center justify-between items-center text-gray-500">
              <span>
                20 foodies waiting
              </span>
              <span class="flex items-center space-x-1">
                <MapPinIcon class="w-5" />
                <span>400m</span>
              </span>
            </div>
          </div>
        </div>
      </a>
      <a
        class="group grid grid-cols-3 overflow-hidden rounded-xl bg-white rounded-xl p-6"
        href="#"
      >
        <div class="col-span-1 relative overflow-hidden rounded-xl">
          <div class="glassmorphism bg-white text-gray-700 text-center absolute bottom-2 left-2 z-10 text-xs rounded-md p-2">Western</div>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
            class="inset-0 h-full w-full object-cover z-0"
          >
        </div>
        <div class="col-span-2">
          <div class="pl-6 space-y-2 min-h-32 relative">
            <h3 class="font-semibold text-lg -mb-1">The Techno Edge</h3>
            <Stars :count="4" />
            <div class="absolute bottom-0 w-full pr-6 flex items-center justify-between items-center text-gray-500">
              <span>
                20 foodies waiting
              </span>
              <span class="flex items-center space-x-1">
                <MapPinIcon class="w-5" />
                <span>400m</span>
              </span>
            </div>
          </div>
        </div>
      </a>
      <a
        class="group grid grid-cols-3 overflow-hidden rounded-xl bg-white rounded-xl p-6"
        href="#"
      >
        <div class="col-span-1 relative overflow-hidden rounded-xl">
          <div class="glassmorphism bg-white text-gray-700 text-center absolute bottom-2 left-2 z-10 text-xs rounded-md p-2">Western</div>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
            class="inset-0 h-full w-full object-cover z-0"
          >
        </div>
        <div class="col-span-2">
          <div class="pl-6 space-y-2 min-h-32 relative">
            <h3 class="font-semibold text-lg -mb-1">The Terrace</h3>
            <Stars :count="4" />
            <div class="absolute bottom-0 w-full pr-6 flex items-center justify-between items-center text-gray-500">
              <span>
                20 foodies waiting
              </span>
              <span class="flex items-center space-x-1">
                <MapPinIcon class="w-5" />
                <span>400m</span>
              </span>
            </div>
          </div>
        </div>
      </a>
      <a
        class="group grid grid-cols-3 overflow-hidden rounded-xl bg-white rounded-xl p-6"
        href="#"
      >
        <div class="col-span-1 relative overflow-hidden rounded-xl">
          <div class="glassmorphism bg-white text-gray-700 text-center absolute bottom-2 left-2 z-10 text-xs rounded-md p-2">Western</div>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
            class="inset-0 h-full w-full object-cover z-0"
          >
        </div>
        <div class="col-span-2">
          <div class="pl-6 space-y-2 min-h-32 relative">
            <h3 class="font-semibold text-lg -mb-1">The Frontier</h3>
            <Stars :count="4" />
            <div class="absolute bottom-0 w-full pr-6 flex items-center justify-between items-center text-gray-500">
              <span>
                20 foodies waiting
              </span>
              <span class="flex items-center space-x-1">
                <MapPinIcon class="w-5" />
                <span>400m</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
