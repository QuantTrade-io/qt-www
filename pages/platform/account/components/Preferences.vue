<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
        {{ $t("platform.settings.platform_preferences_title") }}
      </h2>
      <p class="mt-1 text-sm leading-6 text-slate-400">
        {{ $t("platform.settings.platform_preferences_text") }}
      </p>
    </div>
    <div class="md:col-span-2">
      <Observer>
        <div
          class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"
        >
          <div class="col-span-full">
            <BaseSwitch
              label="Theme color"
              :theme-button-id="7"
              :item-current="themeColorService.getTheme()"
              :item-list="themeColorService.themes"
              @item-clicked="setTheme"
            />
          </div>
          <div class="col-span-full">
            <BaseSwitch
              label="Language"
              :theme-button-id="7"
              :item-current="currentLocale"
              :item-list="locales"
              @item-clicked="setLanguage"
            />
          </div>
        </div>
      </Observer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import { themeColorService } from "~/services/theme/ThemeColorService";
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

function setTheme(item: IBaseSwitchItem) {
  if (!item.mode) {
    return;
  }
  themeColorService.setTheme(item.mode);
}
</script>
