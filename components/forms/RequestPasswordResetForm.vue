<template>
    <div>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <EmailField />
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(6)"
          :disabled="submitInProgress"
          class="font-bold"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="reset_password.requesting"
            button-text="reset_password.request"
          />
        </BaseButton>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { object, string } from "yup";
  import { useForm } from "vee-validate";
  import { themeButtonService } from "~/services/theme/ThemeButtonService";
  import { userService } from "~/services/user/UserService";
  import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
  import EmailField from "~/components/forms/fields/EmailField.vue";
  import { ToastMessage } from "~/models/response/ToastMessage";
  import { toastMessageService } from "~/services/response/ToastMessageService";

  const { t } = useI18n();

  const { localeProperties } = useI18n();

  definePageMeta({
    layout: "auth",
  });

  const submitInProgress = ref(false);

  const schema = object().shape({
    email: string()
      .required(() => t("global.messages.field_email_required"))
      .email(() => t("global.messages.field_email_invalid"))
  });

  const { handleSubmit, setErrors, resetForm } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit(async (values) => {
  submitInProgress.value = true;
  const response = await userService.userRequestPasswordReset({
    locale: localeProperties.value.iso!,
    body: {
      email: values.email,
    },
  });
  submitInProgress.value = false;
  if (response.error.value && response.error.value.data) {
    setErrors(response.error.value.data);
  }

  const message = apiResponseHandlerService.handleResponse(response);

  toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      })
    );

  resetForm();
});
  </script>