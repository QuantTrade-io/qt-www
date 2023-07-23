<template>
    <div>
      <NuxtLink :to="localePath('/home')" aria-label="Home">
        <BaseLogoTextWhite class="hidden dark:block w-auto h-6 md:h-10" />
        <BaseLogoTextBlue class="block dark:hidden w-auto h-6 md:h-10" />
      </NuxtLink>
      <h2 class="mt-4 text-3xl font-bold tracking-tight">
        {{ $t("reset_email.reset_email") }}
      </h2>
    </div>
  </template>
  
  <script setup lang="ts">
  const localePath = useLocalePath();
  </script>