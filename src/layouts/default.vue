<template>
  <main :class="[useRouter().currentRoute.value.meta.classNames]">
    <RouterView />
  </main>
</template>
