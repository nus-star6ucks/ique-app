<script lang="ts" setup>
import { ArrowLeftIcon, MapPinIcon, PlusIcon } from '@heroicons/vue/24/outline/index.js'
import { useRequest } from 'vue-request'
import { useRouter } from 'vue-router'
import { useUpdateStoreDetailStore } from '~/stores/updateStoreDetail'
import { useUserStore } from '~/stores/user'
import { storeApi } from '~/utils'

const updateStoreDetailStore = useUpdateStoreDetailStore()
const userStore = useUserStore()
const { data: stores, loading: isLoading, run: refresh } = useRequest(() => storeApi.storesGet(userStore.user?.id).then(d => d.data))

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
          <button class="bg-white p-2 rounded-lg" @click="navigate">
            <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
          </button>
        </RouterLink>
        <h2>Your Stores</h2>
        <RouterLink to="/merchant/stores/create" class="text-white bg-emerald-500 rounded-lg p-2">
          <PlusIcon class="w-5 h-5" />
        </RouterLink>
      </header>
      <Loading v-if="isLoading" :loading="true" />
      <div class="p-8">
        <section class="grid grid-cols-2 gap-8">
          <div v-for="store in stores" :key="store.id" class="relative block border border-gray-200 rounded-lg overflow-hidden">
            <img
              :alt="store.name"
              :src="store.resources.imageUrl"
              class="h-48 w-full object-cover lg:h-64"
            >
            <span :class="{ 'bg-gray-400': store.status === 'stopService', 'bg-emerald-500': store.status === 'onService' }" class="inline-block absolute text-white rounded-md top-0 px-3 py-1 text-sm uppercase" v-text="store.status" />
            <div class="p-6">
              <h5 class="text-xl font-bold">
                <span v-text="store.name" />
              </h5>
              <p class="mt-2 text-sm text-gray-600 flex flex-wrap space-x-1">
                <MapPinIcon class="w-4" />
                <span v-text="store.address" />
              </p>
              <div class="flex items-center space-x-2 mt-4">
                <RouterLink
                  :to="`/merchant/stores/${store.id}`"
                  type="button"
                  :disabled="store.status === 'stopService'"
                  class="text-center block w-full rounded-lg text-white p-2 uppercase bg-emerald-500"
                >
                  Serve
                </RouterLink>
                <a
                  href="javascript:;"
                  type="button"
                  class="text-center w-full rounded-lg text-white bg-gray-700 p-2 uppercase"
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
