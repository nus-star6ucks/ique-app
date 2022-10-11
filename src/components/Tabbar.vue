<script lang="ts" setup>
import { BuildingStorefrontIcon, HomeIcon, TicketIcon, UserIcon } from '@heroicons/vue/24/outline/index.js'

const router = useRouter()
</script>

<template>
  <footer v-if="router.currentRoute.value.path.startsWith('/merchant')" class="tabbar glassmorphism">
    <RouterLink to="/merchant" class="tab">
      <span class="icon"><BuildingStorefrontIcon class="w-6 h-6" /></span>
      <span class="text">Stores</span>
    </RouterLink>
    <RouterLink to="/merchant/tickets" class="tab relative">
      <span class="absolute -right-1 top-0 flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
        <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
      </span>
      <span class="icon">
        <TicketIcon class="w-6 h-6" />
      </span>
      <span class="text">Tickets</span>
    </RouterLink>
    <RouterLink to="/merchant/me" class="tab">
      <span class="icon"><UserIcon class="w-6 h-6" /></span>
      <span class="text">Me</span>
    </RouterLink>
  </footer>
  <footer v-else class="tabbar glassmorphism">
    <RouterLink to="/" class="tab">
      <span class="icon"><HomeIcon class="w-6 h-6" /></span>
      <span class="text">Home</span>
    </RouterLink>
    <RouterLink to="/tickets" class="tab relative">
      <span class="absolute -right-1 top-0 flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
        <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
      </span>
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

