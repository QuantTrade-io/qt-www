<template>
  <div class="flex h-screen">
    <div class="flex flex-1 flex-col overflow-auto">
      <NuxtLink :to="localePath('/home')" class="mt-2 ml-2" aria-label="Home">
        ← {{ $t("register.home") }}
      </NuxtLink>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { userService } from "~/services/user/UserService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { modalMessageService } from "~/services/response/ModalMessageService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

definePageMeta({
  layout: "auth",
});

const { localeProperties } = useI18n();

modalMessageService.addModal({
  id: Math.random(),
  title: "register.verify_email",
  inProgress: true,
  message: "",
  status: EApiResponseStatus.info,
  buttons: [],
});

onBeforeMount(async () => {
  // Get token from URL
  const token = useRoute().query.token;
  // If no token -> return error response
  if (!token) {
    modalMessageService.removeModal(modalMessageService.displayModalMessage.id);
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
    return;
  }
  // Validate token on the Server
  const response = await userService.userVerifyEmail({
    locale: localeProperties.value.iso!,
    body: {
      token: token.toString(),
    },
  });
  // Remove loading modal
  modalMessageService.removeModal(modalMessageService.displayModalMessage.id);
  // Parse response
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
});

const localePath = useLocalePath();
</script>
