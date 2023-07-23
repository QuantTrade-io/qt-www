<template>
  <div>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <EmailField label="global.fields.email_address" name="email" />
      <FirstNameField />
      <LastNameField />
      <PasswordField />
      <TermsOfServiceField />
      <BaseButton
        :button-theme="themeButtonService.getThemeButtonById(6)"
        :disabled="submitInProgress"
        class="font-bold"
      >
        <BaseSpinnerSmall
          :submit-in-progress="submitInProgress"
          spinner-text="register.register"
          button-text="register.register"
        />
      </BaseButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { boolean, object, string } from "yup";
import { useForm } from "vee-validate";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { userService } from "~/services/user/UserService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";
import EmailField from "~/components/forms/fields/EmailField.vue";
import FirstNameField from "~/components/forms/fields/FirstNameField.vue";
import LastNameField from "~/components/forms/fields/LastNameField.vue";
import PasswordField from "~/components/forms/fields/PasswordField.vue";
import TermsOfServiceField from "~/components/forms/fields/TermsOfServiceField.vue";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { modalMessageService } from "~/services/response/ModalMessageService";
import { ModalMessage } from "~/models/response/ModalMessage";

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
  first_name: string().required(() =>
    t("global.messages.field_first_name_required")
  ),
  last_name: string().required(() =>
    t("global.messages.field_last_name_required")
  ),
  password: string()
    .required(() => t("global.messages.field_password_required"))
    .min(10, () => t("global.messages.field_password_too_short")),
  terms_of_service: boolean().required(() =>
    t("global.messages.field_terms_of_service")
  ),
});

const { handleSubmit, setErrors, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  submitInProgress.value = true;
  const response = await userService.userRegister({
    locale: localeProperties.value.iso!,
    body: {
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      are_guidelines_accepted: values.terms_of_service,
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
  modalMessageService.addModal(
    new ModalMessage({
      id: Math.random(),
      title: message.title,
      message: message.message,
      status: EApiResponseStatus.success,
      buttons: [
        {
          id: 1,
          to: "/auth/login",
          themeId: 8,
          label: "Login",
        },
        {
          id: 2,
          to: "/home",
          themeId: 5,
          label: "Home",
        },
      ],
    })
  );
  resetForm();
});
</script>
