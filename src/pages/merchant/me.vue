<script lang="ts" setup>
import { AdjustmentsHorizontalIcon, ArrowLeftOnRectangleIcon, HeartIcon } from '@heroicons/vue/24/outline/index.js'
import { useRequest } from 'vue-request'
import { useUserStore } from '~/stores/user'
import { storeApi } from '~/utils'

const userStore = useUserStore()
const { data: stores } = useRequest(storeApi.storesGet(userStore.user?.id).then(d => d.data))

const updateDetailSwitch = ref<boolean>(false)
</script>

<template>
  <div>
    <div class="text-white bg-emerald-500 p-8">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-2xl font-semibold mb-2">
            :-)
          </p>
          <h1 class="text-3xl font-semibold uppercase" v-text="userStore.user?.username" />
        </div>
        <div class="rounded-md bg-contain w-14 h-14" :style="`background-image: url('https://i.pravatar.cc/150?u=${userStore.user?.username}')`" />
      </div>
      <div v-if="stores" class="flex space-x-8 mt-8">
        <div>
          <h3 class="font-semibold text-xl mb-1" v-text="stores.length" />
          <p class="text-gray-200">
            Stores
          </p>
        </div>
      </div>
    </div>
    <div v-if="userStore.user" class="mt-8 px-8">
      <ul v-if="!updateDetailSwitch" class="menu">
        <li>
          <span class="icon"><HeartIcon class="w-6 h-6" /></span>
          <span class="text">Rate Us</span>
        </li>
        <li @click="updateDetailSwitch = true">
          <span class="icon"><AdjustmentsHorizontalIcon class="w-6 h-6" /></span>
          <span class="text">Settings</span>
        </li>
        <li>
          <span class="icon"><ArrowLeftOnRectangleIcon class="w-6 h-6" /></span>
          <span class="text">Logout</span>
        </li>
      </ul>
      <form v-if="updateDetailSwitch" action="#" class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <label for="imageUrl" class="block text-gray-700">
            Username (Cannot be changed)
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            readonly
            class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          >
        </div>

        <div class="col-span-6">
          <label for="phoneNumber" class="block text-gray-700">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
            v-text="userStore.user.username"
          >
        </div>
        <div class="col-span-6">
          <label for="password" class="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            placeholder="Leave it empty if it is no need to modify"
            class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          >
        </div>
        <div class="col-span-6">
          <label for="passwordConfirmation" class="block text-gray-700">
            Password Confirmation
          </label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
          >
        </div>

        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            class="inline-block shrink-0 rounded-md border border-emerald-500 bg-emerald-500 px-12 py-3 text-white transition hover:bg-transparent hover:text-emerald-500 focus:outline-none focus:ring active:text-emerald-500"
          >
            Submit
          </button>

          <p class="mt-4 text-gray-500 sm:mt-0">
            <a href="javascript:;" class="text-gray-700 underline" @click="updateDetailSwitch = false">Back without changes</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: merchant
</route>

