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
  pollingInterval: 5000,
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
    const ticketsInQueue = tickets.value?.filter(tk => q.queueId === tk.queueId && tk.status === 'pending') || []
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
        <Loading :loading="isStoreLoading && !store" />
        <div v-if="store" class="grid grid-cols-2 gap-4">
          <section class="space-y-4 bg-white border px-6 py-4 border-gray-100 rounded-lg">
            <div class="flex items-start justify-between mb-8">
              <div>
                <h2 class="text-xl font-bold mb-2 leading-none" v-text="store.name" />
                <p class="text-gray-600" v-text="store.type" />
              </div>
              <span v-if="store.status === 'onService'" class="text-white px-6 py-1 text-xs bg-emerald-500 rounded-md uppercase">In Service</span>
              <span v-if="store.status === 'stopService'" class="text-white px-6 py-1 text-xs bg-red-500 rounded-md uppercase">out of service</span>
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
              <PlusSmallIcon class="w-4" />
              New
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
                  <div v-if="q.seatType.id" class="space-x-2 flex items-center text-sm">
                    <span class="flex items-center text-gray-600 mr-2 justify-start min-w-12">
                      <ArrowSmallRightIcon class="w-4 h-4 text-gray-400" />
                      <span class="ml-1" v-text="`#${q.firstQueueNo}`" />
                    </span>
                    <span class="flex items-center text-gray-600 pr-4">
                      <UserIcon class="w-4 h-4 text-gray-400" />
                      <span class="ml-1" v-text="q.count" />
                    </span>
                    <template v-if="store?.status === 'onService'">
                      <button class="bg-sky-500 rounded-md text-white text-sm py-1 px-2" :disabled="Object.keys(ticketsProcessing).includes(`${q.firstTicketId}`)" @click="callTicket(q.firstTicketId)">
                        Call
                      </button>
                      <button class="bg-yellow-500 rounded-md text-white text-sm py-1 px-2" :disabled="Object.keys(ticketsProcessing).includes(`${q.firstTicketId}`)" @click="skipTicket(q.firstTicketId)">
                        Skip
                      </button>
                      <button class="bg-emerald-500 rounded-md text-white text-sm py-1 px-2" :disabled="Object.keys(ticketsProcessing).includes(`${q.firstTicketId}`)" @click="checkinTicket(q.firstTicketId)">
                        Checkin
                      </button>
                    </template>
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
              <EmptyBlock v-else title="No Reports Available" description="Click Generate to get some reports" />
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
        <div v-if="store?.status === 'stopService'" class="relative rounded-lg border border-gray-200 p-8 text-center">
          <svg version="1.1" class="w-72 mx-auto" viewBox="0 0 1320.0 1040.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><clipPath id="56107116106549710511798120"><path d="M641,0 L641,705.8 L0,705.8 L0,0 L641,0 Z" /></clipPath><clipPath id="11310611854122118531204545"><path d="M554.6,0 L554.6,494.6 L0,494.6 L0,0 L554.6,0 Z" /></clipPath><clipPath id="115105101955310310549102100"><path d="M559.4,0 C562,0 564.2,2.1 564.2,4.8 L564.2,499.4 C564.2,502 562,504.2 559.4,504.2 L4.8,504.2 C2.1,504.2 0,502 0,499.4 L0,4.8 C0,2.2 2.1,0 4.8,0 Z M554.6,9.6 L9.6,9.6 L9.6,494.6 L554.6,494.6 L554.6,9.6 Z" /></clipPath><clipPath id="1171201061064910910910110455"><path d="M6.00029906,0 C9.31417273,0 12.0005981,2.6864254 12.0005981,6.00029906 C12.0005981,9.31417273 9.31417273,12.0005981 6.00029906,12.0005981 C2.6864254,12.0005981 0,9.31417273 0,6.00029906 C0,2.6864254 2.6864254,0 6.00029906,0 Z" /></clipPath><clipPath id="110106501084811457579757"><path d="M140.903428,96.8018926 C142.503428,122.801893 135.403428,144.001893 119.703428,160.001893 C91.5034281,188.701893 44.5034281,191.701893 28.9034281,191.801893 L30.6034281,270.501893 C30.7034281,273.101893 28.6034281,275.301893 25.9034281,275.401893 C25.8034281,275.501893 25.7034281,275.501893 25.7034281,275.501893 C23.1034281,275.501893 21.0034281,273.401893 20.9034281,270.801893 L19.1034281,187.201893 C19.1034281,185.901893 19.6034281,184.601893 20.5034281,183.701893 C21.4034281,182.801893 22.8034281,182.201893 24.1034281,182.301893 C24.7034281,182.301893 82.4034281,184.401893 112.803428,153.301893 C126.503428,139.301893 132.703428,120.501893 131.303428,97.4018926 C125.858428,9.0938926 12.1123781,9.5829526 5.08353651,9.6015646 L4.80342811,9.6018926 C2.20342811,9.6018926 0.103428111,7.5018926 0.00342811055,4.9018926 C-0.0965718895,2.2018926 2.00342811,0.101892598 4.70342811,0 C4.72942811,0 4.80646811,-0.000679242961 4.93254411,-0.00122255916 L5.45587611,-0.00162955778 C16.1187881,0.0244683797 135.143428,2.2418926 140.903428,96.8018926 Z" /></clipPath><clipPath id="113116121531051181215711048"><path d="M260.9,0 C263.6,0 265.7,2.1 265.7,4.8 C265.7,7.5 263.5,9.6 260.9,9.6 L4.8,9.6 C2.1,9.6 0,7.5 0,4.8 C0,2.1 2.1,0 4.8,0 L260.9,0 Z" /></clipPath><clipPath id="10111210201151021175154120"><path d="M211.7,0 C223.4,0 234.9,0.9 246.2,2.6 L246.2,12.3 C235,10.5 223.5,9.6 211.8,9.6 C120.1,9.6 41.7,67 10.3,147.6 L0,147.6 C31.8,61.5 114.7,0 211.7,0 Z" /></clipPath><clipPath id="115120118115112951045410697"><path d="M300.9,0 L300.9,331.3 L0,331.3 L0,0 L300.9,0 Z" /></clipPath><clipPath id="12112257100103480107117118"><path d="M238.3,0 L238.3,212.5 L0,212.5 L0,0 L238.3,0 Z" /></clipPath><clipPath id="104951181011215210857108104"><path d="M243.1,0 C243.4,0 243.7,0.1 244,0.1 C244.3,0.2 244.7,0.3 245,0.4 C245.1,0.5 245.3,0.5 245.4,0.6 C245.5,0.6 245.7,0.7 245.8,0.8 C246,0.9 246.1,1 246.2,1.1 C246.3,1.2 246.4,1.3 246.5,1.4 C246.6,1.5 246.7,1.6 246.8,1.7 C246.9,1.8 247,2 247.1,2.1 C247.2,2.3 247.2,2.4 247.3,2.5 L247.3,2.6 C247.4,2.8 247.5,2.9 247.5,3 L247.515625,3.090625 C247.54375,3.19375 247.6,3.325 247.6,3.4 L247.6488,3.46 C247.7,3.54 247.7,3.62 247.7,3.7 L247.7,3.9 C247.8,4 247.8,4.2 247.8,4.3 C247.8,4.4 247.8,4.6 247.6,4.7 L247.6,218.2 C247.6,218.3 247.5,218.5 247.5,218.6 C247.4,218.7 247.4,218.9 247.3,219 C247.2,219.1 247.2,219.3 247.1,219.4 C247,219.5 247,219.7 246.9,219.8 L246.840625,219.875 C246.79375,219.95 246.775,220.025 246.7,220.1 C246.6,220.2 246.6,220.2 246.5,220.3 C246.4,220.4 246.3,220.6 246.1,220.7 C246,220.8 245.9,220.9 245.8,221 L245.74,221.0592 C245.66,221.136 245.58,221.2 245.5,221.2 C245.5,221.2 245.4,221.3 245.3,221.3 C244.9,221.5 244.4,221.7 243.9,221.8 C243.6,221.9 243.3,221.9 243,221.9 L4.7,221.9 C4.4,221.9 4.1,221.8 3.8,221.8 C3.3,221.7 2.9,221.6 2.4,221.3 C2.4,221.3 2.3,221.2 2.2,221.2 C2.1,221.1 2,221.1 1.9,221 L1.75,220.85 L1.6,220.7 C1.5,220.6 1.3,220.5 1.2,220.3 C1.1,220.2 1.1,220.2 1,220.1 C0.9,220 0.9,219.9 0.8,219.8 L0.7888,219.7296 C0.76,219.624 0.68,219.48 0.6,219.4 C0.5,219.3 0.5,219.2 0.4,219 C0.3,218.9 0.2,218.8 0.2,218.6 C0.2,218.5 0.1,218.3 0.1,218.2 C0,218.2 0,218.1 0,218 L0,4.3 C0.1,4.2 0.1,4 0.1,3.9 L0.1,3.7 C0.1,3.6 0.2,3.5 0.2,3.4 L0.2008,3.3296 C0.204,3.224 0.22,3.08 0.3,3 L0.3496,2.8912 C0.404,2.76 0.42,2.68 0.5,2.6 L0.5,2.5 C0.6,2.3 0.6,2.2 0.7,2.1 C0.8,1.9 0.9,1.8 1,1.7 L1.6,1.1 C1.7,1 1.9,0.9 2,0.8 C2.1,0.8 2.3,0.7 2.4,0.6 C2.5,0.5 2.7,0.5 2.8,0.4 C3.1,0.3 3.5,0.2 3.8,0.1 C4.1,0 4.4,0 4.7,0 Z M238.2,9.5 L9.5,9.5 L9.5,212.4 L238.2,212.4 L238.2,9.5 Z" /></clipPath><clipPath id="105109951199511950116115105"><path d="M8.03386932,1.19383832 L246.333869,213.693838 C248.333869,215.493838 248.533869,218.493838 246.733869,220.493838 C245.733869,221.593838 244.433869,222.093838 243.133869,222.093838 C242.033869,222.093838 240.833869,221.693838 239.933869,220.893838 L1.63386932,8.39383832 C-0.366130684,6.59383832 -0.566130684,3.59383832 1.23386932,1.59383832 C3.03386932,-0.406161679 6.03386932,-0.506161679 8.03386932,1.19383832 Z" /></clipPath><clipPath id="121579510051519811295118"><path d="M246.733869,1.63386932 C248.533869,3.63386932 248.333869,6.63386932 246.333869,8.43386932 L8.03386932,220.933869 C7.03386932,221.733869 5.93386932,222.133869 4.83386932,222.133869 C3.53386932,222.133869 2.23386932,221.633869 1.23386932,220.533869 C-0.566130684,218.533869 -0.366130684,215.533869 1.63386932,213.733869 L239.933869,1.23386932 C241.933869,-0.566130684 244.933869,-0.366130684 246.733869,1.63386932 Z" /></clipPath><clipPath id="01111121209710911851113105"><path d="M0.761127691,7.03963234 C-2.53887231,1.83963234 5.76112769,-2.96036766 9.06112769,2.23963234 C14.3611277,10.7396323 19.7611277,19.3396323 25.0611277,27.8396323 C28.2611277,33.1396323 19.9611277,37.9396323 16.7611277,32.6396323 C11.4611277,24.1396323 6.06112769,15.5396323 0.761127691,7.03963234 Z" /></clipPath><clipPath id="4510111710611210510353052"><path d="M0.643298163,7.16733382 C-2.35670184,1.76733382 5.94329816,-3.03266618 8.94329816,2.36733382 C14.2432982,11.9673338 19.6432982,21.5673338 24.9432982,31.1673338 C27.9432982,36.5673338 19.6432982,41.4673338 16.6432982,35.9673338 C11.3432982,26.3673338 5.94329816,16.7673338 0.643298163,7.16733382 Z" /></clipPath><clipPath id="975557102108108985212249"><path d="M33.6,0 C52.1,0 67.2,15.1 67.2,33.6 C67.2,52.1 52.1,67.2 33.6,67.2 C15.1,67.2 0,52.1 0,33.6 C0,15.1 15.1,0 33.6,0 Z M33.6,9.6 C20.4,9.6 9.6,20.4 9.6,33.6 C9.6,46.8 20.4,57.6 33.6,57.6 C46.9,57.6 57.6,46.8 57.6,33.6 C57.6,20.4 46.8,9.6 33.6,9.6 Z" /></clipPath><clipPath id="116119116119994853109102121"><path d="M48.5084802,0.508480169 C50.9084802,1.70848017 51.9084802,4.50848017 50.7084802,6.90848017 L9.10848017,93.3084802 C8.30848017,95.0084802 6.60848017,96.0084802 4.80848017,96.0084802 C4.10848017,96.0084802 3.40848017,95.8084802 2.70848017,95.5084802 C0.308480169,94.3084802 -0.691519831,91.5084802 0.508480169,89.1084802 L42.1084802,2.70848017 C43.3084802,0.308480169 46.1084802,-0.691519831 48.5084802,0.508480169 Z" /></clipPath><clipPath id="1041081065398541135310048"><path d="M31.4611277,7.10332716 C23.9611277,18.8033272 16.5611277,30.6033272 9.06112769,42.3033272 C5.76112769,47.5033272 -2.53887231,42.7033272 0.761127691,37.5033272 C8.26112769,25.8033272 15.6611277,14.0033272 23.1611277,2.30332716 C26.5611277,-2.99667284 34.8611277,1.80332716 31.4611277,7.10332716 Z" /></clipPath><clipPath id="1161009911199107112108111104"><path d="M64.2636503,19.5701025 C86.3636503,-4.92989749 131.56365,-8.62989749 145.36365,21.1701025 C147.46365,25.6701025 148.86365,31.0701025 149.26365,37.2701025 C149.66365,43.4701025 140.16365,44.4701025 139.66365,38.3701025 L139.66365,38.1701025 L136.66365,40.2701025 L135.76365,40.8701025 C134.46365,41.8701025 133.06365,42.8701025 131.76365,43.8701025 C130.16365,45.0701025 128.56365,46.3701025 126.96365,47.6701025 C118.26365,54.6701025 110.56365,62.6701025 105.66365,72.4701025 C104.16365,75.4701025 102.96365,78.4701025 101.96365,81.7701025 C101.26365,84.3701025 100.66365,87.1701025 100.26365,90.0701025 C98.5785439,102.989251 101.100228,116.083683 103.726336,128.943161 L104.084703,130.695232 L104.26365,131.570103 L105.46365,137.270103 C105.76365,139.170103 106.16365,140.970103 106.46365,142.870103 C106.56365,143.170103 106.56365,143.570103 106.66365,143.970103 C111.26365,170.670103 110.56365,199.570103 91.8636503,221.170103 C63.7636503,253.670103 -2.33634972,246.870103 0.0636502792,195.270103 C0.663650279,183.470103 6.06365028,172.770103 11.3636503,162.470103 C21.7636503,142.270103 29.9636503,124.970103 34.5636503,102.370103 C35.0276503,100.082103 35.4769303,97.7749025 35.9213207,95.4546465 L36.2538503,93.7121025 C36.4198103,92.8397025 36.5854283,91.9656825 36.7512227,91.0903665 L37.0832003,89.3381025 C41.7939003,64.4926025 46.9236503,38.7801025 64.2636503,19.5701025 Z" /></clipPath><clipPath id="521101121221135195105107101"><path d="M169.145264,1.54844794 C214.945264,-10.2515521 229.445264,48.1484479 192.145264,83.1484479 C192.145264,83.1484479 106.245264,273.248448 43.9452636,253.148448 C-18.3547364,232.848448 -0.0547364008,167.848448 12.9452636,111.048448 C25.9452636,54.2484479 123.345264,13.2484479 169.145264,1.54844794 Z" /></clipPath><clipPath id="11611201211125150107113104"><path d="M247.801169,26.9790532 C255.301169,37.6790532 261.101169,51.6790532 265.201169,69.0790532 C265.573169,70.6510532 265.948319,72.2244032 266.325825,73.798304 L267.083744,76.9466032 C279.126419,126.798803 293.001169,176.669053 283.501169,201.179053 C273.601169,226.679053 247.701169,236.279053 219.801169,239.379053 L198.901169,319.879053 C198.901169,319.879053 182.201169,364.479053 159.801169,418.879053 C129.101169,360.179053 96.1011686,309.079053 96.1011686,309.079053 C96.1011686,309.079053 101.701169,280.779053 119.301169,212.779053 C94.9011686,199.279053 81.9011686,155.179053 81.9011686,155.179053 C35.0011686,154.679053 -10.3988314,130.279053 2.10116859,82.9790532 C11.0011686,49.3790532 44.5011686,47.5790532 68.5011686,54.7790532 C78.3011686,57.7790532 86.6011686,62.2790532 90.9011686,66.7790532 C90.9011686,66.7790532 88.3011686,30.0790532 144.901169,9.97905319 C193.601169,-7.32094681 227.301169,-2.42094681 247.801169,26.9790532 Z" /></clipPath><clipPath id="11245995310210153116112107"><path d="M147.918317,10.2603915 C198.918317,-7.93960847 234.218317,-1.93960847 255.818317,28.3603915 C256.018317,28.5603915 256.118317,28.8603915 256.318317,29.0603915 C260.318317,34.8603915 263.818317,41.3603915 266.918317,48.8603915 L256.418317,48.8603915 C254.418317,44.5603915 252.318317,40.5603915 250.018317,36.9603915 C249.418317,36.1603915 248.918317,35.4603915 248.418317,34.6603915 C229.418317,7.36039153 198.518317,2.46039153 151.118317,19.3603915 C144.818317,21.6603915 139.218317,24.1603915 134.318317,26.7603915 C101.842317,44.0563915 100.344557,67.0232715 100.312761,70.8208843 L100.312463,71.0411219 C100.313637,71.2336715 100.318317,71.3423915 100.318317,71.3603915 C100.418317,72.6603915 99.9183166,73.9603915 99.1183166,74.8603915 C98.6183166,75.3603915 98.0183166,75.7603915 97.4183166,76.0603915 C95.6183166,76.8603915 93.4183166,76.4603915 92.0183166,74.9603915 C88.3183166,71.0603915 80.6183166,67.0603915 72.0183166,64.3603915 C71.9933166,64.3603915 71.9683166,64.3541415 71.9433166,64.3447665 L71.7933166,64.2760165 L71.7183166,64.2603915 C69.6183166,63.6603915 67.4183166,63.1603915 65.3183166,62.6603915 C51.2183166,59.6603915 37.6183166,60.9603915 28.0183166,66.2603915 C19.7183166,70.8603915 14.1183166,78.5603915 11.3183166,89.0603915 C7.31831656,104.260392 9.51831656,117.460392 17.8183166,128.360392 C23.5183166,135.860392 32.1183166,142.060392 42.7183166,146.660392 C48.3183166,149.160392 54.6183166,151.160392 61.2183166,152.560392 C69.1183166,154.360392 77.7183166,155.260392 86.5183166,155.360392 C88.6183166,155.360392 90.4183166,156.760392 91.0183166,158.760392 C91.0203166,158.766392 91.0255166,158.783112 91.0339062,158.810257 L91.0686334,158.922676 C91.7770366,161.212392 99.8103166,186.844392 114.018317,203.260392 C117.718317,207.460392 121.718317,211.060392 126.118317,213.460392 C128.018317,214.560392 129.018317,216.760392 128.418317,218.860392 C119.018317,255.060392 113.018317,280.060392 109.518317,295.460392 C108.818317,298.260392 108.318317,300.760392 107.818317,302.860392 C107.118317,305.960392 106.618317,308.460392 106.218317,310.360392 L106.110504,310.730509 C105.869879,311.582267 105.705817,312.347892 105.618317,312.960392 C107.218317,315.460392 110.418317,320.660392 114.918317,327.860392 C123.518317,341.760392 136.518317,363.360392 150.518317,388.360392 C154.918317,396.160392 159.318317,404.160392 163.718317,412.460392 C175.118317,384.660392 184.718317,360.060392 191.018317,343.760392 C194.645182,334.411138 197.167749,327.790153 198.271886,324.839825 L198.388715,324.527164 C198.592141,323.981822 198.736227,323.590242 198.818317,323.360392 L219.718317,243.060392 C220.218317,241.060392 221.818317,239.660392 223.818317,239.460392 C256.218317,235.760392 275.718317,224.260392 283.518317,204.260392 C290.718317,185.540392 282.771317,148.190392 273.528317,110.070892 L272.910349,107.528648 C272.807085,107.104816 272.703699,106.680938 272.60021,106.257038 L271.978192,103.713579 C271.459067,101.594142 270.938317,99.4753915 270.418317,97.3603915 C269.918317,95.2603915 269.318317,93.0603915 268.818317,90.8603915 C268.418317,89.3603915 268.018317,87.7603915 267.618317,86.1603915 L268.238257,86.0324804 C271.130761,85.3990582 274.01165,84.2603915 276.718317,82.8603915 C277.018317,84.1603915 277.418317,85.5603915 277.718317,86.8603915 C278.418317,89.6603915 279.018317,92.3603915 279.718317,95.1603915 C290.918317,140.960392 301.518317,184.160392 292.618317,208.160392 C288.218317,219.660392 280.718317,228.760392 270.018317,235.560392 C259.318317,242.360392 245.518317,246.860392 228.318317,249.060392 L215.018317,300.160392 L213.218317,306.960392 L209.718317,320.560392 L208.218317,326.360392 C208.118317,326.560392 208.118317,326.660392 208.018317,326.860392 C208.018317,326.960392 207.618317,328.060392 206.818317,330.060392 C205.518317,333.560392 203.218317,339.560392 200.118317,347.660392 C193.618317,364.460392 183.718317,389.860392 172.018317,418.360392 C171.418317,419.860392 170.718317,421.460392 170.118317,423.060392 C169.718317,423.960392 169.318317,424.960392 168.918317,425.960392 C168.718317,426.560392 168.318317,427.060392 167.918317,427.460392 C167.618317,427.760392 167.318317,427.960392 167.018317,428.160392 C166.318317,428.560392 165.518317,428.860392 164.718317,428.860392 L164.518317,428.860392 C163.518317,428.860392 162.518317,428.560392 161.718317,427.960392 C161.118317,427.560392 160.618317,426.960392 160.218317,426.260392 L158.718317,423.260392 C132.618317,373.560392 104.818317,329.460392 98.2183166,319.060392 C97.3183166,317.660392 96.7183166,316.860392 96.7183166,316.760392 C96.0183166,315.760392 95.8183166,314.460392 96.0183166,313.260392 C96.0183166,313.260392 96.3183166,312.060392 96.8183166,309.560392 C97.3183166,307.460392 97.9183166,304.460392 98.8183166,300.460392 C99.3183166,298.060392 99.9183166,295.460392 100.618317,292.460392 C101.018317,290.560392 101.518317,288.560392 102.018317,286.360392 C105.518317,271.260392 110.818317,249.460392 118.418317,220.060392 C111.118317,215.160392 105.018317,208.060392 99.9183166,200.360392 C90.9183166,186.760392 85.2183166,171.660392 83.0183166,164.960392 C76.3183166,164.760392 69.8183166,164.060392 63.6183166,162.960392 C57.0183166,161.760392 50.8183166,160.160392 45.0183166,158.060392 C30.2183166,152.760392 18.2183166,144.660392 10.3183166,134.360392 C0.318316564,121.160392 -2.48168344,104.660392 2.21831656,86.7603915 C5.71831656,73.5603915 12.8183166,63.9603915 23.5183166,57.9603915 C42.5183166,47.3603915 65.4183166,52.4603915 74.5183166,55.1603915 L74.6183166,55.1603915 C74.8183166,55.1603915 74.9183166,55.2603915 75.1183166,55.2603915 C79.2183166,56.4603915 83.1183166,58.0603915 86.6183166,59.7603915 C88.4183166,60.6603915 90.1183166,61.5603915 91.7183166,62.5603915 C94.2183166,50.7603915 103.318317,30.3603915 135.118317,15.4603915 C139.018317,13.6603915 143.318317,11.8603915 147.918317,10.2603915 Z" /></clipPath><clipPath id="11695107122981205511211395"><path d="M8.56033191,1.86033191 C37.2603319,37.8603319 51.0603319,63.9603319 36.3603319,90.6603319 C35.5603319,92.0603319 33.8603319,92.9603319 32.1603319,92.9603319 C31.3603319,92.9603319 30.5603319,92.7603319 29.8603319,92.3603319 C27.5603319,91.0603319 26.6603319,88.1603319 27.9603319,85.8603319 C38.6603319,66.4603319 31.6603319,46.0603319 1.06033191,7.76033191 C-0.639668092,5.66033191 -0.239668092,2.66033191 1.86033191,1.06033191 C3.96033191,-0.639668092 6.96033191,-0.239668092 8.56033191,1.86033191 Z" /></clipPath><clipPath id="116116491164912111611511948"><path d="M9.98517001,0.459974983 C12.48517,-0.540025017 15.28517,0.0599749829 16.48517,2.55997498 C17.58517,4.75997498 16.78517,8.05997498 14.38517,9.05997498 C11.98517,10.059975 9.48517001,11.159975 6.98517001,12.159975 C4.48517001,13.159975 1.68517001,12.559975 0.485170014,10.059975 C-0.614829986,7.85997498 0.185170014,4.55997498 2.58517001,3.55997498 C4.98517001,2.55997498 7.48517001,1.45997498 9.98517001,0.459974983 Z" /></clipPath><clipPath id="113565657103104115104101114"><path d="M15.6512095,0.000775845845 C21.8512095,-0.0992241542 22.0512095,9.50077585 15.8512095,9.60077585 L4.75120947,10.2007758 C-1.44879053,10.3007758 -1.64879053,0.700775846 4.55120947,0.600775846 Z" /></clipPath><clipPath id="491205348107117117103120100"><path d="M52.0532768,29.8586426 C53.0532768,32.2586426 51.9532768,35.1586426 49.5532768,36.1586426 C48.8532768,36.2586426 48.2532768,36.4586426 47.6532768,36.4586426 C45.7532768,36.4586426 44.0532768,35.3586426 43.2532768,33.5586426 C39.8532768,25.6586426 21.1532768,7.5586426 5.45327678,9.7586426 C2.85327678,10.0586426 0.453276776,8.2586426 0.0532767762,5.6586426 C-0.346723224,3.0586426 1.55327678,0.5586426 4.15327678,0.2586426 C24.5532768,-2.5413574 47.0532768,18.0586426 52.0532768,29.8586426 Z" /></clipPath><clipPath id="4511910010111711510310910250"><path d="M39.3766407,3.86984467 C39.6766407,-1.73015533 47.4766407,-0.830155333 48.6766407,3.86984467 C48.7766407,4.26984467 48.8766407,4.86984467 48.8766407,5.56984467 C48.7766407,6.86984467 48.6766407,8.06984467 48.5766407,9.36984467 C48.3766407,11.3698447 48.0766407,13.2698447 47.7766407,15.1698447 C45.6766407,27.7698447 40.5766407,39.6698447 32.5766407,49.8698447 C28.0766407,55.6698447 20.4766407,63.1698447 12.6766407,63.2698447 C10.0766407,63.2698447 7.37664068,62.3698447 4.77664068,60.2698447 C2.57664068,58.4698447 1.27664068,56.2698447 0.576640683,53.8698447 C0.076640683,52.0698447 -0.123359317,50.1698447 0.076640683,48.1698447 C0.476640683,42.5698447 3.17664068,36.6698447 5.87664068,32.3698447 C13.2766407,20.4698447 24.6766407,12.1698447 37.8766407,7.66984467 C38.2766407,7.46984467 38.6766407,7.46984467 39.0766407,7.46984467 Z" /></clipPath><clipPath id="5252110959511312012112045"><path d="M19.78592,0.186069228 C25.78592,-1.41393077 28.28592,7.78606923 22.28592,9.38606923 C17.08592,10.8860692 12.38592,13.8860692 9.18591996,18.3860692 C5.58591996,23.3860692 -2.71408004,18.5860692 0.885919957,13.5860692 C5.58591996,6.98606923 11.98592,2.38606923 19.78592,0.186069228 Z" /></clipPath><clipPath id="1141160985711110597109110"><path d="M153.62529,4.62744834 C154.62529,24.9274483 142.02529,34.1274483 131.02529,35.8274483 C118.52529,37.7274483 103.62529,31.1274483 97.4252901,14.9274483 L68.6252901,18.7274483 C67.0252901,40.9274483 53.1252901,51.0274483 41.1252901,52.9274483 C39.6252901,53.0274483 38.1252901,53.1274483 36.5252901,53.1274483 C22.7252901,53.1274483 7.22529009,44.0274483 0.225290086,22.2274483 C-0.574709914,19.7274483 0.825290086,17.0274483 3.32529009,16.2274483 C5.82529009,15.4274483 8.52529009,16.8274483 9.32529009,19.3274483 C15.3252901,38.2274483 29.0252901,44.9274483 39.6252901,43.3274483 C51.4252901,41.4274483 59.1252901,30.1274483 59.1252901,14.4274483 C59.1252901,12.0274483 60.9252901,9.92744834 63.3252901,9.62744834 L100.12529,4.82744834 C102.52529,4.52744834 104.82529,6.02744834 105.42529,8.32744834 C109.02529,21.9274483 120.32529,27.6274483 129.52529,26.2274483 C136.92529,25.1274483 144.62529,18.9274483 144.02529,5.02744834 C143.92529,2.42744834 145.92529,0.127448343 148.62529,0.0274483431 C151.32529,-0.272551657 153.52529,1.92744834 153.62529,4.62744834 Z" /></clipPath><clipPath id="104100991191051141095498122"><path d="M5.99984865,0 C9.31347355,0 11.9996973,2.68622374 11.9996973,5.99984865 C11.9996973,9.31347355 9.31347355,11.9996973 5.99984865,11.9996973 C2.68622374,11.9996973 0,9.31347355 0,5.99984865 C0,2.68622374 2.68622374,0 5.99984865,0 Z" /></clipPath><clipPath id="57109575112149551110103"><path d="M4.90328066,0 C136.703281,2.5 158.103281,68.6 182.903281,145.1 C188.003281,161 193.403281,177.4 199.903281,194.1 C235.303281,285.2 256.303281,343.2 250.603281,379.1 C248.103281,395 240.803281,407.2 229.003281,415.4 C216.303281,423.9 200.603281,426.8 185.503281,426.8 C175.003281,426.8 164.803281,425.4 156.003281,423.7 C72.5032807,407 28.4032807,390 28.0032807,389.9 C25.5032807,388.9 24.3032807,386.2 25.3032807,383.7 C26.3032807,381.2 29.0032807,380 31.5032807,381 C31.9032807,381.2 75.4032807,397.9 157.903281,414.4 C185.703281,420 209.003281,417.5 223.403281,407.4 C233.003281,400.7 238.903281,390.7 241.003281,377.5 C246.403281,344.1 224.603281,284.5 190.803281,197.5 C184.203281,180.5 178.803281,164 173.703281,148 C148.103281,69 129.603281,12 4.70328066,9.6 C2.10328066,9.5 -0.0967193427,7.4 0.00328065731,4.7 C0.103280657,2.1 2.20328066,0 4.80328066,0 L4.90328066,0 Z" /></clipPath><clipPath id="11295121554512098104115109"><path d="M2.45432185,0.554321848 C4.75432185,-0.645678152 7.65432185,0.154321848 8.95432185,2.45432185 L78.6543218,127.454322 C74.3543218,126.354322 70.0543218,125.254322 65.8543218,123.954322 L0.554321848,7.05432185 C-0.645678152,4.75432185 0.154321848,1.85432185 2.45432185,0.554321848 Z" /></clipPath><clipPath id="1055010797101098116105101"><path d="M197.8,0.225290086 C200.3,-0.574709914 203,0.825290086 203.8,3.32529009 C204.6,5.92529009 203.2,8.62529009 200.7,9.42529009 C160.5,22.4252901 15.6,80.3252901 14.1,80.9252901 C11.4,81.8252901 9,81.2252901 7,81.0252901 C5.4,80.9252901 0,70.9252901 0,70.9252901 C6.9,71.9252901 13.3,71.4252901 14.5,70.4252901 C38.1,61.0252901 161.1,12.1252901 197.8,0.225290086 Z" /></clipPath><clipPath id="5398117531055210611812057"><path d="M395.22266,3.56509441 L442.82266,184.865094 C443.32266,186.665094 442.62266,188.665094 441.12266,189.865094 C440.32266,190.465094 364.22266,250.465094 313.22266,279.065094 C308.02266,281.965094 302.62266,285.065094 297.12266,288.265094 C264.12266,307.465094 225.92266,329.665094 193.32266,329.665094 C175.42266,329.665094 159.22266,322.965094 146.52266,305.365094 C110.02266,254.565094 1.72266041,61.9650944 0.622660415,60.0650944 C-0.677339585,57.7650944 0.122660415,54.8650944 2.42266041,53.5650944 C4.72266041,52.2650944 7.62266041,53.0650944 8.92266041,55.3650944 C10.0226604,57.2650944 118.02266,249.365094 154.32266,299.765094 C184.92266,342.365094 242.02266,309.265094 292.32266,280.065094 C297.92266,276.865094 303.32266,273.665094 308.52266,270.765094 C353.72266,245.365094 419.22266,194.765094 432.72266,184.265094 L385.92266,6.06509441 C385.22266,3.46509441 386.82266,0.865094409 389.32266,0.165094409 C391.92266,-0.534905591 394.52266,1.06509441 395.22266,3.56509441 Z" /></clipPath><clipPath id="451081070574954480108"><path d="M235.92951,52.5528947 C238.42951,53.3528947 234.62951,54.3528947 233.82951,56.9528947 C233.02951,59.4528947 230.32951,60.8528947 227.82951,60.0528947 C121.02951,25.6528947 39.8295104,4.95289467 30.4295104,9.55289467 L30.3373808,9.6450243 L30.1332141,9.84919097 C30.0961771,9.886228 30.0628438,9.91956134 30.0295104,9.95289467 C33.054168,12.5049495 44.3875701,16.3971244 56.6829215,20.5316223 L57.7543281,20.8917279 C58.1121526,21.0119489 58.4706063,21.1323467 58.8295104,21.2528947 C69.1295104,24.7528947 82.0295104,29.0528947 96.9295104,34.6528947 C99.2295104,35.4528947 100.42951,37.8528947 99.9295104,40.2528947 C99.3295104,42.6528947 97.1295104,44.1528947 94.7295104,43.9528947 C63.9295104,40.6528947 17.4295104,40.8528947 10.4295104,51.8528947 C9.92951045,52.5528947 8.52951045,54.8528947 11.6295104,60.1528947 C13.0295104,62.4528947 12.2295104,65.3528947 9.92951045,66.7528947 C9.12951045,67.1528947 8.22951045,67.3528947 7.42951045,67.3528947 C5.82951045,67.3528947 4.22951045,66.5528947 3.32951045,65.0528947 C-1.77048955,56.4528947 -0.0704895548,50.3528947 2.22951045,46.6528947 C9.92951045,34.5528947 38.0295104,32.0528947 61.6295104,32.3528947 C59.5295104,31.6528947 57.6295104,30.9528947 55.7295104,30.3528947 C31.5295104,22.2528947 21.5295104,18.8528947 20.1295104,11.5528947 C19.5295104,8.25289467 20.9295104,5.05289467 24.4295104,2.05289467 C34.3295104,-6.44710533 109.02951,11.6528947 235.92951,52.5528947 Z" /></clipPath><clipPath id="10310256118499810310850118"><path d="M65.8454545,0.125091188 C75.6454545,0.225091188 85.8454545,0.325091188 95.2454545,0.0250911881 C97.9454545,-0.0749088119 100.145455,2.02509119 100.245455,4.62509119 C100.345455,7.32509119 98.2454545,9.52509119 95.6454545,9.62509119 C85.9454545,9.92509119 75.7454545,9.82509119 65.8454545,9.72509119 C62.1814545,9.69309119 58.3740945,9.65597119 54.5458449,9.64731839 L53.1095113,9.64547359 C33.4727745,9.64029119 13.6894545,10.4930912 10.2454545,16.7250912 C8.64545455,19.7250912 11.5454545,25.1250912 13.5454545,28.0250912 C14.9454545,30.2250912 14.3454545,33.2250912 12.1454545,34.6250912 C11.1454545,35.2250912 10.2454545,35.5250912 9.34545455,35.5250912 C7.74545455,35.5250912 6.24545455,34.7250912 5.34545455,33.3250912 C-0.254545455,24.7250912 -1.45454545,17.8250912 1.74545455,12.1250912 C8.64545455,-0.474908812 33.9454545,-0.274908812 65.8454545,0.125091188 Z" /></clipPath><clipPath id="48113104531169510611211455"><path d="M104.000334,4.61264858 C104.100334,7.31264858 102.000334,9.51264858 99.4003344,9.61264858 C90.8003344,9.91264858 81.9003344,10.0126486 73.2003344,10.1126486 C68.0203344,10.1726486 62.5923344,10.2406486 57.1827344,10.3686486 L55.5606728,10.4089006 C34.4879744,10.9569286 14.1003344,12.4966486 10.2003344,18.1126486 C9.90033441,18.5126486 9.40033441,19.3126486 10.2003344,21.5126486 C12.4333344,27.5956486 32.1568844,27.2753286 50.9270512,25.8931247 L52.3874088,25.7833649 C57.4896444,25.3923386 62.4853344,24.9326486 67.0003344,24.5126486 C84.8003344,22.9126486 101.700334,21.4126486 111.900334,23.4126486 C114.500334,23.9126486 116.200334,26.4126486 115.700334,29.1126486 C115.200334,31.7126486 112.700334,33.4126486 110.000334,32.9126486 C102.469565,31.3895717 89.2109853,32.2292166 75.3741168,33.4323573 L73.8625939,33.5649548 C73.105933,33.6318784 72.3481086,33.6996672 71.5899566,33.7679968 L68.5575816,34.0434298 C68.3050681,34.0664947 68.0526421,34.0895717 67.8003344,34.1126486 C55.2003344,35.2126486 43.0003344,36.3126486 32.5003344,36.3126486 C16.4003344,36.3126486 4.30033441,33.7126486 1.00033441,24.8126486 C-1.09966559,19.1126486 0.500334408,15.1126486 2.20033441,12.6126486 C9.60033441,1.91264858 33.9003344,1.01264858 73.0003344,0.51264858 C81.6003344,0.41264858 90.4003344,0.31264858 99.0003344,0.0126485799 C101.600334,-0.18735142 103.900334,2.01264858 104.000334,4.61264858 Z" /></clipPath><clipPath id="11910510599514812010657105"><path d="M121.29264,1.59669523 C123.89264,2.29669523 125.39264,4.89669523 124.69264,7.49669523 C123.99264,10.0966952 121.29264,11.5966952 118.79264,10.8966952 C81.2926397,0.796695231 20.5926397,54.2966952 8.99263969,74.2966952 C7.99263969,75.7966952 6.39263969,76.6966952 4.79263969,76.6966952 C3.99263969,76.6966952 3.09263969,76.4966952 2.39263969,75.9966952 C0.0926396894,74.6966952 -0.707360311,71.6966952 0.692639689,69.3966952 C12.8926397,48.4966952 76.8926397,-10.4033048 121.29264,1.59669523 Z" /></clipPath><clipPath id="994845981031059512010398"><path d="M2.06027793,24.9425185 C24.3602779,9.64251847 63.9602779,-5.15748153 84.1602779,1.74251847 C83.9602779,3.14251847 84.0602779,4.54251847 84.4602779,6.04251847 C85.1602779,8.24251847 85.5602779,10.5425185 85.8602779,12.9425185 C85.1602779,12.8425185 84.4602779,12.5425185 83.7602779,12.1425185 C72.4602779,4.54251847 33.2602779,15.2425185 7.56027793,32.9425185 C6.76027793,33.4425185 5.76027793,33.7425185 4.86027793,33.7425185 C3.26027793,33.7425185 1.76027793,33.0425185 0.860277931,31.6425185 C-0.639722069,29.4425185 -0.139722069,26.4425185 2.06027793,24.9425185 Z" /></clipPath><clipPath id="1065752531191051021045748"><path d="M228.132243,4.60359055 C228.232243,7.20359055 226.232243,9.50359055 223.532243,9.60359055 C217.932243,9.80359055 211.532243,9.90359055 204.132243,10.0035906 C160.932243,10.4035906 88.6322427,11.0035906 45.9322427,56.6035906 C18.9322427,85.5035906 6.83224267,129.203591 10.1322427,186.403591 C21.7942427,389.263591 31.2473227,470.921111 31.7149003,474.859221 L31.7322427,475.003591 C32.0322427,477.603591 30.1322427,480.003591 27.5322427,480.303591 C27.3322427,480.403591 27.1322427,480.403591 26.9322427,480.403591 C24.5322427,480.403591 22.4322427,478.603591 22.1322427,476.203591 C22.0322427,475.403591 12.3322427,394.403591 0.532242665,187.003591 C-2.86775733,127.003591 10.0322427,80.9035906 38.9322427,50.0035906 C84.4322427,1.40359055 159.232243,0.803590554 204.032243,0.403590554 C211.332243,0.303590554 217.632243,0.303590554 223.132243,0 C225.732243,-0.0964094464 228.032243,1.90359055 228.132243,4.60359055 Z" /></clipPath><clipPath id="11049531105312112195116103"><path d="M0.2,0 C3.3,1.9 6.6,3.5 10,4.8 L14.4,51.3 C14.7,53.9 12.7,56.3 10.1,56.5 L9.6,56.5 C7.1,56.5 5,54.7 4.8,52.2 L0,1.8 C0,1.2 0,0.6 0.2,0 Z" /></clipPath><clipPath id="545452971211201081125498"><path d="M89.6,128.1 L136,12.8 L142.4,35.2 L124.8,160.1 L89.6,128.1 Z M89.6,128.1 L68.8,169.7 L0,22.4 L25.6,0 L89.6,128.1 Z" /></clipPath><clipPath id="1209952501031081061145651"><path d="M30.3444444,0 C30.6444444,0 31.0444444,0 31.3444444,0.1 C32.7444444,0.4 33.9444444,1.3 34.6444444,2.6 L34.6444444,2.7 L37.9444444,9.4 L93.9444444,121.1 L119.544444,57.6 L127.144444,38.7 L128.544444,35.2 L136.344444,15.8 C136.744444,14.8 137.544444,13.9 138.444444,13.4 C139.244444,12.9 140.144444,12.7 141.044444,12.8 C141.844444,12.9 142.644444,13.2 143.344444,13.6 C144.244444,14.2 145.044444,15.1 145.344444,16.3 L150.644444,34.7 L151.744444,38.7 C151.944444,39.4 152.044444,40 152.044444,40.7 L151.544444,44.4 L134.444444,165.6 C134.244444,167.3 133.044444,168.8 131.344444,169.4 C129.644444,170 127.744444,169.6 126.444444,168.4 L96.2444444,141 L95.8444444,140.7 L95.3444444,141.8 L77.9444444,176.7 C77.1444444,178.4 75.4444444,179.4 73.6444444,179.4 L73.5444444,179.4 C71.6444444,179.3 70.0444444,178.3 69.2444444,176.6 L2.24444444,33.1 L0.444444444,29.3 C-0.455555556,27.4 0.0444444444,25.1 1.64444444,23.7 L1.84444444,23.5 L27.2444444,1.2 C28.1444444,0.4 29.2444444,0 30.3444444,0 Z M28.8444444,12.5 L27.0444444,14 L16.4444444,23.3 L10.5444444,28.5 L12.6444444,33 L73.6444444,163.5 L86.9444444,137 L88.9444444,132.9 L74.8444444,104.4 L43.4444444,41.6 L34.6444444,24.1 L31.2444444,17.3 L28.8444444,12.5 Z M140.044444,32.3 L139.344444,34 L135.544444,43.5 L100.044444,131.5 L100.344444,131.8 L126.144444,155 L141.844444,43.6 L142.344444,40.2 L140.544444,34 L140.044444,32.3 Z" /></clipPath></defs><g transform="translate(678.6999999999999 107.56733381527289)"><g clip-path="url(#56107116106549710511798120)"><polygon points="0,0 641,0 641,705.8 0,705.8 0,0" stroke="none" fill="#525252" /></g><g transform="translate(43.200000000000045 40.5)"><g clip-path="url(#11310611854122118531204545)"><polygon points="0,0 554.6,0 554.6,494.6 0,494.6 0,0" stroke="none" fill="#FFFFFF" /></g></g><g transform="translate(38.40000000000009 35.700000000000045)"><g clip-path="url(#115105101955310310549102100)"><polygon points="0,0 564.2,0 564.2,504.2 0,504.2 0,0" stroke="none" fill="#FFFFFF" /></g></g><g transform="translate(303.8847 423.14941000000033) rotate(-82.41520029118774)"><g clip-path="url(#1171201061064910910910110455)"><polygon points="-2.27373675e-13,0 12.0005981,0 12.0005981,12.0005981 -2.27373675e-13,12.0005981 -2.27373675e-13,0" stroke="none" fill="#525252" /></g></g><g transform="translate(284.89657188945125 114.4981074019538)"><g clip-path="url(#110106501084811457579757)"><polygon points="-5.42088076e-14,-0.00188642418 141.124196,-0.00188642418 141.124196,275.501893 -5.42088076e-14,275.501893 -5.42088076e-14,-0.00188642418" stroke="none" fill="#525252" /></g></g><g transform="translate(104.80000000000018 612.7)"><g clip-path="url(#113116121531051181215711048)"><polygon points="0,0 265.7,0 265.7,9.6 0,9.6 0,0" stroke="none" fill="#FFFFFF" /></g></g><g transform="translate(394.9 558.3)"><g clip-path="url(#10111210201151021175154120)"><polygon points="0,0 246.2,0 246.2,147.6 0,147.6 0,0" stroke="none" fill="#FFFFFF" /></g></g></g><g transform="translate(6.600000000000023 18.26733381527299)"><g transform=""><g clip-path="url(#115120118115112951045410697)"><polygon points="0,0 300.9,0 300.9,331.3 0,331.3 0,0" stroke="none" fill="#EEEEEE" /></g></g><g transform="translate(31.299999999999955 28.799999999999955)"><g clip-path="url(#12112257100103480107117118)"><polygon points="0,0 238.3,0 238.3,212.5 0,212.5 0,0" stroke="none" fill="#EEEEEE" /></g></g><g transform="translate(26.599999999999966 24.100000000000023)"><g clip-path="url(#104951181011215210857108104)"><polygon points="0,0 247.8,0 247.8,221.9 0,221.9 0,0" stroke="none" fill="#525252" /></g></g><g transform="translate(26.466130684231757 24.006161679357717)"><g clip-path="url(#105109951199511950116115105)"><polygon points="6.66133815e-16,-1.02140518e-14 247.967739,-1.02140518e-14 247.967739,222.093838 6.66133815e-16,222.093838 6.66133815e-16,-1.02140518e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(26.4661306842317 23.9661306842317)"><g clip-path="url(#121579510051519811295118)"><polygon points="6.66133815e-16,6.66133815e-16 247.967739,6.66133815e-16 247.967739,222.133869 6.66133815e-16,222.133869 6.66133815e-16,6.66133815e-16" stroke="none" fill="#525252" /></g></g></g><g transform="translate(582.5388723092442 28.927701479085954)"><g clip-path="url(#01111121209710911851113105)"><polygon points="-4.97379915e-14,1.95399252e-14 25.7821777,1.95399252e-14 25.7821777,34.9429595 -4.97379915e-14,34.9429595 -4.97379915e-14,1.95399252e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(598.6567018368257 1.1368683772161603e-13)"><g clip-path="url(#4510111710611210510353052)"><polygon points="4.08562073e-14,1.77635684e-14 25.5865963,1.77635684e-14 25.5865963,38.3789459 4.08562073e-14,38.3789459 4.08562073e-14,1.77635684e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(-5.684341886080802e-14 435.36733381527296)"><g clip-path="url(#975557102108108985212249)"><polygon points="0,0 67.2,0 67.2,67.2 0,67.2 0,0" stroke="none" fill="#525252" /></g></g><g transform="translate(134.39151983064443 505.7588536459175)"><g clip-path="url(#116119116119994853109102121)"><polygon points="3.10862447e-15,-1.73194792e-14 51.2169603,-1.73194792e-14 51.2169603,96.0084802 3.10862447e-15,96.0084802 3.10862447e-15,-1.73194792e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(1107.4388723092438 877.2640066570677)"><g clip-path="url(#1041081065398541135310048)"><polygon points="1.0125234e-13,-1.46549439e-14 32.2631063,-1.46549439e-14 32.2631063,44.5429595 1.0125234e-13,44.5429595 1.0125234e-13,-1.46549439e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(234.76775733470947 198.71888587774578)"><g transform="translate(60.96859238611694 -1.1368683772161603e-13)"><g transform="translate(0.0 66.27834542691232)"><g clip-path="url(#1161009911199107112108111104)"><polygon points="-3.80112608e-14,-2.84217094e-14 149.275932,-2.84217094e-14 149.275932,240.954688 -3.80112608e-14,240.954688 -3.80112608e-14,-2.84217094e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(121.91838667993443 0.0)"><g clip-path="url(#521101121221135195105107101)"><polygon points="5.32907052e-14,-1.42108547e-14 213.365966,-1.42108547e-14 213.365966,254.637011 5.32907052e-14,254.637011 5.32907052e-14,-1.42108547e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(66.26248168436439 56.16939474863477)"><g clip-path="url(#11611201211125150107113104)"><polygon points="1.42108547e-14,-4.4408921e-14 286.653568,-4.4408921e-14 286.653568,418.879053 1.42108547e-14,418.879053 1.42108547e-14,-4.4408921e-14" stroke="none" fill="#FFFFFF" /></g></g><g transform="translate(61.84533371475402 51.38805641104864)"><g clip-path="url(#11245995310210153116112107)"><polygon points="4.39648318e-14,0 295.937976,0 295.937976,428.860392 4.39648318e-14,428.860392 4.39648318e-14,0" stroke="none" fill="#525252" /></g></g><g transform="translate(269.80331837162566 104.98811602997932)"><g clip-path="url(#11695107122981205511211395)"><polygon points="4.81836793e-14,4.81836793e-14 42.3048186,4.81836793e-14 42.3048186,92.9603319 4.81836793e-14,92.9603319 4.81836793e-14,4.81836793e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(215.07848026543695 92.78847295458729)"><g clip-path="url(#116116491164912111611511948)"><polygon points="2.88657986e-14,2.62012634e-14 16.97034,2.62012634e-14 16.97034,12.61995 2.88657986e-14,12.61995 2.88657986e-14,2.62012634e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(311.81244081146724 93.44767209168197)"><g clip-path="url(#113565657103104115104101114)"><polygon points="-2.7533531e-14,1.24344979e-14 20.4024189,1.24344979e-14 20.4024189,10.2015517 -2.7533531e-14,10.2015517 -2.7533531e-14,1.24344979e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(99.4103735029438 138.7898053379987)"><g clip-path="url(#491205348107117117103120100)"><polygon points="-3.2439329e-14,5.39013278e-14 52.4220268,5.39013278e-14 52.4220268,36.4586426 -3.2439329e-14,36.4586426 -3.2439329e-14,5.39013278e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(148.0870095962066 62.978603270591634)"><g clip-path="url(#4511910010111711510310910250)"><polygon points="2.61041189e-14,4.13002965e-14 48.8766407,4.13002965e-14 48.8766407,63.2698447 2.61041189e-14,63.2698447 2.61041189e-14,4.13002965e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(310.5777303218398 191.76237870969283)"><g clip-path="url(#5252110959511312012112045)"><polygon points="-1.97619698e-14,0 25.72592,0 25.72592,20.499297 -1.97619698e-14,20.499297 -1.97619698e-14,0" stroke="none" fill="#525252" /></g></g><g transform="translate(197.23836019341422 107.02099959446457)"><g clip-path="url(#1141160985711110597109110)"><polygon points="4.20774526e-14,4.58869054e-14 153.681217,4.58869054e-14 153.681217,53.1274483 4.20774526e-14,53.1274483 4.20774526e-14,4.58869054e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(232.43873281517344 133.4167072895271) rotate(-86.4909828638866)"><g clip-path="url(#104100991191051141095498122)"><polygon points="0,1.13686838e-13 11.9996973,1.13686838e-13 11.9996973,11.9996973 0,11.9996973 0,1.13686838e-13" stroke="none" fill="#525252" /></g></g><g transform="translate(317.4934196151734 121.8029399615271) rotate(-86.4909828638866)"><g clip-path="url(#104100991191051141095498122)"><polygon points="0,1.13686838e-13 11.9996973,1.13686838e-13 11.9996973,11.9996973 0,11.9996973 0,1.13686838e-13" stroke="none" fill="#525252" /></g></g></g><g transform="translate(14.90958225072086 371.4484479375269)"><g transform="translate(306.41937975725693 1.1368683772161603e-13)"><g clip-path="url(#57109575112149551110103)"><polygon points="-9.76996262e-15,0 251.531461,0 251.531461,426.8 -9.76996262e-15,426.8 -9.76996262e-15,0" stroke="none" fill="#525252" /></g></g><g transform="translate(107.36833856689623 90.84567815232697)"><g clip-path="url(#11295121554512098104115109)"><polygon points="2.66453526e-14,4.04121181e-14 78.6543218,4.04121181e-14 78.6543218,127.454322 2.66453526e-14,127.454322 2.66453526e-14,4.04121181e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(214.9226604145697 225.67470991424068)"><g clip-path="url(#1055010797101098116105101)"><polygon points="0,5.95079541e-14 204.02529,5.95079541e-14 204.02529,81.4069063 0,81.4069063 0,5.95079541e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(1.1368683772161603e-13 126.03490559075169)"><g clip-path="url(#5398117531055210611812057)"><polygon points="4.68514116e-14,-1.61259894e-14 442.98273,-1.61259894e-14 442.98273,329.665094 4.68514116e-14,329.665094 4.68514116e-14,-1.61259894e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(98.49314996937983 204.3471053298498)"><g clip-path="url(#451081070574954480108)"><polygon points="1.9095836e-14,4.70734562e-14 236.769459,4.70734562e-14 236.769459,67.3528947 1.9095836e-14,67.3528947 1.9095836e-14,4.70734562e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(105.77720586911505 257.0749088118886)"><g clip-path="url(#10310256118499810310850118)"><polygon points="3.55271368e-14,-3.19744231e-14 100.248884,-3.19744231e-14 100.248884,35.5250912 3.55271368e-14,35.5250912 3.55271368e-14,-3.19744231e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(112.122326006815 273.78735142010476)"><g clip-path="url(#48113104531169510611211455)"><polygon points="4.92939023e-14,-2.61440175e-14 115.787572,-2.61440175e-14 115.787572,36.3126486 4.92939023e-14,36.3126486 4.92939023e-14,-2.61440175e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(11.230020725206487 127.80330476895654)"><g clip-path="url(#11910510599514812010657105)"><polygon points="1.59872116e-14,9.9475983e-14 124.864402,9.9475983e-14 124.864402,76.6966952 1.59872116e-14,76.6966952 1.59872116e-14,9.9475983e-14" stroke="none" fill="#525252" /></g></g><g transform="translate(392.1623824833929 116.35748153412021)"><g clip-path="url(#994845981031059512010398)"><polygon points="-4.30766534e-14,1.28785871e-14 85.8602779,1.28785871e-14 85.8602779,33.7425185 -4.30766534e-14,33.7425185 -4.30766534e-14,1.28785871e-14" stroke="none" fill="#525252" /></g></g></g><g transform="translate(0.0 337.44844793752685)"><g transform="translate(0.0 22.996409446385087)"><g clip-path="url(#1065752531191051021045748)"><polygon points="-3.77475828e-14,-0.00334242499 228.135833,-0.00334242499 228.135833,480.403591 -3.77475828e-14,480.403591 -3.77475828e-14,-0.00334242499" stroke="none" fill="#525252" /></g></g><g transform="translate(425.43224266529046 439.60000000000014)"><g clip-path="url(#11049531105312112195116103)"><polygon points="0,0 14.4298373,0 14.4298373,56.5 0,56.5 0,0" stroke="none" fill="#525252" /></g></g><g transform="translate(199.03224266529048 4.800000000000068)"><g clip-path="url(#545452971211201081125498)"><polygon points="0,0 142.4,0 142.4,169.7 0,169.7 0,0" stroke="none" fill="#FFFFFF" /></g></g><g transform="translate(194.28779822084618 -1.1368683772161603e-13)"><g clip-path="url(#1209952501031081061145651)"><polygon points="-1.13464793e-13,0 152.044444,0 152.044444,179.4 -1.13464793e-13,179.4 -1.13464793e-13,0" stroke="none" fill="#525252" /></g></g></g></g></svg>
          <h2 class="mt-8 text-2xl font-medium uppercase">
            Out of Service
          </h2>
          <p class="mt-4 text-sm text-gray-500">
            Start Service to queue up!
          </p>
        </div>
        <template v-else>
          <EmptyBlock v-if="filteredTickets?.length === 0" :cover="true" />
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

