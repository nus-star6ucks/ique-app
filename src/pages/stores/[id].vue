<script setup lang="ts">
import dayjs from 'dayjs'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline/index.js'
import { useRouteParams } from '@vueuse/router'
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid/index.js'
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { humanEstimateTime, queueApi, storeApi } from '~/utils'
import Loading from '~/components/Loading.vue'
import WithAuth from '~/components/WithAuth.vue'
import { useSnackStore } from '~/stores/snack'

const snackStore = useSnackStore()
const router = useRouter()

const reqTktConfmIsOpen = ref<boolean>(false)
function setReqTktConfmIsOpen(value: boolean) {
  reqTktConfmIsOpen.value = value
}

const queueIdConfirmation = ref<number>(NaN)
function setQueueIdConfirmation(value: number) {
  queueIdConfirmation.value = value
}

const queueTicketRequesting = ref<boolean>(false)
function queue() {
  queueTicketRequesting.value = true
  queueApi.ticketsPost(queueIdConfirmation.value).then(({ data }) => {
    snackStore.show({ mode: 'success', message: `Queued successfully!`})
    router.push(`/tickets/${data.ticketId}`)
  }).catch(e => {
    snackStore.show({ mode: 'error', message: 'Unexpected error, please try again.'})
  }).finally(() => {
    queueTicketRequesting.value = false
  })
}

const storeId = useRouteParams('id')
const { state: store, isLoading } = useAsyncState(storeApi.storesIdGet(+storeId).then(async ({ data }) => data), undefined)

const { state: waitingInfo, isLoading: waitingInfoIsLoading, execute: requestWaitingInfo } = useAsyncState((queueId: number) => queueApi.queuesGet(queueId).then(async ({ data }) => data), undefined, {
  immediate: false,
  resetOnExecute: true
})
</script>

<template>
  <WithAuth>
    <header class="flex items-center justify-between text-gray-800 mb-2">
      <RouterLink v-slot="{ navigate }" to="/tickets" custom>
        <button class="bg-white p-2 rounded-lg" @click="navigate">
          <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
        </button>
      </RouterLink>
      <h2>Store Detail</h2>
      <div class="w-9 h-9" />
    </header>
    <Loading :loading="isLoading" />
    <section v-if="store" class="space-y-4">
      <div class="overflow-hidden rounded-lg bg-center bg-cover h-20vh my-4" :style="`background-image: url(${store.resources.imageUrl});`" />
      <div>
        <h2 class="text-2xl font-bold py-2" v-text="store.name" />
        <p class="text-gray-600 tracking-wider leading-loose text-base">
          Since <span v-text="dayjs(store.registerTime).year()" />
        </p>
      </div>
      <div class="bg-white overflow-hidden rounded-lg p-4 flex justify-between space-x-4">
        <div>
          <h3 class="mb-2 text-gray-400">
            Rating
          </h3>
          <p class="text-gray-800 font-semibold flex items-center">
            <StarSolidIcon class="w-5 text-yellow-500" />
            <span class="ml-2">
              4
            </span>
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-gray-400">
            Type
          </h3>
          <p class="text-gray-800 font-semibold" v-text="store.type" />
        </div>
        <div>
          <h3 class="mb-2 text-gray-400">
            Address
          </h3>
          <p class="text-gray-800 font-semibold" v-text="store.address" />
        </div>
      </div>
      <p class="text-gray-600 tracking-wider leading-loose text-base" v-text="store.resources.description" />
      <div class="bg-white overflow-hidden rounded-lg p-4">
        <ul class="divide-y divide-gray-100">
          <li v-for="seatType in store.seatTypes" :key="seatType.id" class="flex items-center justify-between py-4">
            <p v-text="seatType.name" />
            <button class="bg-emerald-500 rounded-md text-white text-sm py-1 px-2" @click="() => { setQueueIdConfirmation(seatType.id!); setReqTktConfmIsOpen(true); requestWaitingInfo(0, seatType.id) }">
              Queue
            </button>
          </li>
        </ul>
      </div>
    </section>
  </WithAuth>

  <TransitionRoot appear :show="reqTktConfmIsOpen" as="template">
    <Dialog as="div" @close="setReqTktConfmIsOpen(false)" class="relative z-10">
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
        <div class="flex min-h-full items-center justify-center p-4 text-center">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Request Ticket Confirmation
              </DialogTitle>
              <div>
                <Loading :loading="waitingInfoIsLoading" />
                <p class="text-sm text-gray-500" v-if="!waitingInfoIsLoading && waitingInfo">
                  You're requesting to queue . There are <span v-text="waitingInfo.waitingSize"></span> people waiting in front of you, expect to wait <span v-text="humanEstimateTime(waitingInfo.estimateWaitingTime)" />.
                </p>
              </div>

              <div class="space-x-2">
                <button
                  type="button"
                  :disabled="queueTicketRequesting"
                  class="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 transition-all hover:bg-emerald-200 disabled:bg-gray-100 disabled:text-gray-600"
                  @click="queue"
                >
                  Queue!
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm text-gray-400"
                  @click="setReqTktConfmIsOpen(false)"
                >
                  Not now
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
