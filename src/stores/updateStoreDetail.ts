import { acceptHMRUpdate, defineStore } from "pinia";
import type { Store } from "~/api/models";

interface UpdateStoreDetail {
  selectedStore?: Store & { phoneNumbersText: string };
}

export const useUpdateStoreDetailStore = defineStore(
  "updateStoreDetail",
  () => {
    const updateStoreDetail = ref<UpdateStoreDetail | undefined>(undefined);

    function setSelectedStore(
      _updateStoreDetail: UpdateStoreDetail | undefined
    ) {
      updateStoreDetail.value = _updateStoreDetail;
    }

    return {
      updateStoreDetail,
      setSelectedStore,
    };
  }
);

if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useUpdateStoreDetailStore, import.meta.hot)
  );
