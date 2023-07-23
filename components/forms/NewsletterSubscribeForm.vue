<template>
  <div class="mt-6">
    <form class="space-y-6" @submit.prevent="onSubmit">
      <EmailField label="global.fields.email_address" name="email" />
      <div>
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(6)"
          class="font-bold"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="newsletter.subscribing"
            button-text="newsletter.keep_me_posted"
          />
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { newsletterSubscriptionService } from "~/services/utils/NewsletterSubscriptionService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { toastMessageService } from "~/services/response/ToastMessageService";
import EmailField from "~/components/forms/fields/EmailField.vue";
import { ToastMessage } from "~/models/response/ToastMessage";

const { localeProperties } = useI18n();

definePageMeta({
  layout: "auth",
});

const submitInProgress = ref(false);

const schema = object().shape({
  email: string().required().email(),
});

const { handleSubmit, setErrors, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  submitInProgress.value = true;
  const response = await newsletterSubscriptionService.subscribe({
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
  if (message?.isSuccess) {
    resetForm();
  }
});
</script>
