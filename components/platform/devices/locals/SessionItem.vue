<template>
  <div class="flex items-center gap-x-4 px-6 my-2">
    <HomeIcon class="h-8 w-8 flex-none rounded-lg object-cover text-pink-400" />
    <div class="text-sm font-medium">
      {{ session.city }}, {{ session.country }}
    </div>
    <BaseButton
      class="relative ml-auto"
      :button-theme="themeButtonService.getThemeButtonById(11)"
      @click="deleteSession(session.id, deviceId)"
    >
      <BaseSpinnerSmall
        :submit-in-progress="submitInProgress"
        spinner-text="platform.settings.deleting_session"
        button-text="platform.settings.delete_session"
      />
    </BaseButton>
  </div>
  <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
    <div class="flex justify-between gap-x-4 py-3">
      <dt class="text-slate-500">Last used</dt>
      <dd class="text-slate-700 dark:text-slate-300 font-medium">
        <p>{{ session.lastUsed }}</p>
      </dd>
    </div>
    <div class="flex justify-between gap-x-4 py-3">
      <dt class="text-slate-500">Expires at</dt>
      <dd
        class="flex items-start gap-x-2 text-slate-700 dark:text-slate-300 font-medium"
      >
        <p>{{ session.expiresAt }}</p>
      </dd>
    </div>
    <div class="flex justify-between gap-x-4 py-3">
      <dt class="text-slate-500">Active</dt>
      <dd
        class="flex items-start gap-x-2 text-slate-700 dark:text-slate-300 font-medium"
      >
        <CheckIcon v-if="session.active" class="w-5 h-5 text-green-500" />
        <XMarkIcon v-else class="w-5 h-5 text-red-500" />
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { CheckIcon, HomeIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { Session } from "~/models/security/Session";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { securityService } from "~/services/security/SecurityService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

const { localeProperties } = useI18n();

const submitInProgress = ref(false);

interface Props {
  session: Session;
  deviceId: number | string;
}

defineProps<Props>();

async function deleteSession(
  sessionId: string | number,
  deviceId: string | number
) {
  submitInProgress.value = true;
  const response = await securityService.deleteSession({
    locale: localeProperties.value.iso!,
    sessionId,
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

  // Catch error
  if (message.status !== EApiResponseStatus.success) {
    return;
  }

  securityService.deleteSessionFromDevice(sessionId, deviceId);
}
</script>
