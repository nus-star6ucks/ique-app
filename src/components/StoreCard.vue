<script setup lang="ts">
import { MapPinIcon, UsersIcon } from '@heroicons/vue/24/outline/index.js'
import Stars from './Stars.vue'
import type { Store } from '~/api/models'

const props = defineProps<{
  store: Store
}>()
</script>

<template>
  <div
    class="overflow-hidden rounded-lg bg-white relative"
  >
    <img
      :src="props.store.resources.imageUrl"
      class="h-56 w-full object-cover rounded-lg"
    >
    <div class="absolute top-2 glassmorphism bg-white text-gray-700 text-center absolute left-2 z-10 text-xs rounded-md p-2" v-text="props.store.type" />

    <div class="relative px-6 py-4">
      <h3 class="text-lg font-bold mb-2" v-text="props.store.name" />
      <Stars :count="4" />
      <div class="mt-4 w-full flex items-center justify-between items-center text-gray-500 text-sm">
        <span class="flex items-center space-x-1">
          <MapPinIcon class="w-5" />
          <span>400m</span>
        </span>
      </div>
    </div>
  </div>
</template>
