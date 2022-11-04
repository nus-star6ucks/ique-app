<script setup lang="ts">
import { MapPinIcon, UsersIcon } from "@heroicons/vue/24/outline/index.js";
import Stars from "./Stars.vue";
import type { QueueTicket } from "~/api/models";

const props = defineProps<{
  ticket: QueueTicket;
}>();
</script>

<template>
  <div
    class="group grid grid-cols-3 overflow-hidden rounded-xl bg-white rounded-xl p-6"
  >
    <div class="col-span-1 relative overflow-hidden rounded-xl">
      <div
        class="glassmorphism bg-white text-gray-700 text-center absolute bottom-2 left-2 z-10 text-xs rounded-md p-2"
        v-text="props.store.type"
      />
      <img class="inset-0 h-full w-full object-cover z-0" />
    </div>
    <div class="col-span-2">
      <div class="pl-6 space-y-2 min-h-32 relative">
        <h3 class="font-semibold text-lg" />
        <Stars :count="4" />
        <div
          class="absolute bottom-0 w-full pr-6 flex items-center justify-between items-center text-gray-500"
        >
          <span class="flex items-center space-x-1">
            <UsersIcon class="w-5" />
            <span>20</span>
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
