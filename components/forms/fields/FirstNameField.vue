<template>
  <div>
    <label for="first_name" class="block text-sm font-medium leading-6">{{
      $t("global.fields.first_name")
    }}</label>
    <div class="mt-1">
      <Field
        name="first_name"
        label="first name"
        type="text"
        autocomplete="given-name"
        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
      />
      <ErrorMessage
        name="first_name"
        as="p"
        class="dark:text-pink-200 text-pink-400"
      />
    </div>
  </div>
</template>
