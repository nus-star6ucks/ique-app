<script setup lang="ts">
import dayjs from "dayjs";
import { ArrowLeftIcon, UserIcon } from "@heroicons/vue/24/outline/index.js";
import { useRouteParams } from "@vueuse/router";
import { StarIcon as StarSolidIcon } from "@heroicons/vue/24/solid/index.js";
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useRequest } from "vue-request";
import { humanEstimateTime, queueApi, storeApi } from "~/utils";
import Loading from "~/components/Loading.vue";
import WithAuth from "~/components/WithAuth.vue";
import { useSnackStore } from "~/stores/snack";
import type { QueueInfo } from "~/api/models";
import { useUserStore } from "~/stores/user";

const snackStore = useSnackStore();
const userStore = useUserStore();
const router = useRouter();

const selectedQueueInfo = ref<QueueInfo>(undefined!);
function setSelectedQueueInfo(value: QueueInfo) {
  selectedQueueInfo.value = value;
}

function deselectQueueInfo() {
  selectedQueueInfo.value = undefined!;
}

const { user } = useUserStore();

const storeId = useRouteParams("id");
const { data: store, loading: isLoading } = useRequest(
  () => storeApi.storesStoreIdGet(+(storeId.value || 0)).then((d) => d.data),
  {
    pollingInterval: 5000,
  }
);
const { data: tickets } = useRequest(() =>
  queueApi.queuesTicketsGet(user?.id).then((d) => d.data)
);

const queueTicketRequesting = ref<boolean>(false);
function queue() {
  if (!selectedQueueInfo.value || !userStore.user || !store.value?.id) return;

  queueTicketRequesting.value = true;
  queueApi
    .queuesTicketsPost(
      selectedQueueInfo.value.queueId,
      userStore.user.id,
      +store.value?.id
    )
    .then(({ data }) => {
      snackStore.show({ mode: "success", message: "Queued successfully!" });
      router.push(`/tickets/${data.ticketId}`);
    })
    .catch((e) => {
      snackStore.show({
        mode: "error",
        message: "Unexpected error, please try again.",
      });
    })
    .finally(() => {
      queueTicketRequesting.value = false;
    });
}
</script>

<template>
  <WithAuth>
    <header class="flex items-center justify-between text-gray-800 mb-2">
      <RouterLink v-slot="{ navigate }" to="/" custom>
        <button class="bg-white p-2 rounded-lg" @click="navigate">
          <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
        </button>
      </RouterLink>
      <h2>Store Detail</h2>
      <div class="w-9 h-9" />
    </header>
    <Loading :loading="isLoading && !store" />
    <section v-if="store" class="space-y-4">
      <div
        class="overflow-hidden rounded-lg bg-center bg-cover h-20vh my-4"
        :style="`background-image: url(${store.resources.imageUrl});`"
      />
      <div>
        <h2 class="text-2xl font-bold py-2" v-text="store.name" />
        <p class="text-gray-600 tracking-wider leading-loose text-base">
          Since <span v-text="dayjs(store.registerTime).year()" />
        </p>
      </div>
      <div
        class="bg-white overflow-hidden rounded-lg p-4 flex justify-between space-x-4"
      >
        <div>
          <h3 class="mb-2 text-gray-400">Rating</h3>
          <p class="text-gray-800 font-semibold flex items-center">
            <StarSolidIcon class="w-5 text-yellow-500" />
            <span class="ml-2" v-text="store.resources.ratings.toFixed(1)" />
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-gray-400">Type</h3>
          <p class="text-gray-800 font-semibold" v-text="store.type" />
        </div>
        <div>
          <h3 class="mb-2 text-gray-400">Address</h3>
          <p class="text-gray-800 font-semibold" v-text="store.address" />
        </div>
      </div>
      <p
        class="text-gray-600 tracking-wider leading-loose text-base"
        v-text="store.resources.description"
      />
      <div
        v-if="store.queuesInfo.filter((q) => !!q.queueId).length > 0"
        class="bg-white overflow-hidden rounded-lg p-4"
      >
        <ul class="divide-y divide-gray-100">
          <li
            v-for="q in store.queuesInfo"
            :key="q.queueId"
            class="flex items-center justify-between py-4"
          >
            <p v-text="q.seatType.name" />
            <div class="space-x-4 flex items-center">
              <span class="flex items-center text-gray-600">
                <UserIcon class="w-4 h-4" />
                <span class="ml-1" v-text="q.waitingSize" />
              </span>
              <template v-if="store.status === 'onService'">
                <template
                  v-if="!!tickets?.find((t) => t.queueId === q.queueId)"
                >
                  <RouterLink
                    :to="`/tickets/${
                      tickets.find((t) => t.queueId === q.queueId)?.ticketId
                    }`"
                  >
                    <button
                      class="bg-emerald-500 rounded-md text-white text-sm py-1 px-2"
                      @click="
                        () => {
                          setSelectedQueueInfo(q);
                        }
                      "
                    >
                      Go to Ticket
                    </button>
                  </RouterLink>
                </template>
                <button
                  v-else
                  class="bg-emerald-500 rounded-md text-white text-sm py-1 px-2"
                  @click="
                    () => {
                      setSelectedQueueInfo(q);
                    }
                  "
                >
                  Queue
                </button>
              </template>
              <button
                v-else
                class="bg-gray-500 rounded-md text-white text-sm py-1 px-2 cursor-default"
              >
                Not Available
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </WithAuth>

  <TransitionRoot v-if="!!selectedQueueInfo" :show="true" appear as="template">
    <Dialog as="div" class="relative z-10" @close="deselectQueueInfo()">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Request Ticket Confirmation
              </DialogTitle>
              <div>
                <p class="text-sm text-gray-500">
                  You're requesting to queue
                  <span v-text="selectedQueueInfo.seatType.name" />. There are
                  <span v-text="selectedQueueInfo.waitingSize" /> group(s)
                  waiting in front of you, expect to wait
                  <span
                    v-text="
                      humanEstimateTime(selectedQueueInfo.estimateWaitingTime)
                    "
                  />.
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
                  @click="deselectQueueInfo()"
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
