<template>
    <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
    <div>
        <h2 class="text-base font-semibold leading-7 dark:text-slate-200">Change password</h2>
        <p class="mt-1 text-sm leading-6 text-slate-400">Update your password associated with your account. This will require a re-login on all of your devices.</p>
    </div>

    <form class="md:col-span-2" @submit.prevent="onSubmit">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div class="col-span-full">
            <div class="mt-2">
                <PasswordOldField/>
            </div>
        </div>

        <div class="col-span-full">
            <div class="mt-2">
              <PasswordNewField />
            </div>
        </div>

      </div>

        <div class="mt-8 flex">
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(5)"
          :disabled="submitInProgress"
          class="font-bold"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="global.util.saving"
            button-text="global.util.save"
          />
          </BaseButton>
        </div>
    </form>
    </div>
</template>

<script setup lang="ts">
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { userService } from "~/services/user/UserService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { modalMessageService } from "~/services/response/ModalMessageService";
import { ModalMessage } from "~/models/response/ModalMessage";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";

import PasswordNewField from "~/components/forms/fields/PasswordNewField.vue";
import PasswordOldField from "~/components/forms/fields/PasswordOldField.vue";

const { t } = useI18n();

const { localeProperties } = useI18n();

const submitInProgress = ref(false);

const schema = object().shape({
  password_old: string()
    .required(() => t("global.messages.field_password_required"))
    .min(10, () => t("global.messages.field_password_too_short")),
  password_new: string()
    .required(() => t("global.messages.field_password_required"))
    .min(10, () => t("global.messages.field_password_too_short")),
});

const { handleSubmit, setErrors, resetForm } = useForm({
  validationSchema: schema,
});


const onSubmit = handleSubmit(async (values) => {
  submitInProgress.value = true;
  const response = await userService.authenticatedUserSettings({
    locale: localeProperties.value.iso!,
    body: {
      password_old: values.password_old,
      password_new: values.password_new,
    },
  });
  submitInProgress.value = false;
  if (response.error.value && response.error.value.data) {
    setErrors(response.error.value.data);
  }
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
  // Log-out current session (rest is done server side)
  await userService.logout();

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
    window.location.reload()
    navigateTo({
        path: localePath("/auth/login"),
      });
  },5000);
});

const localePath = useLocalePath();
</script>