<template>
  <div class="flex justify-between items-center space-x-4">
    <!-- Header Theme && Language switch -->
    <SwitchThemeColor />
    <SwitchLanguage />
    <!-- Header Login button -->
    <NuxtLink :to="localePath('/auth/login')">
      <BaseButton :button-theme="themeButtonService.getThemeButtonById(1)">
        {{ $t("global.header.links.login") }}
      </BaseButton>
    </NuxtLink>
    <!-- Header Get started button -->
    <NuxtLink :to="localePath('/auth/register')">
      <BaseButton :button-theme="themeButtonService.getThemeButtonById(2)">
        <span>{{ $t("global.get_started") }}</span>
      </BaseButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "../../base/BaseButton.vue";

import { themeButtonService } from "~/services/theme/ThemeButtonService";

const localePath = useLocalePath();
</script>
