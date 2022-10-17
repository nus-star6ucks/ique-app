<script lang="ts" setup>
import { ArrowLeftIcon, CheckIcon, ForwardIcon, PhoneIcon, RocketLaunchIcon, XMarkIcon } from '@heroicons/vue/24/outline/index.js'
import { StopIcon } from '@heroicons/vue/24/solid/index.js'
import { useRouteParams } from '@vueuse/router'
import dayjs from 'dayjs'
import type { SeatType } from '~/api/models'
import { queueApi, storeApi } from '~/utils'

const keyword = ref<string>('')

const storeId = useRouteParams('id')
const { state: store, isLoading: isStoreLoading } = useAsyncState(storeApi.storesStoreIdGet(+storeId).then(d => d.data), undefined)
const { state: tickets, isLoading } = useAsyncState(queueApi.queuesTicketsGet(undefined, +storeId).then(d => d.data), [])

const filteredTickets = computed(() => tickets.value.filter(t => t.status === 'pending').filter(t => `${t.queueNumber}`.includes(keyword.value) || `${t.seatType.name}`.includes(keyword.value)))
const queues = computed(() => {
  const memo: Record<string, { seatType: SeatType; queueId: number; count: number }> = {}
  tickets.value.forEach((t) => {
    if (memo[t.queueId])
      return
    memo[t.queueId] = ({ seatType: t.seatType, queueId: t.queueId, count: tickets.value.filter(tk => t.queueId === tk.queueId).length })
  })
  return Object.values(memo)
})
</script>

<template>
  <div class="block relative col-span-3 p-8 h-100vh">
    <header class="flex items-center justify-between text-gray-800 mb-2">
      <RouterLink v-slot="{ navigate }" to="/merchant" custom>
        <button class="bg-white p-2 rounded-lg" @click="navigate">
          <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
        </button>
      </RouterLink>
      <h2>Store Detail</h2>
      <div class="w-9 h-9" />
    </header>
    <section class="mt-8 space-y-4 h-full overflow-auto">
      <Loading v-if="isStoreLoading" :loading="true" />
      <div v-if="store" class="grid grid-cols-2 gap-4">
        <section class="space-y-4 bg-white border px-6 py-4 border-gray-100 rounded-lg">
          <div class="flex items-start justify-between mb-8">
            <div>
              <h2 class="text-xl font-bold mb-2 leading-none" v-text="store.name" />
              <p class="text-gray-600" v-text="store.type" />
            </div>
            <span class="text-white px-6 py-1 text-xs bg-emerald-500 rounded-md">ACTIVE</span>
          </div>
          <div class="flex space-x-2">
            <div>
              <h3 class="text-2xl font-bold mb-1" v-text="tickets.filter(t => t.status === 'pending').length" />
              <p class="text-sm text-gray-400">
                Queueing
              </p>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-1" v-text="tickets.filter(t => t.status === 'seated').length" />
              <p class="text-sm text-gray-400">
                Served
              </p>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-1" v-text="queues.length" />
              <p class="text-sm text-gray-400">
                Active Queues
              </p>
            </div>
          </div>
        </section>
        <div class="grid grid-cols-2 gap-4">
          <button class="opacity-40 bg-emerald-50 text-emerald-500 rounded-lg flex flex-col items-center justify-center text-lg">
            <RocketLaunchIcon class="w-12 mb-4" />
            <span>Start Service</span>
          </button>
          <button class="bg-red-50 text-red-500 text-lg rounded-lg flex flex-col items-center justify-center text-lg">
            <StopIcon class="w-12 mb-4" />
            <span>Stop Service</span>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <article v-for="queue in queues" :key="queue.queueId" class="rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <p class="text-sm text-gray-500" v-text="queue.seatType.name" />
            <p class="text-2xl font-medium text-gray-900" v-text="queue.count" />
          </div>
        </article>
      </div>
    </section>
  </div>
  <aside class="bg-white col-span-2 p-8 flex flex-col justify-between h-100vh">
    <header class="flex items-center justify-center text-gray-800 mb-2 h-9">
      <h2>
        Queueing Tickets
      </h2>
    </header>
    <section class="mt-8 space-y-4 h-full overflow-auto">
      <Loading v-if="isLoading" :loading="true" />
      <article v-for="ticket in filteredTickets" :key="ticket.id" class="rounded-lg overflow-hidden border border-gray-100 bg-white flex items-center justify-between">
        <div class="p-4">
          <div>
            <h3 class="text-xl font-medium text-gray-900 space-x-2 whitespace-nowrap">
              <span v-text="ticket.seatType.name" />
              <span v-text="ticket.queueNumber" />
            </h3>
          </div>
          <div class="mt-1 flex">
            <p class="text-xs">
              <span class="text-gray-500" v-text="dayjs(ticket.startTime).toNow()" />
            </p>
          </div>
        </div>

        <div class="flex">
          <button class="text-center text-sm bg-sky-500 text-white px-4 py-6 flex flex-col items-center">
            <PhoneIcon class="w-6" />
            <span class="mt-2">Call</span>
          </button>
          <button class="text-center text-sm bg-yellow-500 text-white px-4 py-6 flex flex-col items-center">
            <ForwardIcon class="w-6" />
            <span class="mt-2">Skip</span>
          </button>
          <button class="text-center text-sm bg-emerald-500 text-white px-4 py-6 flex flex-col items-center">
            <CheckIcon class="w-6" />
            <span class="mt-2">Checkin</span>
          </button>
        </div>
      </article>
    </section>
    <div class="mt-8">
      <div class="relative">
        <input v-model="keyword" placeholder="Search..." name="keyword" type="text" class="px-4 pr-14 w-full border border-gray-100 bg-gray-50 rounded-lg py-2" minlength="6">
        <a v-if="!!keyword" href="javascript:;" class="absolute inset-y-0 right-4 top-2 inline-flex" @click="keyword = ''">
          <XMarkIcon class="w-6 h-6 text-gray-400" />
        </a>
      </div>
    </div>
  </aside>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh grid grid-cols-5 p-0 merchant
</route>

