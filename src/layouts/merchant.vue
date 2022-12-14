<script lang="ts" setup>
import { ArrowLeftIcon, MapPinIcon, PlusIcon } from '@heroicons/vue/24/outline/index.js'
import { useRequest } from 'vue-request'
import { useRouter } from 'vue-router'
import { useUpdateStoreDetailStore } from '~/stores/updateStoreDetail'
import { useUserStore } from '~/stores/user'
import { storeApi } from '~/utils'

const updateStoreDetailStore = useUpdateStoreDetailStore()
const userStore = useUserStore()
const isLoggedIn = computed(() => !!userStore.user)
const { data: stores, loading: isLoading, run: refresh } = useRequest(() => storeApi.storesGet(userStore.user?.id).then(d => d.data), {
  pollingInterval: 5000,
  ready: isLoggedIn,
})

// refresh when remove the selection
const selectedStore = computed(() => updateStoreDetailStore?.updateStoreDetail?.selectedStore)
watch(selectedStore, (newState, prevState) => {
  if (prevState && !newState)
    refresh()
})
</script>

<template>
  <main :class="[useRouter().currentRoute.value.meta.classNames]" class="m-0 h-100vh grid grid-cols-5 p-0 merchant">
    <div class="block relative col-span-3 h-100vh overflow-y-scroll">
      <header class="p-8 flex items-center justify-between text-gray-800 mb-2 sticky top-0 z-10 bg-gray-50">
        <RouterLink v-slot="{ navigate }" to="/tickets" custom>
          <button class="bg-white p-2 rounded-lg" :class="{ invisible: useRouter().currentRoute.value.fullPath === '/merchant' }" @click="navigate">
            <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
          </button>
        </RouterLink>
        <h2>Your Stores</h2>
        <RouterLink to="/merchant/stores/create" class="text-white bg-emerald-500 rounded-lg p-2">
          <PlusIcon class="w-5 h-5" />
        </RouterLink>
      </header>
      <Loading v-if="!stores && isLoading && userStore.user" :loading="true" />
      <div v-else class="p-8">
        <section class="grid grid-cols-2 gap-12">
          <div v-for="store in stores" :key="store.id" class="relative block border border-gray-200 rounded-lg overflow-hidden">
            <img
              :alt="store.name"
              :src="store.resources.imageUrl"
              class="h-48 w-full object-cover lg:h-64"
            >
            <div class="p-6">
              <div class="h-20">
                <h5 class="text-xl font-bold">
                  <span v-text="store.name" />
                  <span :class="{ 'bg-red-500': store.status === 'stopService', 'bg-emerald-500': store.status === 'onService' }" class="inline-block text-white rounded-md px-2 py-1 text-xs font-normal mb-1 uppercase opacity-90 mx-2" v-text="store.status === 'onService' ? 'In Service' : 'Out of Service'" />
                </h5>
                <p class="mt-2 text-sm text-gray-600 flex flex-wrap space-x-1">
                  <MapPinIcon class="w-4" />
                  <span v-text="store.address" />
                </p>
              </div>
              <div class="flex items-center space-x-6 mt-8">
                <RouterLink
                  :to="`/merchant/stores/${store.id}`"
                  :disabled="store.status === 'stopService'"
                  class="text-center block w-full rounded-lg text-white p-2 bg-emerald-500"
                >
                  Serve
                </RouterLink>
                <a
                  href="javascript:;"
                  class="text-center w-full rounded-lg text-white bg-gray-500 p-2"
                  @click="updateStoreDetailStore.setSelectedStore({ selectedStore: { ...store, phoneNumbersText: store.phoneNumbers.join(`\n`) } })"
                >
                  Settings
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <aside class="bg-white col-span-2 h-100vh relative me">
      <RouterView />
      <MerchantTabbar />
    </aside>
  </main>
</template>
