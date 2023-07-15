<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div>
          <h2
            class="text-base font-semibold leading-7 dark:text-pink-400 text-pink-400"
          >
            {{ $t("features.hero.pre_title") }}
          </h2>
          <p
            class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl dark:text-slate-300 text-slate-900"
          >
            {{ $t("features.hero.title") }}
          </p>
          <p
            class="mt-6 text-base leading-7 dark:text-slate-500 text-slate-700"
          >
            {{ $t("features.hero.help_text") }}
          </p>
        </div>
        <dl
          class="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="relative pl-9"
          >
            <dt class="font-semibold dark:text-slate-300 text-slate-900">
              <CheckIcon
                class="absolute top-1 left-0 h-5 w-5 dark:text-pink-200 text-pink-400"
                aria-hidden="true"
              />
              {{ $t(feature.title) }}
            </dt>
            <dd class="mt-2 dark:text-slate-500 text-slate-700">
              {{ $t(feature.text) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from "@heroicons/vue/20/solid";

const features = [
  {
    title: "features.features.1.title",
    text: "features.features.1.text",
  },
  {
    title: "features.features.2.title",
    text: "features.features.2.text",
  },
  {
    title: "features.features.3.title",
    text: "features.features.3.text",
  },
  {
    title: "features.features.4.title",
    text: "features.features.4.text",
  },
  {
    title: "features.features.5.title",
    text: "features.features.5.text",
  },
  {
    title: "features.features.6.title",
    text: "features.features.6.text",
  },
  {
    title: "features.features.7.title",
    text: "features.features.7.text",
  },
  {
    title: "features.features.8.title",
    text: "features.features.8.text",
  },
];
</script>
