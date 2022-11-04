<script setup lang="ts">
import { UserUserTypeEnum } from "~/api/models";
import { useUserStore } from "~/stores/user";

const { userType = "customer" } = defineProps<{
  userType?: UserUserTypeEnum;
}>();
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  const routePath = window.location.hash.substring(1);

  if (
    userStore.user?.userType === UserUserTypeEnum.Customer &&
    routePath.startsWith("/merchant")
  ) {
    router.replace("/");
    return;
  }

  if (
    userStore.user?.userType === UserUserTypeEnum.Merchant &&
    !routePath.startsWith("/merchant")
  )
    router.replace("/merchant");

  const token = localStorage.getItem("token");

  if (!token)
    router.replace(userType === "customer" ? "/me" : "/merchant/login");
});
</script>

<template>
  <slot />
</template>
