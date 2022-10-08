<script lang="ts">
import { ArrowLeftIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'
import { useUserStore } from '~/stores/user'
import { userApi } from '~/utils'
import WithoutAuth from '~/components/WithoutAuth.vue'
import { useSnackStore } from '~/stores/snack'

export default defineComponent({
  components: {
    ArrowLeftIcon,
    LockClosedIcon,
    UserIcon,
    WithoutAuth,
  },
  setup() {
    const userStore = useUserStore()
    const snackStore = useSnackStore()
    return { userStore, snackStore }
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      if (this.loading)
        return
      this.loading = true
      try {
        const { data } = await userApi.usersLoginPost({
          username: this.username,
          password: this.password,
        })
        this.userStore.login(data.token)
        this.snackStore.show({ message: `Welcome back, ${this.username}` })
        window.setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      finally {
        this.loading = false
      }
    },
  },
})
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
      <div>
        <button type="submit" :disabled="loading" :class="{ 'shadow-none': loading, 'bg-gray-400': loading }" class="transition-all text-center w-full bg-emerald-500 shadow-md shadow-emerald-500/40 text-white rounded-lg uppercase py-4">
          Login
        </button>
        <p class="text-center mt-4 text-gray-400 px-4 text-xs">
          By clicking Login, you agree to your <a href="javascript:;">Terms and Conditions</a> and <a href="javascript:;">Privacy Statement</a>
        </p>
      </div>
    </form>
  </WithoutAuth>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
