<template>
  <div>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <EmailField label="global.fields.email_address" name="email"/>
      <PasswordField />
      <BaseButton
        :button-theme="themeButtonService.getThemeButtonById(6)"
        :disabled="submitInProgress"
        class="font-bold"
      >
        <BaseSpinnerSmall
          :submit-in-progress="submitInProgress"
          spinner-text="login.logging_in"
          button-text="login.login"
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
import PasswordField from "~/components/forms/fields/PasswordField.vue";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

const { t } = useI18n();

const { localeProperties } = useI18n();

definePageMeta({
  layout: "auth",
});

const submitInProgress = ref(false);

const schema = object().shape({
  email: string()
    .required(() => t("global.messages.field_email_required"))
    .email(() => t("global.messages.field_email_invalid")),
  password: string()
    .required(() => t("global.messages.field_password_required"))
    .min(10, () => t("global.messages.field_password_too_short")),
});

const { handleSubmit, setErrors, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  submitInProgress.value = true;
  const response = await userService.userLogin({
    locale: localeProperties.value.iso!,
    body: {
      email: values.email,
      password: values.password,
    },
  });
  submitInProgress.value = false;
  if (response.error.value && response.error.value.data) {
    setErrors(response.error.value.data);
  }

  const message = apiResponseHandlerService.handleResponse(response);

  // Unable to login
  if (message.status !== EApiResponseStatus.success) {
    userService._handleUnsuccessfullLogin(message);
    return;
  }
  // Login successfully
  resetForm();
  userService._handleSuccessfullLogin(response.data.value, message);
});
</script>
