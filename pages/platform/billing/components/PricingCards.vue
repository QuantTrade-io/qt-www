<template>
  <Observer>
    <div
      class="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3"
    >
      <PricingBackground />
      <div
        v-for="product in productsService.products"
        :key="product.id"
        :class="[
          product.featured
            ? 'z-10 bg-white shadow-xl ring-1 ring-gray-900/10'
            : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
          'relative rounded-2xl',
        ]"
      >
        <div class="p-8 lg:pt-12 xl:p-10 xl:pt-14">
          <h3
            :class="[
              product.featured ? 'text-gray-900' : 'text-white',
              'text-sm font-semibold leading-6',
            ]"
          >
            {{ $t(product.name) }}
          </h3>
          <div
            class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch"
          >
            <div class="mt-2 flex items-center gap-x-4">
              <p
                :class="[
                  product.featured ? 'text-gray-900' : 'text-white',
                  'text-4xl font-bold tracking-tight',
                ]"
              >
                {{
                  product.getPriceForInterval(
                    productsService.getInterval().value
                  )
                }}
              </p>
              <div class="text-sm leading-5">
                <p :class="product.featured ? 'text-gray-900' : 'text-white'">
                  USD
                </p>
                <p
                  :class="product.featured ? 'text-gray-500' : 'text-gray-400'"
                >
                  {{
                    $t("pricing.payment") +
                    " " +
                    $t(productsService.getInterval().label)
                  }}
                </p>
              </div>
            </div>
            <button
              aria-label="Home"
              :class="[
                product.featured
                  ? 'bg-blue-900 dark:bg-blue-700 shadow-sm hover:bg-pink-500 dark:hover:bg-pink-400 focus-visible:outline-indigo-600'
                  : 'bg-white/10 hover:bg-white/20 focus-visible:outline-white',
                'rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer',
              ]"
              @click="
                createStripeCheckoutSession(
                  product.getPriceIdForInterval(
                    productsService.getInterval().value
                  )
                )
              "
            >
              <BaseSpinnerSmall
                :submit-in-progress="submitInProgress"
                spinner-text="pricing.buying_plan"
                button-text="pricing.buy_plan"
              />
            </button>
          </div>
          <div class="mt-8 flow-root sm:mt-10">
            <ul
              role="list"
              :class="[
                product.featured
                  ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                  : 'divide-white/5 border-white/5 text-white',
                '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0',
              ]"
            >
              <li
                v-for="usp in product.uniqueSellingPoints"
                :key="usp.id"
                class="flex gap-x-3 py-2"
              >
                <CheckIcon
                  :class="[
                    product.featured ? 'text-indigo-600' : 'text-gray-500',
                    'h-6 w-5 flex-none',
                  ]"
                  aria-hidden="true"
                />
                {{ usp.description }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Observer>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/20/solid";
import { Observer } from "mobx-vue-lite";

import PricingBackground from "./PricingBackground.vue";
import { productsService } from "~/services/subscription/ProductsService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";

const { localeProperties } = useI18n();

const submitInProgress = ref(false);

async function createStripeCheckoutSession(priceId: number | string) {
  submitInProgress.value = true;

  const response = await productsService.getStripeCheckout({
    locale: localeProperties.value.iso!,
    paramPriceId: priceId,
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

  // Redirect user to Stripe Checkout page
  navigateTo(response.data.value.checkout_session_url, { external: true });
}

const localePath = useLocalePath();
</script>
