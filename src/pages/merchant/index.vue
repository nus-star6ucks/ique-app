<script lang="ts" setup>
import xss from 'xss'
import { UserUserTypeEnum } from '~/api/models'
import { useSnackStore } from '~/stores/snack'
import { useUpdateStoreDetailStore } from '~/stores/updateStoreDetail'
import { storeApi } from '~/utils'

const updateStoreLoading = ref<boolean>(false)
const updateStoreDetailStore = useUpdateStoreDetailStore()

const selectedStore = computed(() => updateStoreDetailStore?.updateStoreDetail?.selectedStore)
const snackStore = useSnackStore()

function updateStore() {
  updateStoreLoading.value = true
  const formData = selectedStore.value
  if (!formData)
    return

  storeApi.storesPut({
    id: formData.id,
    ...(formData as any),
    name: xss(formData.name),
    type: xss(formData.type) as any,
    address: xss(formData.address),
    phoneNumbers: formData.phoneNumbersText.split('\n').map(t => xss(t)),
    resources: formData.resources,
  }).then(() => {
    snackStore.show({ mode: 'success', message: 'Updated Successfully!' })
    updateStoreDetailStore.setSelectedStore(undefined!)
  }).finally(() => {
    updateStoreLoading.value = false
  })
}
</script>

<template>
  <WithAuth :user-type="UserUserTypeEnum.Merchant">
    <header class="flex items-center justify-center text-gray-800 mb-2 p-8">
      <div class="w-9 h-9" />
      <h2>
        Update Details
      </h2>
      <div class="w-9 h-9" />
    </header>
    <div class="p-8">
      <EmptyBlock v-if="!selectedStore" :cover="true" />

      <form v-else class="grid grid-cols-6 gap-6" @submit.prevent="updateStore">
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
          <button
            class="inline-block shrink-0 rounded-md border border-gray-500 bg-gray-500 px-12 py-3 text-white transition"
            @click="updateStoreDetailStore.setSelectedStore(undefined)"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </WithAuth>
</template>

<route lang="yaml">
meta:
  layout: merchant
</route>

