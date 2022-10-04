<script setup lang="ts">
import type { Store } from '~/api/models'

const props = defineProps<{
  store: Store
}>()
</script>

<template>
  <div
    class="group grid grid-cols-3 overflow-hidden rounded-xl bg-white rounded-xl p-6"
  >
    <div class="col-span-1 relative overflow-hidden rounded-xl">
      <div class="glassmorphism bg-white text-gray-700 text-center absolute bottom-2 left-2 z-10 text-xs rounded-md p-2" v-text="props.store.type" />
      <img
        :src="props.store.resources.imageUrl"
        class="inset-0 h-full w-full object-cover z-0"
      >
    </div>
    <div class="col-span-2">
      <div class="pl-6 space-y-2 min-h-32 relative">
        <h3 class="font-semibold text-lg" v-text="props.store.name" />
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
  </div>
</template>
