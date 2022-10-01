<script lang="ts">
import { BellIcon, HomeIcon, TicketIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'

export default {
  components: {
    HomeIcon, BellIcon, UserIcon, TicketIcon,
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
    <RouterLink to="/ticket" class="tab">
      <TicketIcon class="w-5 h-5" />
      <span>Ticket</span>
    </RouterLink>
    <RouterLink to="/me" class="tab">
      <UserIcon class="w-5 h-5" />
      <span>Me</span>
    </RouterLink>
  </footer>
</template>

