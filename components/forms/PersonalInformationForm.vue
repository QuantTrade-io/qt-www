<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
        {{ $t("platform.settings.personal_information_title") }}
      </h2>
      <p class="mt-1 text-sm leading-6 text-slate-400">
        {{ $t("platform.settings.personal_information_text") }}
      </p>
    </div>
    <div>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <ImageField :image-url="userService.authenticatedUserImage!" />
        <FirstNameField />
        <LastNameField />
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(6)"
          :disabled="submitInProgress"
          class="font-bold"
        >
          <BaseSpinnerSmall
            :submit-in-progress="submitInProgress"
            spinner-text="global.util.saving"
            button-text="global.util.save"
          />
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { object, string, mixed } from "yup";
import { useForm, useField } from "vee-validate";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { userService } from "~/services/user/UserService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import FirstNameField from "~/components/forms/fields/FirstNameField.vue";
import ImageField from "~/components/forms/fields/ImageField.vue";
import LastNameField from "~/components/forms/fields/LastNameField.vue";
import { ApiResponseAuthenticatedUser } from "~/services/user/TypesUserService";

const { t } = useI18n();

const { localeProperties } = useI18n();

definePageMeta({
  layout: "auth",
});

const submitInProgress = ref(false);

const schema = object().shape({
  first_name: string().required(() =>
    t("global.messages.field_first_name_required")
  ),
  last_name: string().required(() =>
    t("global.messages.field_last_name_required")
  ),
  file: mixed()
    .required(() => t("global.messages.field_last_name_required"))
    // Check this first, since this is a 'cheap' test
    .test("is-valid-type", "Not a valid image type", (value) =>
      checkFileExtension(value)
    )
    .test("is-valid-size", "File too big, max size: 10MB", (value) =>
      checkFileSize(value)
    )
    .test(
      "is-valid-mime-type",
      "Not a valid MIME type",
      async (value) => await checkFileMimeType(value)
    ),
});

const { handleSubmit, setErrors, setValues } = useForm({
  validationSchema: schema,
});

const { meta: firstNameMeta } = useField("first_name");
const { meta: lastNameMeta } = useField("last_name");
const { meta: imageMeta } = useField("file");

setValues({
  first_name: userService.authenticatedUserFirstName,
  last_name: userService.authenticatedUserLastName,
  file: userService.authenticatedUserImage,
});

const onSubmit = handleSubmit(async (values) => {
  submitInProgress.value = true;

  const formData = new FormData();

  if (firstNameMeta.dirty) {
    // Check if first_name is dirty
    formData.append("first_name", values.first_name); // Add first_name to the key-value pair
  }

  if (lastNameMeta.dirty) {
    // Check if last_name is dirty
    formData.append("last_name", values.last_name); // Add last_name to the key-value pair
  }

  if (imageMeta.dirty) {
    // Check if image is dirty
    formData.append("image", values.file); // Add image to the key-value pair
  }

  const response = await userService.patchAuthenticatedUser({
    locale: localeProperties.value.iso!,
    body: formData,
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
  if (message.status !== EApiResponseStatus.success) {
    return;
  }

  userService._handleAuthenticatedUserResponse(
    response.data.value as ApiResponseAuthenticatedUser
  );
});
</script>
