<script lang="ts" setup>
import { ArrowLeftIcon, MapPinIcon, PlusIcon } from '@heroicons/vue/24/outline/index.js'
import { useUserStore } from '~/stores/user'
import { storeApi } from '~/utils'

const { user } = useUserStore()
const { state: stores, isLoading } = useAsyncState(storeApi.storesGet(user?.id).then(d => d.data), [])
</script>

<template>
  <div class="block relative col-span-3 h-100vh overflow-y-scroll">
    <header class="p-8 flex items-center justify-between text-gray-800 mb-2 sticky top-0 z-10 bg-gray-50">
      <RouterLink v-slot="{ navigate }" to="/tickets" custom>
        <button class="bg-white p-2 rounded-lg" @click="navigate">
          <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
        </button>
      </RouterLink>
      <h2>Your Stores</h2>
      <div class="w-9 h-9" />
    </header>
    <Loading v-if="isLoading" :loading="true" />
    <div class="p-8">
      <section class="grid grid-cols-2 gap-4">
        <div v-for="store in stores" :key="store.id" class="relative block border border-gray-100 rounded-lg overflow-hidden">
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
            <RouterLink
              :to="`/merchant/stores/${store.id}`"
              type="button"
              :disabled="store.status === 'stopService'"
              :class="{ 'bg-gray-400': store.status === 'stopService', 'bg-emerald-500': store.status === 'onService' }"
              class="mt-4 text-center block w-full rounded-lg text-white p-4 text-sm"
            >
              Serve
            </RouterLink>
          </div>
        </div>
      </section>
      <section class="mt-8 space-y-4 h-full overflow-auto">
        <RouterLink to="/merchant/stores/create" class="mb-2 w-full block flex items-center justify-center space-x-2 text-white bg-emerald-500 rounded-lg shadow-md shadow-emerald-500/40 py-4">
          <PlusIcon class="w-5" />
          <span>Create a Store</span>
        </RouterLink>
      </section>
    </div>
  </div>
  <aside class="bg-white col-span-2 p-8 flex flex-col justify-between h-100vh">
    <header class="flex items-center justify-center text-gray-800 mb-2 h-9">
      <h2>
        Update Store Detail
      </h2>
    </header>
  </aside>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh grid grid-cols-5 p-0 merchant
</route>

