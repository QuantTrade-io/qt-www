<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
        {{ $t("platform.settings.billing_portal_title") }}
      </h2>
      <p class="mt-1 text-sm leading-6 text-slate-400">
        {{ $t("platform.settings.billing_portal_text") }}
      </p>
    </div>

    <div class="md:col-span-2">
      <div class="mt-8 flex">
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(5)"
          :disabled="submitInProgress"
          class="font-bold"
          @click="createStripeBillingPortalSession()"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="platform.billing.stripe_portal_loading"
            button-text="platform.billing.stripe_portal"
          />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productsService } from "~/services/subscription/ProductsService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";

const { localeProperties } = useI18n();

const submitInProgress = ref(false);

async function createStripeBillingPortalSession() {
  submitInProgress.value = true;

  const response = await productsService.getStripeBillingPortal({
    locale: localeProperties.value.iso!,
  });
  submitInProgress.value = false;

  const message = apiResponseHandlerService.handleResponse(response);

  // Unable to create a Stripe session
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

  // Redirect user to Stripe Checkout page
  navigateTo(response.data.value.billing_portal_url, { external: true });
}
</script>
