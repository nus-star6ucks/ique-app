<script lang="ts" setup>
import {
  BuildingStorefrontIcon,
  UserIcon,
} from "@heroicons/vue/24/outline/index.js";
</script>

<template>
  <footer
    class="glassmorphism absolute bottom-0 w-full flex justify-between px-8 py-4"
  >
    <RouterLink to="/merchant" class="tab">
      <span class="icon"><BuildingStorefrontIcon class="w-6 h-6" /></span>
      <span class="text">Stores</span>
    </RouterLink>
    <RouterLink to="/merchant/me" class="tab">
      <span class="icon"><UserIcon class="w-6 h-6" /></span>
      <span class="text">Me</span>
    </RouterLink>
  </footer>
</template>
