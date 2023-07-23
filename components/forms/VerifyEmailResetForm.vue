<template>
    <div>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <EmailField label="global.fields.email_address_old" name="email_old"/>
        <EmailField label="global.fields.email_address_new" name="email_new"/>
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(6)"
          :disabled="submitInProgress"
          class="font-bold"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="reset_email.resetting_email"
            button-text="reset_email.reset_email"
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
    email_old: string()
    .required(() => t("global.messages.field_email_required"))
    .email(() => t("global.messages.field_email_invalid")),
    email_new: string()
    .required(() => t("global.messages.field_email_required"))
    .email(() => t("global.messages.field_email_invalid")),
  });
  
  const { handleSubmit, setErrors, resetForm } = useForm({
    validationSchema: schema,
  });
  
  const onSubmit = handleSubmit(async (values) => {
    submitInProgress.value = true;
    const response = await userService.userVerifyEmailReset({
      locale: localeProperties.value.iso!,
      body: {
        token: urlToken,
        email_old: values.email_old,
        email_new: values.email_new,
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
  