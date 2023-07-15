<template>
    <div>
      <label for="password_old" class="block text-sm font-medium leading-6">
        <div class="flex items-center">
            {{ $t("global.fields.password_old") }}
            <span class="ml-2 flex">
            <EyeIcon v-if="showPassword" class="h-4 w-4 hover:cursor-pointer" @click.prevent="toggleShowPassword" aria-hidden="true" />
            <EyeSlashIcon v-else class="h-4 w-4 hover:cursor-pointer" @click.prevent="toggleShowPassword" aria-hidden="true" />
            </span>
        </div>
      </label>
      <div class="mt-1">
        <Field
          name="password_old"
          label="password_old"
          :type="[showPassword === true ? 'text' : 'password']"
          class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
        />
        <ErrorMessage
          name="password_old"
          as="p"
          class="dark:text-pink-200 text-pink-400"
        />
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";

  const showPassword = ref(false)

  function toggleShowPassword() {
    showPassword.value = !showPassword.value
  }
  </script>