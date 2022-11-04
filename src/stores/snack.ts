import { acceptHMRUpdate, defineStore } from "pinia";

interface Snack {
  mode: "success" | "error";
  message: string;
}

export const useSnackStore = defineStore("snack", () => {
  /**
   * Current name of the user.
   */
  const snack = ref<Snack | undefined>(undefined);

  function show({ mode = "success", message }: Snack) {
    snack.value = {
      mode,
      message,
    };

    window.setTimeout(() => {
      snack.value = undefined;
    }, 2000);
  }

  return {
    show,
    snack,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSnackStore, import.meta.hot));
