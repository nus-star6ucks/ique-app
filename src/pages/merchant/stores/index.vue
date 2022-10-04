<scrip lang="ts" setup>
import { MapPinIcon } from '@heroicons/vue/24/outline/index.js'

export default {
  components: {
    MapPinIcon,
  },
}
</scrip>

<template>
  <div class="space-y-4">
    <header class="flex items-center justify-between mb-12">
      <h1 class="text-xl font-medium">
        Your Stores
      </h1>
    </header>

    <div class="grid grid-cols-2 gap-4">
      <section class="grid-rows-3">
        <a
          class="grid grid-cols-3 rounded-xl bg-white rounded-xl p-6"
          href="#"
        >
          <div class="col-span-2 row-span-3">
            <img
              src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
              class="rounded-xl"
            >
          </div>

          <div class="col-span-1 row-span-3 pl-6 space-y-2">
            <div class="row-span-1">
              <h2 class="font-semibold text-lg">The Deck</h2>
            </div>

            <div class="row-span-2">
              <MapPinIcon class="w-5" />
              Computing Dr
              National University of Singapore
            </div>

          </div>
        </a>
      </section>
      <section class="grid-rows-3">
        <a
          class="grid grid-cols-3 rounded-xl bg-white rounded-xl p-6"
          href="#"
        >
          <div class="col-span-2 row-span-3">
            <img
              src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
              class="rounded-xl"
            >
          </div>

          <div class="col-span-1 row-span-3 pl-6 space-y-2">
            <div class="row-span-1">
              <h2 class="font-semibold text-lg">Techno Edge</h2>
            </div>

            <div class="row-span-2">
              <MapPinIcon class="w-5" />
              2 Engineering Drive 4, Singapore 117584
            </div>

          </div>
        </a>
      </section>
      <section class="grid-rows-3">
        <a
          class="grid grid-cols-3 rounded-xl bg-white rounded-xl p-6"
          href="#"
        >
          <div class="col-span-2 row-span-3">
            <img
              src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
              class="rounded-xl"
            >
          </div>

          <div class="col-span-1 row-span-3 pl-6 space-y-2">
            <div class="row-span-1">
              <h2 class="font-semibold text-lg">Starbucks - University Town, NUS</h2>
            </div>

            <div class="row-span-2">
              <MapPinIcon class="w-5" />
              8 College Ave West, B1-01 University Town, Education Resource Centre, Singapore 138608
            </div>

          </div>
        </a>
      </section>
    </div>

    <div class="p-3 text-center w-50 rounded-lg uppercase underline underline-offset-4">
      <RouterLink to="/stores/register" class="text-gray-800 ">
        Register a store
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
