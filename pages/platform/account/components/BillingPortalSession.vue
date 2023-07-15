<template>
    <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
            <h2 class="text-base font-semibold leading-7 dark:text-slate-200">Billing Portal</h2>
            <p class="mt-1 text-sm leading-6 text-slate-400">Check your current billing settings & payment options via the Stripe Billing Portal</p>
        </div>

        <div class="md:col-span-2">
            <div class="mt-8 flex">
            <button
                @click="createStripeBillingPortalSession()"
                class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold dark:text-slate-200 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <BaseSpinnerSmall
                    :submit-in-progress="submitInProgress"
                    spinner-text="platform.billing.stripe_portal_loading"
                    button-text="platform.billing.stripe_portal"
                />
            </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { productsService } from "~/services/subscription/ProductsService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
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