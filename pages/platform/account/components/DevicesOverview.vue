<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
        {{ $t("platform.settings.session_overview_title") }}
      </h2>
      <p class="mt-1 text-sm leading-6 text-slate-400">
        {{ $t("platform.settings.session_overview_text") }}
      </p>
    </div>
    <div class="md:col-span-2">
      <Observer>
        <DeviceList :devices="securityService.devices" />
      </Observer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";

import DeviceList from "~/components/platform/devices/DeviceList.vue";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { securityService } from "~/services/security/SecurityService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";

const { localeProperties } = useI18n();

await onBeforeMount(async () => {
  const response = await securityService.getDevices({
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
  securityService.setDevices(response.data.value);
});
</script>
