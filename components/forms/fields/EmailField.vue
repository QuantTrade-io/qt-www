<template>
  <div>
    <label :for="name" class="block text-sm font-medium leading-6">{{
      $t(label)
    }}</label>
    <div class="mt-1">
      <Field
        :name="name"
        type="email"
        autocomplete="email"
        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
      />
      <ErrorMessage
        :name="name"
        as="p"
        class="dark:text-pink-200 text-pink-400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  name: string;
}

defineProps<Props>();
</script>