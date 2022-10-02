<script lang="ts">
import { BellIcon, HomeIcon, TicketIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'

export default {
  components: {
    HomeIcon, BellIcon, UserIcon, TicketIcon,
  },
}
</script>

<template>
  <footer class="tabbar">
    <RouterLink to="/" class="tab">
      <span class="icon"><HomeIcon class="w-6 h-6" /></span>
      <span class="text">Home</span>
    </RouterLink>
    <RouterLink to="/notification" class="tab">
      <span class="icon">
        <BellIcon class="w-6 h-6" />
      </span>
      <span class="text">Notifications</span>
    </RouterLink>
    <RouterLink to="/tickets" class="tab">
      <span class="icon">
        <TicketIcon class="w-6 h-6" />
      </span>
      <span class="text">Tickets</span>
    </RouterLink>
    <RouterLink to="/me" class="tab">
      <span class="icon"><UserIcon class="w-6 h-6" /></span>
      <span class="text">Me</span>
    </RouterLink>
  </footer>
</template>

