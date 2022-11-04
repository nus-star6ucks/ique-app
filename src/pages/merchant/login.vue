<script lang="ts" setup>
import { UserIcon } from "@heroicons/vue/24/outline/index.js";
import xss from "xss";
import { UserUserTypeEnum } from "~/api/models";
import { useSnackStore } from "~/stores/snack";
import { useUserStore } from "~/stores/user";
import { hash, userApi } from "~/utils";

const username = ref<string>("");
const password = ref<string>("");
const loading = ref<boolean>(false);

const userStore = useUserStore();
const snackStore = useSnackStore();

async function onSubmit() {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await userApi.usersLoginPost({
      username: xss(username.value),
      password: await hash(xss(password.value)),
    });
    userStore.login(data.token);
    snackStore.show({
      message: `Welcome back, ${username.value}`,
      mode: "success",
    });
    window.setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (e) {
    snackStore.show({
      message: "User credentials are incorrect!",
      mode: "error",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <WithoutAuth :user-type="UserUserTypeEnum.Merchant">
    <section class="bg-white">
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main
          class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div class="max-w-xl lg:max-w-3xl">
            <UserIcon class="block text-emerald-500 w-24" />
            <h1
              class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
            >
              Login as a Merchant
            </h1>

            <form
              class="mt-8 grid grid-cols-6 gap-6"
              @submit.prevent="onSubmit"
            >
              <div class="col-span-6">
                <label for="username" class="block text-gray-700">
                  Username
                </label>
                <input
                  v-model.trim="username"
                  name="username"
                  required
                  type="text"
                  class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                />
              </div>

              <div class="col-span-6">
                <label for="password" class="block text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  minlength="6"
                  type="password"
                  required
                  class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                />
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  class="inline-block shrink-0 rounded-md border border-emerald-500 bg-emerald-500 px-12 py-3 text-white transition hover:bg-transparent hover:text-emerald-500 focus:outline-none focus:ring active:text-emerald-500"
                >
                  Login
                </button>

                <p class="mt-4 text-gray-500 sm:mt-0 w-72">
                  Don't have an account?
                  <RouterLink
                    to="/merchant/signup"
                    class="text-gray-700 underline"
                  >
                    Join Us!
                  </RouterLink>
                </p>
              </div>
            </form>
          </div>
        </main>
        <aside
          class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
        >
          <img
            src="/assets/demo.jpeg"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
      </div>
    </section>
  </WithoutAuth>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh p-0
</route>
