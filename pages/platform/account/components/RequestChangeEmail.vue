<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
        {{ $t("platform.settings.change_email_title") }}
      </h2>
      <p class="mt-1 text-sm leading-6 text-slate-400">
        {{ $t("platform.settings.change_email_text") }}
      </p>
    </div>

    <div class="md:col-span-2">
      <div class="mt-8 flex">
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(5)"
          :disabled="submitInProgress"
          class="font-bold"
          @click="requestChangeEmail()"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="platform.settings.change_email_sending"
            button-text="platform.settings.change_email_request"
          />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userService } from "~/services/user/UserService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";

const { localeProperties } = useI18n();

const submitInProgress = ref(false);

async function requestChangeEmail() {
  submitInProgress.value = true;

  const response = await userService.userRequestEmailReset({
    locale: localeProperties.value.iso!,
  });
  submitInProgress.value = false;

  const message = apiResponseHandlerService.handleResponse(response);

  toastMessageService.addToast(
    new ToastMessage({
      id: Math.random(),
      title: message.title,
      message: message.message,
      status: message.status,
    })
  );
}
</script>
