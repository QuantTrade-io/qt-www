<template>
  <div class="mt-4">
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-pink-400 dark:border-pink-200" />
      </div>
      <div class="relative flex justify-center text-sm font-medium leading-6">
        <span
          class="bg-white dark:bg-slate-900 px-6 text-pink-400 dark:text-pink-200"
          >{{ $t("global.util.or") }}</span
        >
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <NuxtLink :to="localePath('/auth/reset-password')">
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(7)"
          class="font-bold"
        >
          {{ $t("register.reset_password") }}
        </BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { themeButtonService } from "~/services/theme/ThemeButtonService";

const localePath = useLocalePath();
</script>
