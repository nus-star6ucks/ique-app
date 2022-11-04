<script lang="ts" setup>
import { ArrowLeftOnRectangleIcon, HeartIcon, XMarkIcon } from '@heroicons/vue/24/outline/index.js'
import { useRequest } from 'vue-request'
import Welcome from '../components/Welcome.vue'
import { useUserStore } from '../stores/user'
import { useSnackStore } from '~/stores/snack'
import { userApi } from '~/utils'

const userStore = useUserStore()
const snackStore = useSnackStore()

useHead({
  meta: [
    {
      name: 'theme-color',
      content: () => userStore.user ? '#10b981' : '#fafafa',
    },
  ],
})

function confirmLogout() {
  // eslint-disable-next-line no-alert
  if (window.confirm('Are you sure?'))
    userStore.logout()
}

const { run: deleteMySelf, loading: deleteLoading } = useRequest((id: number) => userApi.usersDelete(id), {
  manual: true,
  onSuccess() {
    snackStore.show({ mode: 'success', message: 'Farewell!' })
    userStore.logout()
  },
})
function confirmDelete() {
  if (!userStore.user || deleteLoading.value)
    return
  // eslint-disable-next-line no-alert
  const userInput = window.prompt('This action cannot be undone, please type your username to continue: ')
  if (userInput === userStore.user.username)
    deleteMySelf(Number(userStore.user.id))
}
</script>

<template>
  <Welcome v-if="!userStore.user" />
  <div v-else>
    <div class="text-white bg-emerald-500 -m-8 p-8">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-2xl font-semibold mb-2">
            :-)
          </p>
          <h1 class="text-3xl font-semibold uppercase" v-text="userStore.user?.username" />
        </div>
        <div class="rounded-md bg-contain w-14 h-14" :style="`background-image: url('https://i.pravatar.cc/150?u=${userStore.user.username}')`" />
      </div>
      <div class="h-24" />
    </div>
    <div class="mt-12">
      <ul class="menu">
        <li>
          <span class="icon"><HeartIcon class="w-6 h-6" /></span>
          <span class="text">Rate Us</span>
        </li>
        <li @click="confirmDelete">
          <span class="icon"><XMarkIcon class="w-6 h-6" /></span>
          <span class="text">Delete Account</span>
        </li>
        <li @click="confirmLogout">
          <span class="icon"><ArrowLeftOnRectangleIcon class="w-6 h-6" /></span>
          <span class="text">Logout</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  classNames: me with-tabbar
</route>

