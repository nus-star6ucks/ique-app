<script lang="ts" setup>
import { ArrowLeftIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'
import xss from 'xss'
import { useUserStore } from '~/stores/user'
import { useSnackStore } from '~/stores/snack'
import { hash, userApi } from '~/utils'
import WithoutAuth from '~/components/WithoutAuth.vue'

const userStore = useUserStore()
const snackStore = useSnackStore()

const username = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)

async function loginWithGitHub() {
  window.location.href = '/api/oauth2/authorization/github'
}

async function onSubmit() {
  if (loading.value)
    return
  loading.value = true
  try {
    const { data } = await userApi.usersLoginPost({
      username: xss(username.value),
      password: await hash(xss(password.value)),
    } as any)

    userStore.login(data.token)
    window.setTimeout(() => {
      window.location.reload()
    }, 1500)
  }
  catch (e) {
    snackStore.show({ message: 'User credentials are incorrect!', mode: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <WithoutAuth>
    <header class="flex items-center justify-between">
      <RouterLink v-slot="{ navigate }" to="/me" custom>
        <button class="bg-white p-2 rounded-lg" @click="navigate">
          <ArrowLeftIcon class="w-5 h-5 text-gray-800" />
        </button>
      </RouterLink>
      <RouterLink to="/signup" class="text-gray-800">
        Signup
      </RouterLink>
    </header>
    <form class="form-auth mt-24 space-y-16" @submit.prevent="onSubmit">
      <h2 class="font-semibold text-3xl pt-8">
        Welcome Back
      </h2>
      <div class="space-y-4">
        <div class="relative">
          <div class="absolute inset-y-0 left-4 top-4 inline-flex">
            <UserIcon class="w-6 h-6 text-gray-400" />
          </div>
          <input v-model.trim="username" placeholder="Username" name="username" required type="text" class="px-6 pl-14" minlength="6">
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-4 top-4 inline-flex">
            <LockClosedIcon class="w-6 h-6 text-gray-400" />
          </div>
          <input v-model="password" placeholder="Password" name="password" minlength="6" required class="px-6 pl-14" type="password">
        </div>
        <div class="relative space-x-2">
          <label>
            <input type="checkbox">
            <span class="ml-2 text-gray-600">Remember me</span>
          </label>
        </div>
      </div>
      <div class="space-y-4">
        <button type="button" :disabled="loading" :class="{ 'shadow-none': loading, 'bg-gray-400': loading }" class="transition-all w-full flex space-x-2 items-center justify-center bg-gray-900 shadow-md shadow-gray-500/40 text-white rounded-lg uppercase py-4" @click="loginWithGitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 fill-white"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z" /></svg>
          <span>
            Login With GitHub
          </span>
        </button>
        <button type="submit" :disabled="loading" :class="{ 'shadow-none': loading, 'bg-gray-400': loading }" class="transition-all text-center w-full bg-emerald-500 shadow-md shadow-emerald-500/40 text-white rounded-lg uppercase py-4">
          Login
        </button>
        <p class="text-center mt-4 text-gray-400 px-4 text-xs">
          By clicking Login, you agree to our <a href="javascript:;">Terms and Conditions</a> and <a href="javascript:;">Privacy Statement</a>
        </p>
      </div>
    </form>
  </WithoutAuth>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
