<script lang="ts" setup>
import { ArrowLeftIcon, MapPinIcon, PlusIcon } from '@heroicons/vue/24/outline/index.js'
import type { Store } from '~/api/models'
import { useSnackStore } from '~/stores/snack'
import { useUserStore } from '~/stores/user'
import { storeApi } from '~/utils'

const { user } = useUserStore()
const { state: stores, isLoading, execute: refresh } = useAsyncState(storeApi.storesGet(user?.id).then(d => d.data), [])

const selectedStore = ref<Store & { phoneNumbersText: string }>(undefined!)
const updateStoreLoading = ref<boolean>(false)

const snackStore = useSnackStore()

function updateStore(e: SubmitEvent) {
  updateStoreLoading.value = true
  const formData = selectedStore.value
  storeApi.storesPut({
    id: formData.id,
    name: formData.name,
    type: formData.type as any,
    phoneNumbers: formData.phoneNumbersText.split('\n'),
    resources: formData.resources,
  }).then(() => {
    snackStore.show({ mode: 'success', message: 'Updated Successfully!' })
    selectedStore.value = undefined!
    refresh()
  }).finally(() => {
    updateStoreLoading.value = false
  })
}
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
      <RouterLink to="/merchant/stores/create" class="text-white bg-emerald-500 rounded-lg p-2">
        <PlusIcon class="w-5 h-5" />
      </RouterLink>
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
                @click="() => (selectedStore = { ...store, phoneNumbersText: store.phoneNumbers.join('\n') })"
              >
                Settings
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <aside class="bg-white col-span-2 h-100vh">
    <header class="flex items-center justify-center text-gray-800 mb-2 p-8">
      <div class="w-9 h-9" />
      <h2>
        Update Store Detail
      </h2>
      <div class="w-9 h-9" />
    </header>
    <div class="p-8">
      <form v-if="selectedStore" class="grid grid-cols-6 gap-6" @submit.prevent="updateStore">
        <div class="col-span-6 sm:col-span-3">
          <label
            for="name"
            class="block text-gray-700"
          >
            Store Name
          </label>

          <input
            id="name"
            v-model="selectedStore.name"
            type="text"
            name="name"
            required
            class="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          >
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label
            for="type"
            class="block text-gray-700"
          >
            Type
          </label>

          <select
            id="type"
            v-model="selectedStore.type"
            type="text"
            name="type"
            required
            class="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          >
            <option value="Restaurant">
              Restaurant
            </option>
            <option value="Cafe">
              Cafe
            </option>
          </select>
        </div>

        <div class="col-span-6">
          <label for="address" class="block text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            v-model="selectedStore.address"
            name="address"
            rows="1"
            class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          />
        </div>

        <div class="col-span-6">
          <label for="imageUrl" class="block text-gray-700">
            Storefront Image Url
          </label>

          <input
            id="imageUrl"
            v-model="selectedStore.resources.imageUrl"
            name="imageUrl"
            class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          >
        </div>

        <div class="col-span-6">
          <label
            for="phoneNumbers"

            class="block text-gray-700"
          >
            Phone Numbers (split with line break)
          </label>
          <textarea
            id="phoneNumbers"
            v-model="selectedStore.phoneNumbersText"
            name="phoneNumbers"
            rows="3"
            class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          />
        </div>

        <div class="col-span-6">
          <label for="description" class="block text-gray-700">
            Description
          </label>

          <textarea
            id="description"
            v-model="selectedStore.resources.description"
            name="description"
            rows="3"
            class="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          />
        </div>

        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            type="submit"
            class="inline-block shrink-0 rounded-md border border-emerald-500 bg-emerald-500 px-12 py-3 text-white transition hover:bg-transparent hover:text-emerald-500 focus:outline-none focus:ring active:text-emerald-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </aside>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh grid grid-cols-5 p-0 merchant
</route>

