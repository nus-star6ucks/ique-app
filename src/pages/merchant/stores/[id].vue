<script lang="ts" setup>
import { ArrowLeftIcon, ArrowSmallRightIcon, CheckIcon, ClockIcon, ForwardIcon, PhoneIcon, PlusSmallIcon, RocketLaunchIcon, Cog6ToothIcon as SettingsIcon, UserGroupIcon, UserIcon, XMarkIcon } from '@heroicons/vue/24/outline/index.js'
import {
  Dialog, DialogPanel, DialogTitle, Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { StopIcon } from '@heroicons/vue/24/solid/index.js'
import { useRouteParams } from '@vueuse/router'
import dayjs from 'dayjs'
import { useRequest } from 'vue-request'
import axios from 'axios'
import Loading from '../../../components/Loading.vue'
import type { SeatType } from '~/api/models'
import { useSnackStore } from '~/stores/snack'
import { generateULong, queueApi, storeApi } from '~/utils'
import { UserUserTypeEnum } from '~/api/models'

const snackStore = useSnackStore()
const keyword = ref<string>('')
const storeId = useRouteParams('id')

// Switch Service
const { run: startService, loading: startServiceLoading } = useRequest(() => storeApi.storesStartPost(+storeId.value!), {
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

const { run: stopService, loading: stopServiceLoading } = useRequest(() => storeApi.storesStopPost(+storeId.value!), {
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
// Switch Service END

const { data: store, loading: isStoreLoading, run: refreshStore } = useRequest(() => storeApi.storesStoreIdGet(+storeId.value!).then(d => d.data), {
  refreshDeps: [startServiceLoading, stopServiceLoading],
})

const ticketsProcessing = ref<Record<string, unknown>>({})

// Call, Skip, Checkin
const { run: callTicket, loading: callTicketLoading } = useRequest((ticketId: number) => queueApi.queuesCallPost(ticketId), {
  manual: true,
  onBefore([ticketId]) {
    ticketsProcessing.value = { ...ticketsProcessing.value, [ticketId]: true }
  },
  onSuccess(_, [ticketId]) {
    snackStore.show({ mode: 'success', message: `#${ticketId} called successfully!` })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
  onAfter([ticketId]) {
    delete ticketsProcessing.value[ticketId]
    ticketsProcessing.value = { ...ticketsProcessing.value }
  },
})

const { run: skipTicket, loading: skipTicketLoading } = useRequest((ticketId: number) => queueApi.queuesSkipPost(ticketId), {
  manual: true,
  onBefore([ticketId]) {
    ticketsProcessing.value = { ...ticketsProcessing.value, [ticketId]: true }
  },
  onSuccess(_, [ticketId]) {
    snackStore.show({ mode: 'success', message: `#${ticketId} skipped successfully!` })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
  onAfter([ticketId]) {
    delete ticketsProcessing.value[ticketId]
    ticketsProcessing.value = { ...ticketsProcessing.value }
  },
})

const { run: checkinTicket, loading: checkinTicketLoading } = useRequest((ticketId: number) => queueApi.queuesCheckinPost(ticketId), {
  manual: true,
  onBefore([ticketId]) {
    ticketsProcessing.value = { ...ticketsProcessing.value, [ticketId]: true }
  },
  onSuccess(_, [ticketId]) {
    snackStore.show({ mode: 'success', message: `#${ticketId} checked in successfully!` })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
  onAfter([ticketId]) {
    delete ticketsProcessing.value[ticketId]
    ticketsProcessing.value = { ...ticketsProcessing.value }
  },
})
// Call, Skip, Checkin END

// Update SeatType
const isCoeSeatTypeModalOpen = ref<boolean>(false)

const defaultSeatTypeState = { id: 0, name: '' }
const selectedSeatType = ref<SeatType>(defaultSeatTypeState)
function setCoeSeatTypeModal(mode?: SeatType | 'create') {
  if (mode === 'create') {
    selectedSeatType.value = { ...defaultSeatTypeState, id: generateULong() }
    isCoeSeatTypeModalOpen.value = true
    return
  }
  if (!mode) {
    selectedSeatType.value = defaultSeatTypeState
    isCoeSeatTypeModalOpen.value = false
    return
  }
  selectedSeatType.value = { ...mode }
  isCoeSeatTypeModalOpen.value = true
}
// Update SeatType END

const isReportIframeOpen = ref<string>('')

const { loading: seatTypesLoading, run: updateSeatTypes } = useRequest((seatTypes: SeatType[]) => storeApi.storesPut({ id: +storeId.value!, ...(store.value as any), seatTypes }), {
  manual: true,
  onSuccess() {
    snackStore.show({ mode: 'success', message: 'Updated successfully!' })
    setCoeSeatTypeModal()
    refreshStore()
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
})

const { data: tickets, loading: isLoading } = useRequest(() => queueApi.queuesTicketsGet(undefined, +storeId.value!).then(d => d.data), {
  refreshDeps: [callTicketLoading, skipTicketLoading, checkinTicketLoading, startServiceLoading, seatTypesLoading],
  pollingInterval: 5000,
})
const filteredTickets = computed(() => tickets.value?.filter(t => t.status === 'pending').filter(t => `${t.queueNumber}`.includes(keyword.value) || `${t.seatType.name}`.includes(keyword.value)))

const { data: reports, loading: isReportsLoading } = useRequest(() => axios.get('/cf/get-reports', {
  params: {
    storeId: storeId.value,
  },
}).then(d => d.data), {
  pollingInterval: 10000,
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
})

const { loading: isReportGenerating, run: generateReport } = useRequest((reportType = 'NUM') => axios.post('/cf/generate-report', {
  storeId: storeId.value,
  reportType,
  unit: 'week',
}), {
  manual: true,
  onSuccess() {
    snackStore.show({ message: 'Task is inprogress, please refresh and wait for a while.', mode: 'success' })
  },
  onError() {
    snackStore.show({ mode: 'error', message: 'Unexpected error!' })
  },
})

// get seatTypes by store
const seatTypes = computed(() => store.value?.seatTypes || [])

// Get queues by tickets
const queues = computed(() => {
  if (!store.value)
    return []

  return store.value.queuesInfo.filter(qI => qI.queueId).map((q, index) => {
    const ticketsInQueue = tickets.value?.filter(tk => q.queueId === tk.queueId) || []
    return {
      ...q,
      count: ticketsInQueue.length || 0,
      firstQueueNo: ticketsInQueue.length > 0 ? ticketsInQueue[0].queueNumber : 0,
      firstTicketId: ticketsInQueue.length > 0 ? ticketsInQueue[0].ticketId : 0,
    }
  })
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
        <h2 v-text="store?.name || 'Store Detail'" />
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
              <span v-if="store.status === 'stopService'" class="text-white px-6 py-1 text-xs bg-red-500 rounded-md uppercase">off service</span>
            </div>
            <div v-if="tickets && store.status === 'onService'" class="flex space-x-2">
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
        <div class="pb-12">
          <div class="mb-2 flex items-center justify-between">
            <h3 class="text-xl font-bold">
              Queues
            </h3>
            <button class="bg-emerald-500 items-center flex rounded-md text-white text-sm py-1 px-2 mr-4" @click="setCoeSeatTypeModal('create')">
              <span>New</span>
            </button>
          </div>
          <div class="bg-white overflow-hidden rounded-lg p-4">
            <ul class="divide-y divide-gray-100">
              <template v-if="queues.length > 0">
                <li v-for="q in queues" :key="q.queueId" class="flex items-center justify-between py-4">
                  <p class="flex">
                    <span class="text-gray-600" v-text="q.seatType.name" />
                    <button class="text-xs flex items-center ml-2 bg-gray-100 text-gray-500 p-1 rounded-md" @click="setCoeSeatTypeModal(q.seatType)">
                      <SettingsIcon class="w-3.5 mt-0.5 mr-1" />
                      <span>Settings</span>
                    </button>
                  </p>
                  <div class="space-x-2 flex items-center text-sm">
                    <span class="flex items-center text-gray-600 mr-2 justify-start min-w-12">
                      <ArrowSmallRightIcon class="w-4 h-4 text-gray-400" />
                      <span class="ml-1" v-text="`#${q.firstQueueNo}`" />
                    </span>
                    <span class="flex items-center text-gray-600 pr-4">
                      <UserIcon class="w-4 h-4 text-gray-400" />
                      <span class="ml-1" v-text="q.count" />
                    </span>
                    <button class="bg-sky-500 rounded-md text-white text-sm py-1 px-2" :disabled="Object.keys(ticketsProcessing).includes(`${q.firstTicketId}`)" @click="callTicket(q.firstTicketId)">
                      Call
                    </button>
                    <button class="bg-yellow-500 rounded-md text-white text-sm py-1 px-2" :disabled="Object.keys(ticketsProcessing).includes(`${q.firstTicketId}`)" @click="skipTicket(q.firstTicketId)">
                      Skip
                    </button>
                    <button class="bg-emerald-500 rounded-md text-white text-sm py-1 px-2" :disabled="Object.keys(ticketsProcessing).includes(`${q.firstTicketId}`)" @click="checkinTicket(q.firstTicketId)">
                      Checkin
                    </button>
                  </div>
                </li>
              </template>
              <template v-else>
                <li v-for="seatType in seatTypes" :key="seatType.id" class="flex items-center justify-between py-4">
                  <p class="flex">
                    <span class="text-gray-600" v-text="seatType.name" />
                    <button class="text-xs flex items-center ml-2 bg-gray-100 text-gray-500 p-1 rounded-md" @click="setCoeSeatTypeModal(seatType)">
                      <SettingsIcon class="w-3.5 mt-0.5 mr-1" />
                      <span>Settings</span>
                    </button>
                  </p>
                  <div class="space-x-2 flex items-center text-sm">
                    <button class="bg-gray-500 rounded-md text-white text-sm py-1 px-2" :disabled="true">
                      Waiting for starting service
                    </button>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="pb-12">
          <div class="mb-2 flex items-center justify-between">
            <h3 class="text-xl font-bold">
              Reports
            </h3>

            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  :disabled="isReportGenerating"
                  class="bg-emerald-500 items-center flex rounded-md text-white text-sm py-1 px-2 mr-4"
                >
                  <PlusSmallIcon class="w-4" />
                  Generate
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md"
                >
                  <div class="p-2 space-y-2">
                    <MenuItem v-slot="{ active }">
                      <button
                        class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        :class="[
                          active ? 'bg-emerald-500 text-white' : 'text-gray-600',
                        ]" @click="generateReport('NUM')"
                      >
                        <UserGroupIcon class="w-5 mr-2" />

                        Volume Analysis
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        :class="[
                          active ? 'bg-emerald-500 text-white' : 'text-gray-600',
                        ]"
                        @click="generateReport('AWT')"
                      >
                        <ClockIcon class="w-5 mr-2" />
                        Average Waiting Time
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="bg-white overflow-hidden rounded-lg p-4">
            <Loading v-if="!reports && isReportsLoading" :loading="true" />
            <template v-else>
              <ul v-if="reports?.length > 0" class="divide-y divide-gray-100">
                <li v-for="report in reports" :key="report?.report_id" class="flex items-center justify-between py-4">
                  <p class="flex">
                    <a v-if="report.type === 'NUM'" href="javascript:;" class="text-gray-600 hover:text-emerald-500 transition flex items-center" @click="isReportIframeOpen = report.url">
                      <UserGroupIcon class="w-5 mr-2" />
                      Volume Analysis
                    </a>
                    <a v-if="report.type === 'AWT'" href="javascript:;" class="text-gray-600 hover:text-emerald-500 transition flex items-center" @click="isReportIframeOpen = report.url">
                      <ClockIcon class="w-5 mr-2" />
                      Average Waiting Time Report
                    </a>
                  </p>
                  <div class="space-x-2 flex items-center text-sm">
                    <span class="text-gray-600 text-sm" v-text="dayjs(report.create_time).fromNow()" />
                  </div>
                </li>
              </ul>
              <EmptyBlock v-else />
            </template>
          </div>
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
        <Loading v-if="!tickets && isLoading" :loading="true" />
        <div v-if="store?.status === 'stopService'" class="relative rounded-lg border border-gray-200 p-8 text-center opacity-70">
          <h2 class="text-2xl font-medium uppercase">
            Out of Service
          </h2>
          <p class="mt-4 text-sm text-gray-500">
            Click on Start Service to queue up!
          </p>
        </div>
        <template v-else>
          <EmptyBlock v-if="filteredTickets?.length === 0" />
          <template v-else>
            <article v-for="ticket in filteredTickets" :key="ticket.ticketId" class="rounded-lg overflow-hidden border border-gray-100 bg-white flex items-center justify-between">
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
                <button class="text-center text-sm bg-sky-500 text-white px-4 py-6 flex flex-col items-center" :disabled="Object.keys(ticketsProcessing).includes(`${ticket.ticketId}`)" @click="callTicket(ticket.ticketId)">
                  <PhoneIcon class="w-6" />
                  <span class="mt-2">Call</span>
                </button>
                <button class="text-center text-sm bg-yellow-500 text-white px-4 py-6 flex flex-col items-center" :disabled="Object.keys(ticketsProcessing).includes(`${ticket.ticketId}`)" @click="skipTicket(ticket.ticketId)">
                  <ForwardIcon class="w-6" />
                  <span class="mt-2">Skip</span>
                </button>
                <button class="text-center text-sm bg-emerald-500 text-white px-4 py-6 flex flex-col items-center" :disabled="Object.keys(ticketsProcessing).includes(`${ticket.ticketId}`)" @click="checkinTicket(ticket.ticketId)">
                  <CheckIcon class="w-6" />
                  <span class="mt-2">Checkin</span>
                </button>
              </div>
            </article>
          </template>
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
  <TransitionRoot appear :show="isCoeSeatTypeModalOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="setCoeSeatTypeModal()">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Create / Update a Queue
              </DialogTitle>
              <form class="my-4" @submit.prevent="seatTypes.map(st => st.id).includes(selectedSeatType.id) ? updateSeatTypes(seatTypes.map(s => s.id === selectedSeatType.id ? selectedSeatType : s)) : updateSeatTypes([...seatTypes, selectedSeatType])">
                <div class="space-y-2">
                  <!-- <div>
                    <label for="imageUrl" class="block text-gray-700">
                      ID (Cannot be changed)
                    </label>
                    <input
                      name="id"
                      readonly
                      :value="selectedSeatType.id"
                      class="p-2 mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-gray-400 border border-gray-200"
                    >
                  </div> -->
                  <div>
                    <label for="name" class="block text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      v-model="selectedSeatType.name"
                      type="text"
                      name="name"
                      required
                      class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                    >
                  </div>
                  <div class="space-x-3 pt-4">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 transition-all hover:bg-emerald-200 disabled:bg-gray-100 disabled:text-gray-600"
                    >
                      Submit
                    </button>
                    <button
                      v-if="seatTypes.map(s => s.id).includes(selectedSeatType.id)"
                      :disabled="seatTypesLoading"
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 transition-all hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-600"
                      @click="updateSeatTypes(seatTypes.filter(s => s.id === selectedSeatType.id))"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm text-gray-400"
                      @click="setCoeSeatTypeModal()"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot appear :show="!!isReportIframeOpen.trim()" as="template">
    <Dialog as="div" class="relative z-10" @close="isReportIframeOpen = ''">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-85vw h-85vh transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 mb-4"
              >
                Report Detail
              </DialogTitle>
              <iframe class="w-full h-full pb-8" :src="`//storage.googleapis.com/ique-app-reports${isReportIframeOpen}`" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh grid grid-cols-5 p-0 merchant
</route>

