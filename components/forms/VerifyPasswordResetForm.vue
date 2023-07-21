<template>
  <div>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <PasswordField />
      <BaseButton
        :button-theme="themeButtonService.getThemeButtonById(6)"
        :disabled="submitInProgress"
        class="font-bold"
      >
        <BaseSpinnerSmall
          :submit-in-progress="submitInProgress"
          spinner-text="reset_password.requesting"
          button-text="reset_password.reset_password"
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
import PasswordField from "~/components/forms/fields/PasswordField.vue";
import { modalMessageService } from "~/services/response/ModalMessageService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

const { t } = useI18n();

const { localeProperties } = useI18n();

let urlToken: any = null;

definePageMeta({
  layout: "auth",
});

onBeforeMount(() => {
  // Get token from URL
  urlToken = useRoute().query.token;
  // If no token -> return error response
  if (!urlToken) {
    modalMessageService.addModal({
      id: Math.random(),
      title: "No token provided",
      message: "No token was provided",
      status: EApiResponseStatus.error,
      buttons: [
        {
          id: 1,
          to: "/auth/register",
          themeId: 8,
          label: "Register",
        },
        {
          id: 2,
          to: "/home",
          themeId: 5,
          label: "Home",
        },
      ],
    });
  }
});

const submitInProgress = ref(false);

const schema = object().shape({
  password: string()
    .required(() => t("global.messages.field_password_required"))
    .min(10, () => t("global.messages.field_password_too_short")),
});

const { handleSubmit, setErrors, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  submitInProgress.value = true;
  const response = await userService.userVerifyPasswordReset({
    locale: localeProperties.value.iso!,
    body: {
      token: urlToken,
      password: values.password,
    },
  });
  submitInProgress.value = false;
  if (response.error.value && response.error.value.data) {
    setErrors(response.error.value.data);
  }

  const message = apiResponseHandlerService.handleResponse(response);

  // If not success response -> handle
  if (!message.isSuccess) {
    modalMessageService.addModal({
      id: Math.random(),
      title: message.title,
      message: message.message,
      status: message.status,
      buttons: [
        {
          id: 1,
          to: "/auth/register",
          themeId: 8,
          label: "Register",
        },
        {
          id: 2,
          to: "/home",
          themeId: 5,
          label: "Home",
        },
      ],
    });
    return;
  }
  // If success response -> handle
  modalMessageService.addModal({
    id: Math.random(),
    title: message.title,
    message: message.message,
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

  resetForm();
});
</script>
