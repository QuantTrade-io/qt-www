<template>
    <div class="flex h-screen">
      <div class="flex flex-1 flex-col">
        <ButtonHome />
        <div class=""></div>
        <div
          class="flex flex-col flex-1 justify-center mx-auto w-full max-w-sm lg:w-96 py-52 px-4 lg:flex-none"
        >
        <FormActionsHeader />
          <div class="mt-6">
            <VerifyPasswordResetForm />
          </div>
        </div>
      </div>
      <PageImage />
    </div>
  </template>
  
  <script lang="ts" setup>
  import ButtonHome from "./../components/ButtonHome.vue";
  import PageImage from "./../components/PageImage.vue";
  
  import FormActionsHeader from "./components/FormActionsHeader.vue";
  
  import VerifyPasswordResetForm from "~/components/forms/VerifyPasswordResetForm.vue";
  
  definePageMeta({
    layout: "auth",
  });
  </script>