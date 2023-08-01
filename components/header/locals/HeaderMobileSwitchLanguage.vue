<template>
  <button
    class="flex justify-between ml-2 mt-2"
    @click="$emit('toggleSwitchLanguage')"
  >
    <ChevronLeftIcon class="h-5 w-5 mt-1" aria-hidden="true" />
  </button>
  <BaseLine />
  <div class="flex flex-col">
    <button
      v-for="item in locales"
      :key="item.name"
      :value="item"
      :class="[
        item.name === currentLocale.name
          ? 'bg-pink-100 text-pink-900'
          : 'text-slate-700 dark:text-slate-300',
        'pl-4 my-1 py-1 cursor-pointer relative select-none hover:bg-slate-300 hover:dark:bg-slate-500 rounded-md',
      ]"
      @click="setLanguage(item)"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import { IBaseSwitchItem } from "~/models/base/IBaseSwitchItem";

// Usage of 'any' in this Switch, since the switch couldn't be created using
// Generic typing (not yet? supported by Vue), and the unpacked types of 'locale' and
// 'locales' are either None, undefined, string or an Object. This made it impossible
// to use some proper typehinting.
const { locale, locales }: { locale: any; locales: any } = useI18n();
const switchLocalePath = useSwitchLocalePath();

function setLanguage(localeCode: IBaseSwitchItem) {
  return navigateTo(switchLocalePath(localeCode.code));
}

const currentLocale = computed(() => {
  return locales.value.find((i: any) => i.code === locale.value);
});

defineEmits<{
  (e: "toggleSwitchLanguage"): void;
}>();
</script>
