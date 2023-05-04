<script lang="ts" setup>
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline/index.js'
import { useRequest } from 'vue-request'
import Loading from '../components/Loading.vue'
import { storeApi } from '../utils'
import StoreCard from '~/components/StoreCard.vue'
import { useUserStore } from '~/stores/user'

const { data: stores, loading: isLoading } = useRequest(() => storeApi.storesListGet().then(d => d.data))

useHead({
  meta: [
    {
      name: 'theme-color',
      content: '#fafafa',
    },
  ],
})

const userStore = useUserStore()
</script>

<template>
  <div class="space-y-4 mb-20">
    <header class="flex items-center justify-between mb-12">
      <h1 class="text-xl font-medium">
        iQue
      </h1>
      <button class="rounded-xl bg-white p-2 leading-none">
        <MagnifyingGlassIcon class="w-4 h-4" />
      </button>
    </header>
    <div v-if="!userStore.user" class="p-6 rounded-lg bg-white relative">
      <div>
        <h2 class="text-2xl uppercase mb-4 font-light">
          Welcome to iQue
        </h2>
        <!-- <RouterLink v-slot="{ navigate }" to="/me" custom>
          <button class="border rounded-lg p-2 border-gray-800 flex items-center text-sm" @click="navigate">
            <span>Sign up or login to start</span> <ChevronRightIcon class="w-4" />
          </button>
        </RouterLink> -->
      </div>
      <img src="/assets/banner.svg" class="w-32 absolute right-2 bottom-6">
    </div>
    <!-- <section class="space-x-4 overflow-x-scroll no-scrollbar whitespace-nowrap">
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-emerald-500 text-white px-4 py-2 rounded-lg">
        Fastest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
      <button class="bg-white px-4 py-2 rounded-lg">
        Nearest
      </button>
    </section> -->
    <div class="flex justify-center w-full">
      <iframe width="640" height="4000" src="http://localhost:8080" />
    </div>
    <!-- <section v-if="stores" class="grid grid-cols-2 gap-4">
      <StoreCard v-for="store in stores" :key="store.id" :store="store" />
    </section>
    <Loading :loading="isLoading" /> -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
