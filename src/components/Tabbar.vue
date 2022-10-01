<script lang="ts">
import { BellIcon, HomeIcon, UserIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    HomeIcon, BellIcon, UserIcon,
  },
}
</script>

<template>
  <footer class="tabbar transition-all">
    <RouterLink to="/" class="tab">
      <HomeIcon class="w-5 h-5" />
      <span>Home</span>
    </RouterLink>
    <RouterLink to="/notification" class="tab">
      <BellIcon class="w-5 h-5" />
      <span>Notification</span>
    </RouterLink>
    <RouterLink to="/me" class="tab">
      <UserIcon class="w-5 h-5" />
      <span>Me</span>
    </RouterLink>
  </footer>
</template>

