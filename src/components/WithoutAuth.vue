<script setup lang="ts">
import type { UserUserTypeEnum } from "~/api/models";

const { userType = "customer" } = defineProps<{
  userType?: UserUserTypeEnum;
}>();

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) router.replace(userType === "customer" ? "/" : "/merchant");
});
</script>

<template>
  <slot />
</template>
