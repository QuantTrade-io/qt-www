<template>
  <main>
    <!-- Settings forms -->
    <div class="divide-y divide-white/5">
      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
            Platform Preferences
          </h2>
          <p class="mt-1 text-sm leading-6 text-slate-400">
            Settings that should be reflected throughout the Platform.
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
                  :theme-button-id="6"
                  :item-current="themeColorService.getTheme()"
                  :item-list="themeColorService.themes"
                  @item-clicked="setTheme"
                />
              </div>
              <div class="col-span-full">
                <BaseSwitch
                  label="Language"
                  :theme-button-id="6"
                  :item-current="currentLocale"
                  :item-list="locales"
                  @item-clicked="setLanguage"
                />
              </div>
            </div>
          </Observer>
        </div>
      </div>
      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
            Personal Information
          </h2>
          <p class="mt-1 text-sm leading-6 text-slate-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form class="md:col-span-2">
          <div
            class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"
          >
            <div class="col-span-full flex items-center gap-x-8">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div>
                <button
                  type="button"
                  class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white/20"
                >
                  Change avatar
                </button>
                <p class="mt-2 text-xs leading-5 text-slate-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block text-sm font-medium leading-6"
                >First name</label
              >
              <div class="mt-2">
                <input
                  id="first-name"
                  type="text"
                  name="first-name"
                  autocomplete="given-name"
                  class="block w-full dark:text-slate-200 rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  id="last-name"
                  type="text"
                  name="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="email" class="block text-sm font-medium leading-6"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="username" class="block text-sm font-medium leading-6"
                >Username</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                >
                  <span
                    class="flex select-none items-center pl-3 text-slate-400 sm:text-sm"
                    >example.com/</span
                  >
                  <input
                    id="username"
                    type="text"
                    name="username"
                    autocomplete="username"
                    class="flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button
              type="submit"
              class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ChangePassword />
      <BillingPortalSession />
      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
            Log out other sessions
          </h2>
          <p class="mt-1 text-sm leading-6 text-slate-400">
            Please enter your password to confirm you would like to log out of
            your other sessions across all of your devices.
          </p>
        </div>

        <form class="md:col-span-2">
          <div
            class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"
          >
            <div class="col-span-full">
              <label
                for="logout-password"
                class="block text-sm font-medium leading-6"
                >Your password</label
              >
              <div class="mt-2">
                <input
                  id="logout-password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button
              type="submit"
              class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold dark:text-slate-200 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Log out other sessions
            </button>
          </div>
        </form>
      </div>

      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base font-semibold leading-7 dark:text-slate-200">
            Delete account
          </h2>
          <p class="mt-1 text-sm leading-6 text-slate-400">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </p>
        </div>

        <form class="flex items-start md:col-span-2">
          <button
            type="submit"
            class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold dark:text-slate-200 shadow-sm hover:bg-red-400"
          >
            Yes, delete my account
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import BillingPortalSession from "./components/BillingPortalSession.vue";
import ChangePassword from "./components/ChangePassword.vue";
import { themeColorService } from "~/services/theme/ThemeColorService";
import { IBaseSwitchItem } from "~/models/base/IBaseSwitchItem";

definePageMeta({
  layout: "platform",
  middleware: [
    "check-logged-in-user-tokens",
    "check-logged-in-user-account-status",
  ],
});

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
