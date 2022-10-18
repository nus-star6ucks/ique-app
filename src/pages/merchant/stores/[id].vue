<script lang="ts" setup>
import { ArrowLeftIcon, CheckIcon, ForwardIcon, PhoneIcon, RocketLaunchIcon, XMarkIcon } from '@heroicons/vue/24/outline/index.js'
import { StopIcon } from '@heroicons/vue/24/solid/index.js'
import { useRouteParams } from '@vueuse/router'
import dayjs from 'dayjs'
import { useRequest } from 'vue-request'
import type { SeatType } from '~/api/models'
import { useSnackStore } from '~/stores/snack'
import { queueApi, storeApi } from '~/utils'
import { UserUserTypeEnum } from '~/api/models'

const snackStore = useSnackStore()

const keyword = ref<string>('')

const storeId = useRouteParams('id')

const { run: startService, loading: startServiceLoading } = useRequest(() => storeApi.storesStartPost(+storeId), {
  manual: true,
  onSuccess() {
    snackStore.show({ mode: 'success', message: 'Started successfully!' })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
})

function confirmStartService() {
  // eslint-disable-next-line no-alert
  if (window.confirm('Are you sure to start the service?'))
    startService()
}

const { run: stopService, loading: stopServiceLoading } = useRequest(() => storeApi.storesStopPost(+storeId), {
  manual: true,
  onSuccess() {
    snackStore.show({ mode: 'success', message: 'Stopped successfully!' })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
})

function confirmStopService() {
  // eslint-disable-next-line no-alert
  if (window.confirm('Are you sure to stop the service?'))
    stopService()
}

const { data: store, loading: isStoreLoading } = useRequest(storeApi.storesStoreIdGet(+storeId).then(d => d.data), {
  refreshDeps: [startServiceLoading, stopServiceLoading],
})

const ticketsProcessing = ref<Record<string, unknown>>({})
const { run: callTicket, loading: callTicketLoading } = useRequest((ticketId: number) => queueApi.queuesCallPost(`${ticketId}`), {
  manual: true,
  onBefore([ticketId]) {
    ticketsProcessing.value = { ...ticketsProcessing.value, [ticketId]: true }
  },
  onSuccess() {
    snackStore.show({ mode: 'success', message: 'Called successfully!' })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
  onAfter([ticketId]) {
    delete ticketsProcessing.value[ticketId]
    ticketsProcessing.value = { ...ticketsProcessing.value }
  },
})

const { run: skipTicket, loading: skipTicketLoading } = useRequest((ticketId: number) => queueApi.queuesSkipPost(`${ticketId}`), {
  manual: true,
  onBefore([ticketId]) {
    ticketsProcessing.value = { ...ticketsProcessing.value, [ticketId]: true }
  },
  onSuccess() {
    snackStore.show({ mode: 'success', message: 'Skipped successfully!' })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
  onAfter([ticketId]) {
    delete ticketsProcessing.value[ticketId]
    ticketsProcessing.value = { ...ticketsProcessing.value }
  },
})

const { run: checkinTicket, loading: checkinTicketLoading } = useRequest((ticketId: number) => queueApi.queuesCheckinPost(`${ticketId}`), {
  manual: true,
  onBefore([ticketId]) {
    ticketsProcessing.value = { ...ticketsProcessing.value, [ticketId]: true }
  },
  onSuccess() {
    snackStore.show({ mode: 'success', message: 'Checked in successfully!' })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
  onAfter([ticketId]) {
    delete ticketsProcessing.value[ticketId]
    ticketsProcessing.value = { ...ticketsProcessing.value }
  },
})

const { data: tickets, loading: isLoading } = useRequest(queueApi.queuesTicketsGet(undefined, +storeId).then(d => d.data), {
  refreshDeps: [callTicketLoading, skipTicketLoading, checkinTicketLoading, startServiceLoading],
})
const filteredTickets = computed(() => tickets.value?.filter(t => t.status === 'pending').filter(t => `${t.queueNumber}`.includes(keyword.value) || `${t.seatType.name}`.includes(keyword.value)))
const queues = computed(() => {
  if (!tickets.value)
    return []

  // get queues by tickets
  const memo: Record<string, { seatType: SeatType; queueId: number; count: number }> = {}
  tickets.value.forEach((t) => {
    if (memo[t.queueId])
      return
    memo[t.queueId] = ({ seatType: t.seatType, queueId: t.queueId, count: tickets.value?.filter(tk => t.queueId === tk.queueId).length || 0 })
  })
  return Object.values(memo)
})
</script>

<template>
  <WithAuth :user-type="UserUserTypeEnum.Merchant">
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
              <span v-if="store.status === 'onService'" class="text-white px-6 py-1 text-xs bg-emerald-500 rounded-md uppercase">on service</span>
              <span v-if="store.status === 'stopService'" class="text-white px-6 py-1 text-xs bg-red-500 rounded-md uppercase">out of service</span>
            </div>
            <div v-if="tickets" class="flex space-x-2">
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
            <button :disabled="startServiceLoading || store.status === 'onService'" class="bg-emerald-50 text-emerald-500 rounded-lg flex flex-col items-center justify-center text-lg" @click="confirmStartService">
              <RocketLaunchIcon class="w-12 mb-4" />
              <span>Start Service</span>
            </button>
            <button :disabled="stopServiceLoading || store.status === 'stopService'" class="bg-red-50 text-red-500 text-lg rounded-lg flex flex-col items-center justify-center text-lg" @click="confirmStopService">
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
        <div v-if="store?.status === 'stopService'" class="relative rounded-lg border border-gray-200 p-8 text-center opacity-70">
          <h2 class="text-2xl font-medium uppercase">
            Out of Service
          </h2>
          <p class="mt-4 text-sm text-gray-500">
            Click on Start Service to queue up!
          </p>
        </div>
        <template v-else>
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
              <button class="text-center text-sm bg-sky-500 text-white px-4 py-6 flex flex-col items-center" :disabled="Object.keys(ticketsProcessing).includes(`${ticket.id}`)" @click="callTicket(ticket.id)">
                <PhoneIcon class="w-6" />
                <span class="mt-2">Call</span>
              </button>
              <button class="text-center text-sm bg-yellow-500 text-white px-4 py-6 flex flex-col items-center" :disabled="Object.keys(ticketsProcessing).includes(`${ticket.id}`)" @click="skipTicket(ticket.id)">
                <ForwardIcon class="w-6" />
                <span class="mt-2">Skip</span>
              </button>
              <button class="text-center text-sm bg-emerald-500 text-white px-4 py-6 flex flex-col items-center" :disabled="Object.keys(ticketsProcessing).includes(`${ticket.id}`)" @click="checkinTicket(ticket.id)">
                <CheckIcon class="w-6" />
                <span class="mt-2">Checkin</span>
              </button>
            </div>
          </article>
        </template>
      </section>
      <div v-if="store?.status === 'onService'" class="mt-8">
        <div class="relative">
          <input v-model="keyword" placeholder="Search..." name="keyword" type="text" class="px-4 pr-14 w-full border border-gray-100 bg-gray-50 rounded-lg py-2" minlength="6">
          <a v-if="!!keyword" href="javascript:;" class="absolute inset-y-0 right-4 top-2 inline-flex" @click="keyword = ''">
            <XMarkIcon class="w-6 h-6 text-gray-400" />
          </a>
        </div>
      </div>
    </aside>
  </WithAuth>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh grid grid-cols-5 p-0 merchant
</route>

