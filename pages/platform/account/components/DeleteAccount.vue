<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
        Delete account
      </h2>
      <p class="mt-1 text-sm leading-6 text-slate-400">
        No longer want to use our service? You can delete your account here.
        This action is not reversible. All information related to this account
        will be deleted permanently.
      </p>
    </div>

    <div class="md:col-span-2">
      <div class="mt-8 flex">
        <button
          class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold dark:text-slate-200 shadow-sm hover:bg-red-400"
          @click="deleteAccount()"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="platform.settings.deleting_account"
            button-text="platform.settings.delete_account"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userService } from "~/services/user/UserService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { modalMessageService } from "~/services/response/ModalMessageService";

const { localeProperties } = useI18n();

definePageMeta({
  layout: "auth",
});

const submitInProgress = ref(false);

async function deleteAccount() {
  submitInProgress.value = true;

  const response = await userService.deleteAuthenticatedUser({
    locale: localeProperties.value.iso!,
  });

  const message = apiResponseHandlerService.handleResponse(response);

  submitInProgress.value = false;

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
  // Log-out current session (rest is done server side)
  await userService.userLogout({
    locale: localeProperties.value.iso!,
  });

  // Notify user about success
  modalMessageService.addModal({
    id: Math.random(),
    title: message.title,
    message: `${message.message} Automatic logout within 5 seconds`,
    status: message.status,
    buttons: [
      {
        id: 1,
        to: "/auth/login",
        themeId: 8,
        label: "Login",
      },
    ],
  });
  // Refresh page in order to make sure that all the tokens are removed
  setTimeout(() => {
    window.location.reload();
    navigateTo({
      path: localePath("/auth/login"),
    });
  }, 5000);
}

const localePath = useLocalePath();
</script>
