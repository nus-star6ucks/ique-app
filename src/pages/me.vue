<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, HeartIcon } from '@heroicons/vue/24/outline/index.js'
</script>

<template>
  <div class="text-white bg-emerald-500 -m-8 p-8">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-2xl font-semibold mb-2">
          :-)
        </p>
        <h1 class="text-3xl font-semibold">
          Dragon Lee
        </h1>
      </div>
      <a>
        <div class="w-14 h-14 rounded-md bg-contain" style="background-image: url('https://avatars.githubusercontent.com/u/3370745?v=4')" />
      </a>
    </div>
    <div class="flex space-x-8 mt-8">
      <div>
        <h3 class="font-semibold text-xl mb-1">
          199
        </h3>
        <p class="text-gray-200">
          Foos
        </p>
      </div>
      <div>
        <h3 class="font-semibold text-xl mb-1">
          19
        </h3>
        <p class="text-gray-200">
          Bar
        </p>
      </div>
      <div>
        <h3 class="font-semibold text-xl mb-1">
          30
        </h3>
        <p class="text-gray-200">
          Baz
        </p>
      </div>
    </div>
  </div>
  <div class="mt-12">
    <ul class="menu">
      <li>
        <span class="icon"><ArrowLeftOnRectangleIcon class="w-6 h-6" /></span>
        <span class="text">Foo Bar Baz</span>
      </li>
      <li>
        <span class="icon"><ArrowLeftOnRectangleIcon class="w-6 h-6" /></span>
        <span class="text">Bar</span>
      </li>
      <li>
        <span class="icon"><HeartIcon class="w-6 h-6" /></span>
        <span class="text">Rate Us</span>
      </li>
      <li>
        <span class="icon"><ArrowLeftOnRectangleIcon class="w-6 h-6" /></span>
        <span class="text">Logout</span>
      </li>
    </ul>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  classNames: me
  themeColor: '#10b981'
</route>

