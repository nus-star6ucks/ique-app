<script lang="ts" setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline/index.js'
import { useUserStore } from '~/stores/user'
import { queueApi, storeApi } from '~/utils'
import Loading from '~/components/Loading.vue'
import WithAuth from '~/components/WithAuth.vue'

const { user } = useUserStore()
const { state: tickets, isLoading } = useAsyncState(async () => {
  if (!user?.id)
    return []
  const { data: tickets } = await queueApi.ticketsGet(user?.id)
  return Promise.all(tickets.map(async (ticket) => {
    const { data: storeData } = await storeApi.storesIdGet(ticket.storeId)
    return {
      ...ticket,
      store: storeData,
    }
  }))
}, [])
</script>

<template>
  <WithAuth>
    <header class="flex items-center justify-between mb-8">
      <h1 class="text-xl font-medium">
        Tickets
      </h1>
      <button class="rounded-xl bg-white p-2 leading-none">
        <MagnifyingGlassIcon class="w-4 h-4" />
      </button>
    </header>
    <div class="space-y-4">
      <Loading :loading="isLoading" />
      <RouterLink
        v-for="ticket in tickets"
        :key="ticket.ticketId"
        class="group grid grid-cols-5 overflow-hidden rounded-xl"
        :to="`/tickets/${ticket.ticketId}`"
      >
        <div class="col-span-2 relative rounded-xl overflow-hidden p-2">
          <div class="glassmorphism bg-white text-gray-700 text-center absolute bottom-2 z-10 text-xs rounded-md p-2">
            Avg. 5min
          </div>
          <img
            :src="ticket.store.resources.imageUrl"
            class="absolute inset-0 h-full w-full object-cover z-0"
          >
        </div>

        <div class="col-span-3">
          <div class="my-4 p-6 bg-white rounded-xl">
            <h3>2 Groups Left</h3>
            <p class="mt-2 text-sm text-gray-400">
              AC123 - Queen Table (3-4 pax)
            </p>
            <p class="mt-2 text-sm text-gray-500" v-text="ticket.store.name" />
          </div>
        </div>
      </RouterLink>
    </div>
  </WithAuth>
</template>

<route lang="yaml">
meta:
  layout: home
  classNames: with-tabbar
</route>
