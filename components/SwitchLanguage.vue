<template>
  <ClientOnly>
    <BaseSwitch
      :theme-button-id="1"
      :item-current="currentLocale"
      :item-list="locales"
      @item-clicked="setLanguage"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import BaseSwitch from "./base/BaseSwitch.vue";

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
</script>
