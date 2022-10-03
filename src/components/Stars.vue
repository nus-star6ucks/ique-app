<script setup lang="ts">
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid/index.js'
import { StarIcon } from '@heroicons/vue/24/outline/index.js'

const props = defineProps<{
  count: number
}>()

const { count } = useCounter(props.count)
</script>

<template>
  <div class="flex items-center space-x-0.5">
    <span v-for="(item, index) in Array(5).fill(0)" :key="item">
      <StarSolidIcon v-if="index < count" class="w-5 text-yellow-500" />
      <StarIcon v-else class="w-5 text-gray-400" />
    </span>
  </div>
</template>

