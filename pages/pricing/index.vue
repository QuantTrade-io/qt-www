<template>
  <Observer>
    <div class="isolate overflow-hidden">
      <div class="flow-root pb-16 pt-24 sm:pt-32 lg:pb-0 mb-36 lg:mb-96">
        <div v-if="dataLoaded" class="mx-auto max-w-7xl px-6 lg:px-8">
          <PricingHero />
          <PricingCards />
        </div>
        <div v-else class="mx-auto max-w-7xl px-6 lg:px-8">
          <LoadingPricingCards />
        </div>
      </div>
    </div>
  </Observer>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";

import LoadingPricingCards from "./components/LoadingPricingCards.vue";

import PricingCards from "./components/PricingCards.vue";
import PricingHero from "./components/PricingHero.vue";

import { productsService } from "~/services/subscription/ProductsService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";

const { localeProperties } = useI18n();

const dataLoaded = ref(false);

await onMounted(async () => {
  const response = await productsService.getProducts({
    locale: localeProperties.value.iso!,
  });

  const message = apiResponseHandlerService.handleResponse(response);

  if (message.status !== EApiResponseStatus.success) {
    toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      })
    );
    return;
  }

  productsService.setProductsAndInterval(response.data.value);
  dataLoaded.value = true;
});
</script>
