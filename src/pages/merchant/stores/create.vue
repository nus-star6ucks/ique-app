<script lang="ts" setup>
import { BuildingStorefrontIcon } from "@heroicons/vue/24/outline/index.js";
import { useRequest } from "vue-request";
import { UserUserTypeEnum } from "~/api/models";
import { useSnackStore } from "~/stores/snack";
import { useUserStore } from "~/stores/user";
import { sanitize, storeApi } from "~/utils";

useHead({
  meta: [
    {
      name: "theme-color",
      content: () => "#fff",
    },
  ],
});

const router = useRouter();
const snackStore = useSnackStore();
const userStore = useUserStore();
const { run: create, loading } = useRequest(
  (payload: any) => storeApi.storesPost(payload).then((d) => d.data),
  {
    manual: true,
    onSuccess() {
      snackStore.show({ mode: "success", message: "Created successfully!" });
      router.replace("/merchant");
    },
    onError() {
      snackStore.show({ mode: "error", message: "Unexpected error!" });
    },
  }
);

function onSubmit({
  target: { name, type, address, imageUrl, description },
}: any) {
  if (!userStore?.user?.id) return;

  const payload = {
    merchantId: userStore.user.id,
    name: name.value,
    type: type.value,
    address: address.value,
    phoneNumbers: [],
    seatTypes: [],
    resources: {
      description: description.value,
      ratings: 4,
      imageUrl: imageUrl.value,
    },
  };

  create(sanitize(payload));
}
</script>

<template>
  <WithAuth :user-type="UserUserTypeEnum.Merchant">
    <section class="bg-white">
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main
          class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div class="max-w-xl lg:max-w-3xl">
            <BuildingStorefrontIcon class="block text-emerald-500 w-24" />
            <h1
              class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
            >
              Create a Store
            </h1>

            <form
              class="mt-8 grid grid-cols-6 gap-6"
              @submit.prevent="onSubmit"
            >
              <div class="col-span-6 sm:col-span-3">
                <label for="name" class="block text-gray-700">
                  Store Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  minlength="6"
                  required
                  class="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="type" class="block text-gray-700"> Type </label>

                <select
                  id="type"
                  type="text"
                  name="type"
                  required
                  class="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="Cafe">Cafe</option>
                </select>
              </div>

              <div class="col-span-6">
                <label for="address" class="block text-gray-700">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="1"
                  class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                />
              </div>

              <div class="col-span-6">
                <label for="imageUrl" class="block text-gray-700">
                  Storefront Image Url
                </label>

                <input
                  id="imageUrl"
                  type="url"
                  name="imageUrl"
                  required
                  class="p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                />
              </div>

              <div class="col-span-6">
                <label for="description" class="block text-gray-700">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  class="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-gray-700 border border-gray-200"
                />
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="inline-block shrink-0 rounded-md border border-emerald-500 bg-emerald-500 px-12 py-3 text-white transition hover:bg-transparent hover:text-emerald-500 focus:outline-none focus:ring active:text-emerald-500"
                >
                  Create Now
                </button>

                <p class="mt-4 text-gray-500 sm:mt-0">
                  Already have a Store?
                  <RouterLink to="/merchant" class="text-gray-700 underline">
                    Back to Dashboard.
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
  </WithAuth>
</template>

<route lang="yaml">
meta:
  layout: default
  classNames: m-0 h-100vh p-0
</route>
