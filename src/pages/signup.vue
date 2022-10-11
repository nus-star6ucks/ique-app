<script lang="ts">
import { ArrowLeftIcon, LockClosedIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'
import { useUserStore } from '~/stores/user'
import { userApi } from '~/utils'
import WithoutAuth from '~/components/WithoutAuth.vue'

export default defineComponent({
  components: {
    ArrowLeftIcon,
    UserIcon,
    PhoneIcon,
    LockClosedIcon,
    WithoutAuth,
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      phone: '',
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      if (this.loading)
        return
      this.loading = true
      try {
        await userApi.usersPost({
          username: this.username,
          password: this.password,
          phoneNumber: this.phone,
          userType: 'customer',
        })
        this.$router.push('/')
      }
      catch (e) {
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
            <input placeholder="Username" name="username" required type="text" class="px-6 pl-14" minlength="6">
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 top-4 inline-flex">
              <PhoneIcon class="w-6 h-6 text-gray-400" />
            </div>
            <input placeholder="Phone" name="phone" type="text" class="px-6 pl-14" required>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 top-4 inline-flex">
              <LockClosedIcon class="w-6 h-6 text-gray-400" />
            </div>
            <input placeholder="Password" name="password" minlength="6" required class="px-6 pl-14" type="password">
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-4 top-4 inline-flex">
              <LockClosedIcon class="w-6 h-6 text-gray-400" />
            </div>
            <input placeholder="Password Confirmation" name="passwordConfirmation" minlength="6" required class="px-6 pl-14" type="password">
          </div>
        </div>
        <div>
          <button type="submit" class="text-center w-full bg-emerald-500 shadow-md shadow-emerald-500/40 text-white rounded-lg uppercase py-4">
            Sign up
          </button>
          <p class="text-center mt-4 text-gray-400 px-4 text-xs">
            By clicking Sign up, you agree to your <a href="javascript:;">Terms and Conditions</a> and <a href="javascript:;">Privacy Statement</a>
          </p>
        </div>
      </form>
    </div>
  </WithoutAuth>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
