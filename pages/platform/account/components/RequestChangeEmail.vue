<template>
    <div
      class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
    >
      <div>
        <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
          Change Email
        </h2>
        <p class="mt-1 text-sm leading-6 text-slate-400">
          Request a change email link in order to change your current email address.
        </p>
      </div>
  
      <div class="md:col-span-2">
        <div class="mt-8 flex">
          <button
            class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold dark:text-slate-200 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            @click="requestChangeEmail()"
          >
            <BaseSpinnerSmall
              :submit-in-progress="submitInProgress"
              spinner-text="platform.settings.change_email_sending"
              button-text="platform.settings.change_email_request"
            />
          </button>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { userService } from "~/services/user/UserService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
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