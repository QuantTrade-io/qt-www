<template>
  <div class="flex h-screen">
    <div class="flex flex-1 flex-col">
      <div class="ml-2">
        <ButtonLogout/>
      </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";

import LoadingPricingCards from "./components/LoadingPricingCards.vue";

import ButtonLogout from "./components/ButtonLogout.vue";
import PricingCards from "./components/PricingCards.vue";
import PricingHero from "./components/PricingHero.vue";

import { productsService } from "~/services/subscription/ProductsService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";

const { localeProperties } = useI18n();

definePageMeta({
  layout: "auth",
  middleware: ["check-logged-in-user-tokens"],
});

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
    if (
      response.error.value!.status === 401 ||
      response.error.value!.status === 403
    ) {
      return navigateTo({
        path: localePath("/auth/login"),
      });
    }
    return;
  }

  productsService.setProductsAndInterval(response.data.value);
  dataLoaded.value = true;
});

const localePath = useLocalePath();
</script>
