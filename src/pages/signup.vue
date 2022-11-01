<script lang="ts" setup>
import { ArrowLeftIcon, LockClosedIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'
import { sanitize, userApi } from '~/utils'
import WithoutAuth from '~/components/WithoutAuth.vue'
import { useSnackStore } from '~/stores/snack'

const username = ref<string>('')
const password = ref<string>('')
const passwordConfirmation = ref<string>('')
const phoneNumber = ref<string>('')
const loading = ref<boolean>(false)

const router = useRouter()
const snackStore = useSnackStore()

async function onSubmit() {
  if (password.value !== passwordConfirmation.value) {
    snackStore.show({ message: 'Password and its confirmation are mismatched!', mode: 'error' })
    return
  }
  if (loading.value)
    return
  loading.value = true
  try {
    await userApi.usersPost(sanitize({
      username: username.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
      userType: 'customer',
    }) as any)
    snackStore.show({ message: 'Signed up successfully, please login.', mode: 'success' })
    router.replace('/login')
  }
  catch (e: any) {
    if (e?.response.data?.message) {
      snackStore.show({ message: e?.response?.data?.message, mode: 'error' })
      return
    }
    snackStore.show({ message: 'Unexpected error!', mode: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <WithoutAuth>
    <div>
      <header class="flex items-center justify-between">
        <RouterLink v-slot="{ navigate }" to="/me" custom>
          <button class="bg-white p-2 rounded-lg" @click="navigate">
            <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
          </button>
        </RouterLink>

        <RouterLink to="/login" class="text-gray-800">
          Login
        </RouterLink>
      </header>

      <form class="form-auth mt-24 space-y-16" @submit.prevent="onSubmit">
        <h2 class="font-semibold text-3xl pt-8">
          Join Us
        </h2>
        <div class="space-y-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-4 top-4 inline-flex">
              <UserIcon class="w-6 h-6 text-gray-400" />
            </div>
            <input v-model="username" placeholder="Username" name="username" required type="text" class="px-6 pl-14" minlength="6">
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 top-4 inline-flex">
              <PhoneIcon class="w-6 h-6 text-gray-400" />
            </div>
            <input v-model="phoneNumber" placeholder="Phone" name="phone" type="text" class="px-6 pl-14" required>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 top-4 inline-flex">
              <LockClosedIcon class="w-6 h-6 text-gray-400" />
            </div>
            <input v-model="password" placeholder="Password" name="password" minlength="6" required class="px-6 pl-14" type="password">
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 top-4 inline-flex">
              <LockClosedIcon class="w-6 h-6 text-gray-400" />
            </div>
            <input v-model="passwordConfirmation" placeholder="Password Confirmation" name="passwordConfirmation" minlength="6" required class="px-6 pl-14" type="password">
          </div>
        </div>
        <div>
          <button type="submit" class="text-center w-full bg-emerald-500 shadow-md shadow-emerald-500/40 text-white rounded-lg uppercase py-4">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </WithoutAuth>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
