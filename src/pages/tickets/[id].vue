<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline/index.js'
import { useRouteParams } from '@vueuse/router'
import { queueApi, storeApi } from '~/utils'

const ticketId = useRouteParams('id')
const { state: ticketsData } = useAsyncState(queueApi.ticketsGet(undefined, undefined, +ticketId).then(data => data.data), [])
const { state: storeData, isReady: isStoreDataReady } = useAsyncState(storeApi.storesGet(undefined, ticketsData.value?.[0]?.storeId).then(data => data.data), [])
</script>

<template>
  <div>
    <header class="flex items-center justify-between text-gray-800 mb-4">
      <button class="bg-white p-2 rounded-lg">
        <ArrowLeftIcon class="w-5 h-5 relative" />
      </button>
      <h2>Your Booking Ticket</h2>
      <div class="w-9 h-9" />
    </header>
    <section class="space-y-4">
      <div v-if="isStoreDataReady">
        <div class="overflow-hidden rounded-lg bg-center bg-cover h-36" style="background-image: url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80);" />
        <div class="bg-white overflow-hidden rounded-lg p-4 mx-4 -mt-12 shadow-gray-100 shadow-lg">
          <h2 class="text-lg font-bold" v-text="storeData[0].name" />
          <h3 class="text-lg font-bold">
            Point 29-30
          </h3>
          <p class="text-gray-500 text-sm mt-2">
            blablabla · 10:00 PM
          </p>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-gray-100 shadow-lg px-4 py-8">
        <div class="border-b border-dashed border-gray-200 pb-4 relative">
          <h3 class="text-center text-gray-400 mb-2 text-xl">
            Your Queue Number
          </h3>
          <p class="text-center text-5xl font-bold text-emerald-500">
            AG123
          </p>
        </div>
        <div class="grid grid-cols-2">
          <div class="p-4">
            <h4 class="text-gray-400 mb-2 text-base">
              Queue Type
            </h4>
            <p class="text-gray-800 font-semibold">
              123
            </p>
          </div>
        </div>
      </div>
      <ul class="px-8 list-disc text-gray-400 text-sm leading-6 block mx-auto">
        <li>
          Please ensure everyone is present when queue number is called.
        </li>
        <li>
          Ticket will not be valid if ticket exceeds 3 number or above.
        </li>
        <li>
          Dine-in is for up to groups of 5 fully vaccinated persons only
        </li>
        <li>
          For iOS users, please open this page in your browser(i.e. Safari) or kindly take a screenshot of this page.
        </li>
      </ul>
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
