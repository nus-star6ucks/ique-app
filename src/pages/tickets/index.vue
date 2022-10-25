<script lang="ts" setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline/index.js'
import { useRequest } from 'vue-request'
import { useUserStore } from '~/stores/user'
import { queueApi, storeApi } from '~/utils'
import Loading from '~/components/Loading.vue'
import WithAuth from '~/components/WithAuth.vue'
import { useNotificationDotStore } from '~/stores/notificationDot'

const { user } = useUserStore()
const { setNotificationDot } = useNotificationDotStore()

const { data: tickets, loading: isLoading } = useRequest(async () => {
  if (!user)
    return []
  const { data: tickets } = await queueApi.queuesTicketsGet(user.id)
  return Promise.all(tickets.map(async (ticket) => {
    const { data: storeData } = await storeApi.storesStoreIdGet(ticket.storeId)
    const { data: queueData } = await queueApi.queuesTicketsTicketIdGet(ticket.ticketId)

    return {
      ...ticket,
      store: storeData,
      queue: queueData,
    }
  }))
})

onMounted(() => {
  setNotificationDot(false)
})
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
    <div class="space-y-4 mb-20">
      <Loading :loading="isLoading" />
      <EmptyBlock v-if="tickets?.length === 0" :cover="true" />
      <template v-else>
        <RouterLink
          v-for="ticket in tickets"
          :key="ticket.ticketId"
          class="group grid grid-cols-5 overflow-hidden rounded-xl"
          :to="`/tickets/${ticket.ticketId}`"
        >
          <div class="col-span-2 relative rounded-xl overflow-hidden p-2">
            <img
              :src="ticket.store.resources.imageUrl"
              class="absolute inset-0 h-full w-full object-cover z-0"
            >
          </div>

          <div class="col-span-3">
            <div class="my-4 p-6 bg-white rounded-xl">
              <h3 class="mt-2 text-lg text-gray-800 font-bold" v-text="`${ticket.queueNumber} - ${ticket.seatType.name}`" />
              <p class="mt-2 text-sm text-gray-500" v-text="ticket.store.name" />
            </div>
          </div>
        </RouterLink>
      </template>
    </div>
  </WithAuth>
</template>

<route lang="yaml">
meta:
  layout: home
  classNames: with-tabbar
</route>
