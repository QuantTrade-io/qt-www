<template>
  <button class="mt-2 ml-2" aria-label="Home" @click="userLogout">
    ← {{ $t("platform.billing.logout") }}
  </button>
</template>

<script setup lang="ts">
import { userService } from "~/services/user/UserService";

const { localeProperties } = useI18n();

async function userLogout() {
  await userService.userLogout({
    locale: localeProperties.value.iso!,
  });
  // Refresh page in order to make sure that all the tokens are removed
  window.location.reload();
  navigateTo({
    path: localePath("/auth/login"),
  });
}

const localePath = useLocalePath();
</script>
